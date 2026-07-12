import { HTTP_STATUS } from "../constants/httpStatus.js";

export const sendSuccess = (
  res,
  data = {},
  statusCode = HTTP_STATUS.OK
) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendError = (
  res,
  {
    message = "Internal Server Error",
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    stack = null,
  }
) => {
  const response = {
    success: false,
    error: {
      message,
      statusCode,
    },
  };

  if (process.env.NODE_ENV === "development" && stack) {
    response.error.stack = stack;
  }

  return res.status(statusCode).json(response);
};