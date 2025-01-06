// backend/routes/transactions.routes.js

import { Router } from 'express';
import { 
    getTransactions,
    getTransactionById,
    createTransaction,
    } 
    from '../controllers/transactions.controller.js'


const router = Router();

// C.R.U.D. Routes


router.get('/', getTransactions);

router.get('/:id', getTransactionById);

router.post('/', createTransaction);

// router.put('/:id', updateBookmaker);

// router.delete('/:id', deleteBookmaker);

export default router;