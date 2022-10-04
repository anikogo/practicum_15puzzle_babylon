export {};

const { Request, Response, NextFunction } = require('express');

const errorHandler = (
  err: typeof Request,
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction
) => {
  const {
    statusCode = err.status || 500,
    message = err.message,
  } = err;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
