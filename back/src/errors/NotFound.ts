export {};

class NotFound extends Error {
  statusCode: number;

  constructor(message: string = 'HTTP 404 Not Found') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFound;
