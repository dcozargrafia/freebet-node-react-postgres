// backend/controllers/transactions.controller.js

import { getRows, runQuery } from '../db-utils/db.utils.js';


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
}