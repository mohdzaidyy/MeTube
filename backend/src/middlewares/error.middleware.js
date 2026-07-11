// src/middlewares/error.middleware.js
import ApiError from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    error = new ApiError(statusCode, error.message || "Something went wrong", error?.errors || [], err.stack);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  });
};

export default errorHandler;