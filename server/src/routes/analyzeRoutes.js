import { Router } from "express";
import { body } from "express-validator";
import { analyzeCompany } from "../controllers/analyzeController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

export const analyzeRouter = Router();

const analyzeValidationRules = [
  body("company")
    .exists({ checkFalsy: true })
    .withMessage("company is required")
    .bail()
    .isString()
    .withMessage("company must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage("company must be between 2 and 120 characters")
];

analyzeRouter.post("/", analyzeValidationRules, validateRequest, analyzeCompany);

