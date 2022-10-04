export {};

class Forbidden extends Error {
  statusCode: number;

  constructor(message: string = 'HTTP 403 Forbidden') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
