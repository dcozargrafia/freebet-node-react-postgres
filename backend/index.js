// backend/indes.js

import express from 'express';
import cors from 'cors';

import { FRONTEND_URL, PORT } from './config.js';

import bookmakersRoutes from './routes/bookmakers.routes.js';
import transactionsRoutes from './routes/transactions.routes.js';
import casinosRoutes from './routes/casinos.routes.js';
import betsRoutes from './routes/bets.routes.js';

const app = express();

app.use(cors({
    origin: FRONTEND_URL,
}));

app.use(express.json());

// Routes
app.use('/bookmakers', bookmakersRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/casinos', casinosRoutes);
app.use('/bets', betsRoutes);

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
