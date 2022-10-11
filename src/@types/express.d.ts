/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars */
// @ts-ignore
namespace Express {
  interface Request {
    // @ts-ignore
    user?: string | JwtPayload;
  }
}
