/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import Unauthorized from '../errors/Unauthorized';
import BadRequest from '../errors/BadRequest';

import DEV_JWT_SECRET from '../utils/devConfig';

const signupUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    avatar_path,
    display_name,
    email,
    password,
  }: Record<string, string> = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash: string) => {
      User.create({
        avatar_path,
        display_name,
        email,
        hash,
        external_id: 0,
      });

      return res.status(201).send({ message: 'user was created' });
    })
    .catch(() => next(new BadRequest('=(')));
};

const signinUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: Record<string, string> = req.body;

  User
    .findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'user not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.hash);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign({ id: user.id }, DEV_JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      return res.send({ token });
    })
    .catch(() => next(new Unauthorized('USER_BAD_REQUEST')));
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  User
    .findOne({
      where: { id },
      attributes: ['id', 'avatar_path', 'display_name', 'email'],
    })
    .then((user: User | null) => res.send(user))
    .catch(next);
};

const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  User
    .findAll({
      attributes: ['id', 'avatar_path', 'display_name', 'email'],
    })
    .then((users: Array<User>) => res.send(users))
    .catch(next);
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  User
    .findOne({
      where: { id: req.body.id },
    })
    .then((user: User | null) => {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        user = req.body as User;
      }

      return res.send(user);
    })
    .catch(next);
};

export {
  signupUser,
  signinUser,
  getUser,
  getUsers,
  updateUser,
};
