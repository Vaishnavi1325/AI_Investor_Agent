import { analyzeCompanyInvestment } from "../services/analyzeService.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const analyzeCompany = asyncHandler(async (req, res) => {
  const { company } = req.body;
  const result = await analyzeCompanyInvestment({ company });

  return sendSuccess(res, result);
});

