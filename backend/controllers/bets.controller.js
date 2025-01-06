// backend/controllers/bets.controller.js

import { calculateResult, calculateLiability } from '../utils/bets.utils.js';
import { validateAndFormatDate } from '../utils/date.utils.js';
import { getRows, runQuery } from '../utils/db.utils.js';




// Get all bets
export const getBets = async (req, res) => {
    try {
        const  sql = `SELECT * FROM bets`;
        const bets = await getRows(sql, []);
        res.status(200).json(bets);
    } catch (error) {
        console.error('Error obtaining bets', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Get a specific bet by its id
export const getBetById = async (req, res) => {
    try {
        const id = req.params.id;

        // Basic parameter validation
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        }

        const sql = `SELECT * FROM bets WHERE id = $1`; 
        const bet = await getRows(sql, [id]); 

        if (bet.length === 0) {
            return res.status(404).json({ error: 'Bet not found' });
        }

        res.status(200).json(bet[0]);
    } catch (error) {
        console.error(`Error obtaining bet with id: ${id} `, error.message);
        res.status(500).json({ error: error.message });
    }
};



// Creates a new bet
export const createBet = async (req, res) => {
    try {
        // Convert strings to numbers when necessary
        const requestData = { ...req.body };
        if (requestData.bookmaker_id) requestData.bookmaker_id = Number(requestData.bookmaker_id);
        if (requestData.stake) requestData.stake = Number(requestData.stake);
        if (requestData.odds) requestData.odds = Number(requestData.odds);
               
        // Validate and format date
        if (requestData.date) {
            const dateValidation = validateAndFormatDate(requestData.date);
            if (!dateValidation.isValid) {
                return res.status(400).json({ error: dateValidation.error });
            }
            requestData.date = dateValidation.formattedDate;
        }

        // Validate and format event_date
        if (requestData.event_date) {
            const event_dateValidation = validateAndFormatDate(requestData.event_date);
            if (!event_dateValidation.isValid) {
                return res.status(400).json({ error: evente_dateValidation.error });
            }
            requestData.event_date = event_dateValidation.formattedDate;
        }

        // const validationErrors = await validateBetData(requestData);
        // if (validationErrors.length > 0) {
        //     return res.status(400).json({ errors: validationErrors });
        // }

        const { 
            date,
            bookmaker_id,
            type,
            extra,
            event_date,
            event,
            bet,
            stake,
            odds,
            status,
            id_par,
            info            
        } = requestData;

        const liability = calculateLiability(status, type, stake, odds);
        console.log('Liability: ', liability);
        const result = calculateResult(status, type, stake, odds, liability);
        console.log('Result: ', result);

        const sql = `
            INSERT INTO bets (date, bookmaker_id, type, extra, event_date, event, bet, stake, odds, status, liability, result, id_par, info)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
            RETURNING *;
        `;

        const { rows } = await runQuery(sql, [
            date,
            bookmaker_id,
            type,
            extra,
            event_date,
            event,
            bet,
            stake,
            odds,
            status,
            liability,
            result,
            id_par,
            info
        ]);

        res.status(201).json({ 
            message: 'Bet created successfully', 
            createdTransaction: rows[0],
        });
    } catch (error) {
        console.error('Error creating bet:', error.message);
        res.status(500).json({ error: error.message });
    }
};



// Updates a specific bet by its id
// Updates a specific bet by its id
export const updateBet = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Validate id
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        }

        // Convert strings to numbers when necessary
        if (updateData.bookmaker_id) updateData.bookmaker_id = Number(updateData.bookmaker_id);
        if (updateData.stake) updateData.stake = Number(updateData.stake);
        if (updateData.odds) updateData.odds = Number(updateData.odds);

        // Validate and format dates
        if (updateData.date) {
            const dateValidation = validateAndFormatDate(updateData.date);
            if (!dateValidation.isValid) {
                return res.status(400).json({ error: dateValidation.error });
            }
            updateData.date = dateValidation.formattedDate;
        }

        if (updateData.event_date) {
            const eventDateValidation = validateAndFormatDate(updateData.event_date);
            if (!eventDateValidation.isValid) {
                return res.status(400).json({ error: eventDateValidation.error });
            }
            updateData.event_date = eventDateValidation.formattedDate;
        }

        // Fetch existing bet
        const existingBet = await getRows(`SELECT * FROM bets WHERE id = $1`, [id]);
        if (!existingBet || existingBet.length === 0) {
            return res.status(404).json({ error: 'Bet not found' });
        }
        const currentBet = existingBet[0]; 

        // Use new or existing values for calculation
        const finalStatus = updateData.status || currentBet.status;
        const finalType = updateData.type || currentBet.type;
        const finalStake = updateData.stake !== undefined && !isNaN(Number(updateData.stake)) 
        ? Number(updateData.stake) 
        : Number(currentBet.stake);
        const finalOdds = updateData.odds !== undefined && !isNaN(Number(updateData.odds)) 
        ? Number(updateData.odds) 
        : Number(currentBet.odds);

        // Validar los valores
        if (isNaN(finalStake) || isNaN(finalOdds)) {
            return res.status(400).json({ error: 'Stake and odds must be valid numbers.' });
        }
        // Calculate liability and result
        const newLiability = calculateLiability(finalStatus, finalType, finalStake, finalOdds);
        const newResult = calculateResult(finalStatus, finalType, finalStake, finalOdds, newLiability);

        // Update query
        const sql = `
            UPDATE bets SET
                date = COALESCE($1, date),
                bookmaker_id = COALESCE($2, bookmaker_id),
                type = COALESCE($3, type),
                extra = COALESCE($4, extra),
                event_date = COALESCE($5, event_date),
                event = COALESCE($6, event),
                bet = COALESCE($7, bet),
                stake = COALESCE($8, stake),
                odds = COALESCE($9, odds),
                status = COALESCE($10, status),
                liability = $11, -- Always recalculated
                result = $12, -- Always recalculated
                id_par = COALESCE($13, id_par),
                info = COALESCE($14, info)
            WHERE id = $15
            RETURNING *;
        `;

        const { rows, rowCount } = await runQuery(sql, [
            updateData.date,
            updateData.bookmaker_id,
            finalType,
            updateData.extra,
            updateData.event_date,
            updateData.event,
            updateData.bet,
            finalStake,
            finalOdds,
            finalStatus,
            newLiability, // Calculated value
            newResult,    // Calculated value
            updateData.id_par,
            updateData.info,
            id
        ]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Bet not found' });
        }

        res.status(200).json({
            message: 'Bet updated successfully',
            updatedBet: rows[0],
        });
    } catch (error) {
        console.error('Error updating bet:', error.message);
        res.status(500).json({ error: error.message });
    }
};



// Deletes a specific bet by its id
export const deleteBet = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Validates id valid
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'Id should be a valid number' });
        };

        const sql = `DELETE FROM bets WHERE id = $1 RETURNING *`;
        const { rows, rowCount } = await runQuery(sql, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Bet not found' });
        }

        res.status(200).json({
            message: 'Bet deleted succesfully',
            deletedBet: rows[0],
        });       
    } catch (error) {
        console.error(`Error deleting bet: ${id}.`, error.message);
        res.status(500).json({ error: error.message });
    }
};