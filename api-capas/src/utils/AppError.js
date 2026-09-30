// Error "esperado" con código HTTP. El errorHandler lo convierte en respuesta JSON.
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
