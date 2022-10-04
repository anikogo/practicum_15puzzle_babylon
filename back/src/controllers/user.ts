export {};

const { Request, Response, NextFunction } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import User from '../models/User';

const Unauthorized = require('../errors/Unauthorized');
const BadRequest = require('../errors/BadRequest');
const DEV_JWT_SECRET = 'DEV_JWT_SECRET';

module.exports.getUser = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return res.send('getUser');
};

module.exports.signupUser = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  const {
    avatar_path,
    display_name,
    email,
    password,
  }: Record<string, string> = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash: string) => User.create({
      avatar_path,
      display_name,
      email,
      hash,
    }))
    .catch((err) => next(new BadRequest('=(')));
};

module.exports.signinUser = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  const { email, password }: Record<string, string> = req.body;

  User
  .findOne({
    where: { email }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.hash);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      });
    }

    const token = jwt.sign({ id: user.id }, DEV_JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    return res.send({ token });
  })
  .catch(() => next(new Unauthorized('USER_BAD_REQUEST')));
};

module.exports.logoutUser = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  //
};
