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
  host: process.env.POSTGRES_HOST ?? 'postgres',
  port: +(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'newPassword',
  database: process.env.POSTGRES_DB ?? 'my-db-name',
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
