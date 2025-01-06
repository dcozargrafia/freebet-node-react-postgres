// backend/routes/bets.routes.js


import { Router } from 'express';
import {
    getBets,
    getBetById,
    createBet,
    deleteBet,
    updateBet,
    } 
    from '../controllers/bets.controller.js';

const router = Router();


router.get('/', getBets);

router.get('/:id', getBetById);

router.post('/', createBet);

router.put('/:id', updateBet);

router.delete('/:id', deleteBet);

export default router;