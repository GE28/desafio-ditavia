import chalk from 'chalk';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(chalk.green('Conectado ao'), chalk.green.bold('MongoDB Atlas!'));
    console.log(chalk.yellow('Banco de dados:'), mongoose.connection.db.databaseName);
    console.log(chalk.yellow('Host:'), mongoose.connection.host);
    console.log(chalk.yellow('Porta:'), mongoose.connection.port);
  })
  .catch(err => console.error(chalk.red.bold('Erro ao conectar ao MongoDB Atlas:'), err));
