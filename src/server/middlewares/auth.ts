// eslint-disable-next-line import/no-import-module-exports
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized';

import DEV_JWT_SECRET from '../utils/devConfig';

const auth = (req: Request | any, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized();
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET as string : DEV_JWT_SECRET,
    );
  } catch (err) {
    throw new Unauthorized();
  }

  req.user = payload;

  next();
};

export default auth;
