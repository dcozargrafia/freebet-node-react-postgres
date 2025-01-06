// backend/routes/casinos.routes.js

import { Router } from 'express';
import {
    getCasinos,
    getCasinoById,
    createCasino,
    deleteCasino,
    updateCasino,
    } 
    from '../controllers/casinos.controller.js';

const router = Router();


router.get('/', getCasinos);

router.get('/:id', getCasinoById);

router.post('/', createCasino);

router.put('/:id', updateCasino);

router.delete('/:id', deleteCasino);

export default router;