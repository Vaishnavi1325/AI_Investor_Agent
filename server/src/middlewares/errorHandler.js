import { env } from "../config/env.js";
import { sendError } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = error.isOperational ? error.message : "Internal server error";

  if (env.nodeEnv !== "production" && !error.isOperational) {
    console.error(error);
  }

  return sendError(res, {
    message,
    statusCode
  });
};
