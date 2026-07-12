import { asyncHandler } from "../middlewares/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { sendMessageToAi } from "../services/testAiService.js";

export const testAi = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const result = await sendMessageToAi({ message });

  return sendSuccess(res, result);
});

