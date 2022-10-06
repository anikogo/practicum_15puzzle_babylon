import { Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  res: Response,
  next: NextFunction,
) => {
  const {
    statusCode = err.status || 500,
    message = err.message,
  } = err;

  res.status(statusCode).send({ message });

  next();
};

export default errorHandler;
