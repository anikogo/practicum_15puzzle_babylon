class Forbidden extends Error {
  statusCode: number;

  constructor(message = 'HTTP 403 Forbidden') {
    super(message);
    this.statusCode = 403;
  }
}

export default Forbidden;
