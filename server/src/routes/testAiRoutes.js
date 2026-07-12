import { Router } from "express";
import { body } from "express-validator";
import { testAi } from "../controllers/testAiController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

export const testAiRouter = Router();

const testAiValidationRules = [
  body("message")
    .exists({ checkFalsy: true })
    .withMessage("message is required")
    .bail()
    .isString()
    .withMessage("message must be a string")
    .bail()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("message must be between 1 and 1000 characters")
];

testAiRouter.post("/", testAiValidationRules, validateRequest, testAi);

