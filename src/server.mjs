import express from 'express';

import './db/conn.mjs';
import smartphonesRoutes from './routes/Smartphones.mjs';

const server = express();

server.use(express.json());

server.use('/smartphone', smartphonesRoutes);

export { server };