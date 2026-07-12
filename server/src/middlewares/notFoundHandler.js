import { AppError } from "../errors/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, HTTP_STATUS.NOT_FOUND));
};

