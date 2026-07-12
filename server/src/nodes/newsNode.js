import axios from "axios";
import { chatModel } from "../llm/model.js";

const getTextFromAiMessage = (aiMessage) => {
  if (typeof aiMessage.content === "string") {
    return aiMessage.content;
  }

  return JSON.stringify(aiMessage.content);
};

export const newsNode = async (state) => {
  const response = await axios.get(
    "https://newsapi.org/v2/everything",
    {
      params: {
        q: state.company,
        language: "en",
        sortBy: "publishedAt",
        pageSize: 5,
        apiKey: process.env.NEWS_API_KEY,
      },
    }
  );

  const articles = response.data.articles || [];

  if (articles.length === 0) {
    return {
      news: "No recent news found.",
    };
  }

  const formattedNews = articles
    .map(
      (article) => `
Title: ${article.title}
Description: ${article.description}
Source: ${article.source?.name}
`
    )
    .join("\n");

  const prompt = `
You are a financial news analyst.

Below is the latest news about ${state.company}.

${formattedNews}

Provide:

1. Positive developments
2. Negative developments
3. Overall market sentiment

Keep the response under 150 words.
`;

  const aiMessage = await chatModel.invoke(prompt);

  return {
    news: getTextFromAiMessage(aiMessage),
  };
};