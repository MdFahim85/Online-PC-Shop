const ErrorHander = require("../utils/errorHander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHander(message, 400);
  }
  if(err.code === 11000){
    const message = "Email already in Use";
    err = new ErrorHander(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Token error. Try again`;
    err = new ErrorHander(message, 400);
  }
  if (err.name === "JWTExpire") {
    const message = `Token expired. Try again`;
    err = new ErrorHander(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
