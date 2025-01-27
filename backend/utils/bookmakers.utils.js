// backend/db-utils/bookmakers.utils.js

import { runQuery } from './db.utils.js'; 


// Checks if it exists a bookmaker with a specific id
export const existsBookmakerId = async (id) => {
    const sql = 'SELECT COUNT(*) FROM bookmakers WHERE id = $1'; 
    
    const { rows } = await runQuery(sql, [id]);
    return rows[0].count > 0; 
};



export const validateBookmakerData = (data) => {
    const errors = [];
    
    Object.entries(data).forEach(([field, value]) => {
        switch (field) {
            case 'name':
                if (typeof value !== 'string' || value.trim() === '') {
                    errors.push('The "name" field must be a non-empty string.');
                }
                break;

            case 'initial_balance':
                if (typeof value !== 'number' || value < 0) {
                    errors.push('The "initial_balance" field must be a number greater than or equal to 0.');
                }
                break;

            case 'adjustment':
                if (typeof value !== 'number') {
                    errors.push('The "adjustment" field must be a number.');
                }
                break;

            case 'username':
                if (typeof value !== 'string' || value.trim() === '') {
                    errors.push('The "username" field must be a non-empty string.');
                }
                break;

            case 'password':
                if (typeof value !== 'string' || value.trim() === '') {
                    errors.push('The "password" field must be a non-empty string.');
                }
                break;

            case 'type':
                if (!['regular', 'exchange'].includes(value)) {
                    errors.push('The "type" field must be either "regular" or "exchange".');
                }
                break;

            case 'commission':
                if (typeof value !== 'number' || 
                    value < 0 || 
                    value > 100 || 
                    !/^\d+(\.\d{1,2})?$/.test(String(value))) {
                    errors.push('The "commission" field must be a number between 0.00 and 100.00 with up to 2 decimal places.');
                }
                break;
            
            case 'info':
                if (typeof value != 'string') {
                    errors.push('The "info" field must be a string')
                }
                break;

            default:
                errors.push(`Invalid field: "${field}" is not allowed.`);
        }
    });

    return errors;
};