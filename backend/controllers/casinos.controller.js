// backend/controllers/casinos.controller.js

import { validateCasinosData } from '../db-utils/casinos.utils.js';
import { validateAndFormatDate } from '../db-utils/date.utils.js';
import { getRows, runQuery } from '../db-utils/db.utils.js';



// Gets all casino operations
export const getCasinos = async (req, res) => {
    try {
        const sql = `SELECT * FROM casinos`;
        const casinos = await getRows(sql, []);
        res.status(200).json(casinos);        
    } catch (error) {
        console.error('Error obtaining casino operations', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Gets a specific casino operation by its id
export const getCasinoById = async (req, res) => {
    try {
        const id = req.params.id;

        // Basic parameter validation
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        }

        const sql = `SELECT * FROM casinos WHERE id = $1`; 
        const casino = await getRows(sql, [id]); 

        if (casino.length === 0) {
            return res.status(404).json({ error: 'Casino operation not found' });
        }

        res.status(200).json(transaction[0]);        
    } catch (error) {
        console.error(`Error obtaining casino operation with id: ${id} `, error.message);
        res.status(500).json({ error: error.message });        
    }
};


// Creates a new casino operation
export const createCasino = async (req, res) => {
    try {
        // Convert strings to numbers when necessary
        const requestData = { ...req.body };
        if (requestData.bookmaker_id) requestData.bookmaker_id = Number(requestData.bookmaker_id);
        if (requestData.amount) requestData.amount = Number(requestData.amount);
                
        // Validate and format date
        if (requestData.date) {
            const dateValidation = validateAndFormatDate(requestData.date);
            if (!dateValidation.isValid) {
                return res.status(400).json({ error: dateValidation.error });
            }
            requestData.date = dateValidation.formattedDate;
        }

        const validationErrors = await validateCasinosData(requestData);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const { 
            date,
            bookmaker_id,
            amount,
            info,            
        } = requestData;

        const sql = `
            INSERT INTO casinos (date, bookmaker_id, amount, info)
            VALUES ($1::date, $2, $3, $4) 
            RETURNING id, date::date, bookmaker_id, amount, info;
        `;

        const { rows } = await runQuery(sql, [
            date,
            bookmaker_id,
            amount,
            info
        ]);

        res.status(201).json({ 
            message: 'Casino operation created successfully', 
            createdCasino: rows[0],
        });        
    } catch (error) {
        console.error('Error creating casino operation:', error.message);
        res.status(500).json({ error: error.message });        
    }
};


// Updates a specific casino operation by its id
export const updateCasino = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Validates id valid
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        };

        // Convert strings to numbers when necessary
        if (updateData.amount) updateData.amount = Number(updateData.amount);

        // Validate and format date
        if (requestData.date) {
            const dateValidation = validateAndFormatDate(requestData.date);
            if (!dateValidation.isValid) {
                return res.status(400).json({ error: dateValidation.error });
            }
            requestData.date = dateValidation.formattedDate;
        }

        // Validate data
        const validationErrors = await validateCasinosData(updateData);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const sql = `
            UPDATE casinos SET
                date = COALESCE($1, date),
                bookmaker_id = COALESCE($2, bookmaker_id),
                amount = COALESCE($3, amount),
                info = COALESCE($4, info)
            WHERE id = $5
            RETURNING *;
        `;

        const { rows, rowCount } = await runQuery(sql, [
            updateData.date,
            updateData.bookmaker_id,
            updateData.amount,
            updateData.info,
            id
        ]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Casino operation not found' });
        }

        res.status(200).json({
            message: 'Casino operation updated successfully', 
            updatedCasino: rows[0]
        });
    } catch (error) {
        console.error(`Error updating casino operation`, error.message);
        res.status(500).json({ error: error.message })
    }
};


// Deletes a specific casino operations by its id
export const deleteCasino = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Validates id valid
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        };

        const sql = `DELETE FROM casinos WHERE id = $1 RETURNING *`;
        const { rows, rowCount } = await runQuery(sql, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Casino operation not found' });
        }

        res.status(200).json({
            message: 'Casino operation deleted succesfully',
            deletedTransaction: rows[0],
        });       
    } catch (error) {
        console.error(`Error deleting casino operation`, error.message);
        res.status(500).json({ error: error.message });
    }
};