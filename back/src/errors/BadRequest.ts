export {};

class BadRequest extends Error {
  statusCode: number;

  constructor(message: string = 'HTTP 400 Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
