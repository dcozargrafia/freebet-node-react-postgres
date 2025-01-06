// backend/db-utils/casinos.utils.js
import { existsBookmakerId } from './bookmakers.utils.js';
import { validateDate } from './date.utils.js';


export const validateCasinosData = async (data) => {
    const errors = [];

    for (const [field, value] of Object.entries(data)) {
        switch (field) {
            case 'date': 
                const dateError = validateDate(value, { 
                    allowFuture: false,
                });
                if (dateError) errors.push(dateError);
                break;

            case 'bookmaker_id':
                if (typeof value !== 'number' || !(await existsBookmakerId(value))) {
                    errors.push('The bookmaker_id must be a valid id');
                }
                break;
            
            case 'amount':
                if (typeof value !== 'number') {
                    errors.push('The "amount" field must be a number')
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
    }

    return errors; 
};