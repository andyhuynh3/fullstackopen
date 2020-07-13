const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return response.status(404).json({ error: error.message });
  }
  return next(error);
};

module.exports = {
  errorHandler,
};
