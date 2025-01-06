// backend/controllers/transactions.controller.js

import { getRows, runQuery } from '../db-utils/db.utils.js';
import { validateTransactionData } from '../db-utils/transactions.utils.js';



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
            return res.status(404).json({ error: 'Bookmaker not found' });
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
        const validationErrors = await validateTransactionData(req.body);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const { 
            date,
            bookmakerId,
            type,
            amount,
            info,            
        } = req.body;

        const sql = `
            INSERT INTO transactions 
            (date, bookmaker_id, type, amount, info) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
        `;

        const { rows } = await runQuery(sql, [
            date,
            bookmakerId,
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