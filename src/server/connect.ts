import { config as dotEnvConfig } from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import User from './models/User';
import Topic from './models/Topic';
import Comment from './models/Comment';
import Like from './models/Like';

dotEnvConfig();

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'newPassword',
  database: process.env.DB_NAME || 'my-db-name',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([User, Topic, Comment, Like]);

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
