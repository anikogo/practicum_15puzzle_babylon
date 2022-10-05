import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import User from './src/models/User';
import Topic from './src/models/Topic';
import Comment from './src/models/Comment';

const sequelizeOptions: SequelizeOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'newPassword',
  database: process.env.DB_NAME || 'my-db-name',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([
  User, Topic, Comment,
]);

const dbConnect = async () => {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync({ force: true }); // Синхронизация базы данных

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default dbConnect;
