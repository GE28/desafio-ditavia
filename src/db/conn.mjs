import chalk from 'chalk';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error(chalk.red.bold('Variável de ambiente MONGODB_URI não definida!'));
  process.exit(1);
} 

let connection;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(chalk.green('Conectado ao'), chalk.green.bold('MongoDB Atlas!'));
    connection = mongoose.connection;
    console.log(chalk.yellow('Banco de dados:'), connection.db.databaseName);
    console.log(chalk.yellow('Host:'), connection.host);
    console.log(chalk.yellow('Porta:'), connection.port);
  })
  .catch(err => console.error(chalk.red.bold('Erro ao conectar ao MongoDB Atlas:'), err));
