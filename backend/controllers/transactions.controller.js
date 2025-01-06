// backend/controllers/transactions.controller.js

import { validateAndFormatDate } from '../utils/date.utils.js';
import { getRows, runQuery } from '../utils/db.utils.js';
import { validateTransactionData } from '../utils/transactions.utils.js';




// Gets all transactions
export const getTransactions = async (req, res) => {
    try {
        const sql = `SELECT * FROM transactions`;
        const transactions = await getRows(sql, []);
        res.status(200).json(transactions);

    } catch (error) {
        console.error('Error obtaining transactions', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Gets a specific transaction by its id
export const getTransactionById = async (req, res) => {
    try {
        const id = req.params.id;

        // Basic parameter validation
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        }

        const sql = `SELECT * FROM transactions WHERE id = $1`; 
        const transaction = await getRows(sql, [id]); 

        if (transaction.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(transaction[0]);
    } catch (error) {
        console.error(`Error obtaining transaction with id: ${id} `, error.message);
        res.status(500).json({ error: error.message });
    }
};


// Creates a new tranaction
export const createTransaction = async (req, res) => {
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

        const validationErrors = await validateTransactionData(requestData);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const { 
            date,
            bookmaker_id,
            type,
            amount,
            info,            
        } = requestData;

        const sql = `
            INSERT INTO transactions (date, bookmaker_id, type, amount, info)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;

        const { rows } = await runQuery(sql, [
            date,
            bookmaker_id,
            type,
            amount,
            info
        ]);

        res.status(201).json({ 
            message: 'Transaction created successfully', 
            createdTransaction: rows[0],
        });
    } catch (error) {
        console.error('Error creating transaction:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Updates a specific transaction by its id
export const updateTransaction = async (req, res) => {

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
        if (updateData.date) {
            const dateValidation = validateAndFormatDate(updateData.date);
            if (!dateValidation.isValid) {
                return res.status(400).json({ error: dateValidation.error });
            }
            updateData.date = dateValidation.formattedDate;
        }

        // Validate data
        const validationErrors = await validateTransactionData(updateData);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const sql = `
            UPDATE transactions SET
                bookmaker_id = COALESCE($1, bookmaker_id),
                type = COALESCE($2, type),
                amount = COALESCE($3, amount),
                info = COALESCE($4, info)
            WHERE id = $5
            RETURNING *;
        `;

        const { rows, rowCount } = await runQuery(sql, [

            updateData.bookmaker_id,
            updateData.type,
            updateData.amount,
            updateData.info,
            id
        ]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({
            message: 'Transaction updated successfully', 
            updatedTransactionr: rows[0]
        });
    } catch (error) {
        console.error(`Error updating transaction`, error.message);
        res.status(500).json({ error: error.message })
    }
};


// Deletes a specific transaction by its id
export const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Validates id valid
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        };

        const sql = `DELETE FROM transactions WHERE id = $1 RETURNING *`;
        const { rows, rowCount } = await runQuery(sql, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({
            message: 'Transaction deleted succesfully',
            deletedTransaction: rows[0],
        });       
    } catch (error) {
        console.error(`Error deleting transaction: ${id}.`, error.message);
        res.status(500).json({ error: error.message });
    }
};
