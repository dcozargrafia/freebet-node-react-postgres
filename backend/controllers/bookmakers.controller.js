// backend/controllers/bookmakers.controller.js

import { validateBookmakerData } from '../db-utils/bookmakers.utils.js';
import { getRows, runQuery } from '../db-utils/db.utils.js';

// Gets all bookmakers
export const getBookmakers = async (req, res) => {
    try {
        const sql = `SELECT * FROM bookmakers`;
        const bookmakers = await getRows(sql, []);
        res.status(200).json(bookmakers);
    } catch (error) {
        console.error('Error obtaining bookmakers', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Gets a specific bookmaker by its id
export const getBookmakerById = async (req, res) => {
    try {
        const id = req.params.id;

        // Basic parameter validation
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        }

        const sql = `SELECT * FROM bookmakers WHERE id = $1`; 
        const bookmaker = await getRows(sql, [id]); 

        if (bookmaker.length === 0) {
            return res.status(404).json({ error: 'Bookmaker not found' });
        }

        res.status(200).json(bookmaker[0]);
    } catch (error) {
        console.error(`Error obtaining bookmaker with id: ${id}`, error.message);
        res.status(500).json({ error: error.message });
    }
};

// Creates a new Bookmaker
export const createBookmaker = async (req, res) => {
    try {
        const validationErrors = validateBookmakerData(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const { 
            name, 
            initialBalance, 
            adjustment, 
            username, 
            password, 
            type, 
            commission,
            info 
        } = req.body;

        const sql = `
            INSERT INTO bookmakers 
            (name, initial_balance, adjustment, username, password, type, commission, info) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *;
        `;

        const { rows } = await runQuery(sql, [
            name, 
            initialBalance, 
            adjustment, 
            username, 
            password, 
            type, 
            commission,
            info
        ]);

        res.status(201).json({ 
            message: 'Bookmaker created successfully', 
            createdBookmaker: rows[0],
        });
    } catch (error) {
        console.error('Error creating bookmaker:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Updates a specific bookmaker by its id
export const updateBookmaker = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Validate id valid
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        }

        // Convert strings to numbers when necessary
        if (updateData.initialBalance) updateData.initialBalance = Number(updateData.initialBalance);
        if (updateData.adjustment) updateData.adjustment = Number(updateData.adjustment);
        if (updateData.commission) updateData.commission = Number(updateData.commission);

        // Validate data
        const validationErrors = validateBookmakerData(updateData);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const sql = `
            UPDATE bookmakers SET
                name = COALESCE($1, name),
                initial_balance = COALESCE($2, initial_balance),
                adjustment = COALESCE($3, adjustment),
                username = COALESCE($4, username),
                password = COALESCE($5, password),
                type = COALESCE($6, type),
                commission = COALESCE($7, commission),
                info = COALESCE($8, info)
            WHERE id = $9
            RETURNING *;
        `;

        const { rows, rowCount } = await runQuery(sql, [
            updateData.name,
            updateData.initialBalance,
            updateData.adjustment,
            updateData.username,
            updateData.password,
            updateData.type,
            updateData.commission,
            updateData.info,
            id
        ]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Bookmaker not found' });
        }

        res.status(200).json({ 
            message: 'Bookmaker updated successfully', 
            updatedBookmaker: rows[0]
        });
    } catch (error) {
        console.error('Error updating bookmaker:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Deletes a specific bookmaker by its id
export const deleteBookmaker = async (req, res) => {
    try {
        const id = req.params.id;

        // Validación básica del parámetro id
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        }

        const sql = `DELETE FROM bookmakers WHERE id = $1 RETURNING *`; 
        const { rows, rowCount } = await runQuery(sql, [id]); 

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Bookmaker not found' });
        }

        res.status(200).json({
            message: 'Bookmaker deleted successfully',
            deletedBookmaker: rows[0],
        });
    } catch (error) {
        console.error('Error deleting bookmaker:', error.message);
        res.status(500).json({ error: error.message });
    }
};
