const companyTickerMap = {
  tesla: "TSLA",
  apple: "AAPL",
  microsoft: "MSFT",
  amazon: "AMZN",
  alphabet: "GOOGL",
  google: "GOOGL",
  meta: "META",
  netflix: "NFLX",
  nvidia: "NVDA",
  amd: "AMD",
  intel: "INTC",
  oracle: "ORCL",
  adobe: "ADBE",
  salesforce: "CRM",
  paypal: "PYPL",
  uber: "UBER",
  airbnb: "ABNB",
};

export const getTicker = (company) => {
  const ticker = companyTickerMap[company.trim().toLowerCase()];

  if (!ticker) {
    throw new Error(`Ticker not found for "${company}"`);
  }

  return ticker;
};