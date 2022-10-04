export {};

const { Request, Response, NextFunction } = require('express');

const Forbidden = require('../errors/Forbidden');

const auth = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  if (req.user) {
    return next();
  }

  throw new Forbidden();
};

module.exports = auth;
