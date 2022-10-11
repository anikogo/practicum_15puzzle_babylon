class BadRequest extends Error {
  statusCode: number;

  constructor(message = 'HTTP 400 Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequest;
