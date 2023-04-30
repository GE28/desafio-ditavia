import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';

import './db/conn.mjs';
import smartphonesRoutes from './routes/Smartphones.mjs';
import appRoutes from './app.mjs';

import { fileURLToPath } from 'url';

const server = express();
const __dirname = fileURLToPath(import.meta.url);

server.use(express.static(path.join(__dirname, '..', '..', 'public')))

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.set("view engine", "njk");
nunjucks.configure("src/views", {
  express: server,
  noCache: true
});

server.use('/', appRoutes);
server.use('/smartphone', smartphonesRoutes);

export { server };