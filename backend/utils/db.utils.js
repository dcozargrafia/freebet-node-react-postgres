// backend/db-utils/db.utils.js


import { pool } from '../database.js';

/**
 * Executes a generic SQL query.
 * @param {string} query - The SQL query.
 * @param {Array} params - The parameters for the query.
 * @returns {Promise} - A promise that resolves with the result of the query.
 */
export async function runQuery(query, params = []) {
    try {
        const result = await pool.query(query, params);
        return {
            rows: result.rows, // Array of rows returned by the query
            rowCount: result.rowCount, // Number of rows affected
        };
    } catch (error) {
        console.error('Error executing query:', error.message);
        throw error;
    }
}


/**
 * Gets rows from a SQL query.
 * @param {string} query - The SQL query.
 * @param {Array} params - The parameters for the query.
 * @returns {Promise<Array>} - A promise that resolves with the resulting rows.
 */
export async function getRows(query, params = []) {
    try {
        const result = await pool.query(query, params);
        return result.rows; // Returns the obtained rows
    } catch (error) {
        console.error('Error getting rows:', error);
        throw error;
    }
};