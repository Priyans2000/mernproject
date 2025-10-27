const GlobalErrorHandler = (err, req, res, next) => {
  // console.log("error", err);
  const status = err?.status ? err?.status : "failed "; //default status code 500 internal server error
  const message = err?.message
    ? err?.message
    : "Something went wrong, please try again later";
  const stack = err?.stack;
  res.status(500).json({ status, message, stack });
};
//============
//404 error handler/page not found
const notfound = (req, res, next) => {
  res.status(404);
  const error = new Error(
    `Route not found for - ${req.originalUrl} at the server`
  );
  next(error);
};

module.exports = {
  GlobalErrorHandler,
  notfound,
};
