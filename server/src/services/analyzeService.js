import { investmentGraph } from "../graph/investmentGraph.js";

export const analyzeCompanyInvestment = async ({ company }) => {
  return investmentGraph.invoke({ company });
};
