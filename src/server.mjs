import express from 'express';

import './db/conn.mjs';
import smartphonesRoutes from './routes/Smartphones.mjs';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/smartphone', smartphonesRoutes);

export { server };