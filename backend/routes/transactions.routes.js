// backend/routes/transactions.routes.js

import { Router } from 'express';
// import { 
//     getBookmakers, 
//     getBookmakerById,
//     createBookmaker,
//     deleteBookmaker,
//     updateBookmaker,
//     } 
//     from '../controllers/transactions.controller.js'


const router = Router();

// C.R.U.D. Routes


router.get('/', getTransactions);

// router.get('/:id', getBookmakerById);

// router.post('/', createBookmaker);

// router.put('/:id', updateBookmaker);

// router.delete('/:id', deleteBookmaker);

export default router;