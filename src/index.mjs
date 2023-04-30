import './loadEnvironment.mjs';
import { app } from './app.mjs';
import chalk from 'chalk';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express ${chalk.green('iniciado')} ${chalk.blue.bold(`(http://localhost:${port})`)}`);
});