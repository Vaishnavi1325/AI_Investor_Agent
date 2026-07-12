import { sendSuccess } from "../utils/apiResponse.js";

export const getRoot = (_req, res) => {
  return sendSuccess(res, {
    service: "AI Investment Research Agent API",
    status: "running"
  });
};

