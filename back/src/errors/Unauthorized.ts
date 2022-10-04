export {};

class Unauthorized extends Error {
  statusCode: number;

  constructor(message: string = 'HTTP 401 Unauthorized') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
