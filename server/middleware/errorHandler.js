const notFound = (req, res, next) => {
  const error = new Error(`Not Found route ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;

  res
    .status(status)
    .json({
      message: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

export { notFound, errorHandler };
