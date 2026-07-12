import { validationResult } from "express-validator";
import { AppError } from "../errors/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const message = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  return next(new AppError(message, HTTP_STATUS.BAD_REQUEST));
};

