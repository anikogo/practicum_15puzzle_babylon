class Unauthorized extends Error {
  statusCode: number;

  constructor(message = 'HTTP 401 Unauthorized') {
    super(message);
    this.statusCode = 401;
  }
}

export default Unauthorized;
