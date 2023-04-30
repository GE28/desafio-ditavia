import express from 'express';
import './db/conn.mjs';
import smartphonesRoutes from './routes/Smartphones.mjs';

const app = express();

app.use(express.json());
app.use('/smartphone', smartphonesRoutes);

export { app };