const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal_server_error';

  console.log('Error Message:', message); // Log the error message
  console.log('Status Code:', statusCode); // Log the status code
  res.status(statusCode).json({ error: message })
}

export default errorHandler;
