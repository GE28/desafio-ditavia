import './loadEnvironment.mjs';
import { server } from './server.mjs';
import chalk from 'chalk';

const port = process.env.SERVER_PORT;

server.listen(port, () => {
  console.log(`Express ${chalk.green('iniciado')} ${chalk.blue.bold(`(http://localhost:${port})`)}`);
});

if (!process.env.MONGODB_URI) {
  console.error(chalk.red.bold('Variável de ambiente MONGODB_URI não definida!'));
  process.exit(1);
} 

if (!process.env.SERVER_PORT) {
  console.error(chalk.red.bold('Variável de ambiente SERVER_PORT não definida!'));
  process.exit(1);
}
