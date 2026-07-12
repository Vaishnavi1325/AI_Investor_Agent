import { Annotation, END, START, StateGraph } from "@langchain/langgraph";

import { companyNode } from "../nodes/companyNode.js";
import { financeNode } from "../nodes/financeNode.js";
import { newsNode } from "../nodes/newsNode.js";
import { riskNode } from "../nodes/riskNode.js";
import { decisionNode } from "../nodes/decisionNode.js";

const InvestmentState = Annotation.Root({
  company: Annotation(),

  overview: Annotation(),

  financials: Annotation(),

  news: Annotation(),

  risks: Annotation(),

  decision: Annotation(),
});

const createInvestmentGraph = () => {
  return new StateGraph(InvestmentState)

    .addNode("companyNode", companyNode)

    .addNode("financeNode", financeNode)

    .addNode("newsNode", newsNode)

    .addNode("riskNode", riskNode)

    .addNode("decisionNode", decisionNode)

    .addEdge(START, "companyNode")

    .addEdge("companyNode", "financeNode")

    .addEdge("financeNode", "newsNode")

    .addEdge("newsNode", "riskNode")

    .addEdge("riskNode", "decisionNode")

    .addEdge("decisionNode", END)

    .compile();
};

export const investmentGraph = createInvestmentGraph();

export const runInvestmentGraph = async ({ company }) => {
  return await investmentGraph.invoke({ company });
};