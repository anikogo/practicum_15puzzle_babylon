import { NextFunction } from 'express';

import Forbidden from '../errors/Forbidden';

const auth = (
  req: any,
  next: NextFunction,
) => {
  if (req.user) {
    return next();
  }

  throw new Forbidden();
};

export default auth;
