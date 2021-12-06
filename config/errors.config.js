const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports = (app) => {
  app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
  });

  app.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError)
      error = createError(400, error);
    else if (error instanceof mongoose.Error.CastError)
      error = createError(404, 'Recurso no encontrado');
    else if (error.message.includes('E11000'))
      error = createError(400, 'El recurso ya existe');
    else if (!error.status) error = createError(500, error);

    if (error.status >= 500) {
      console.error(error);
    }

    const data = {};
    data.message = error.message;
    data.errors = error.errors
      ? Object.keys(error.errors).reduce(
          (errors, key) => ({
            ...errors,
            [key]: error.errors[key].message || error.errors[key],
          }),
          {}
        )
      : undefined;

    res.status(error.status).json(data);
  });
};
