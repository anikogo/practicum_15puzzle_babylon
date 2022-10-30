import { config as dotEnvConfig } from 'dotenv';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import User from './models/User';
import Topic from './models/Topic';
import Comment from './models/Comment';
import Like from './models/Like';
import SiteTheme from './models/SiteTheme';
import UserTheme from './models/UserTheme';

dotEnvConfig();

const sequelizeOptions: SequelizeOptions = {
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'newPassword',
  database: process.env.DB_NAME || 'my-db-name',
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

sequelize.addModels([User, Topic, Comment, Like, SiteTheme, UserTheme]);

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
