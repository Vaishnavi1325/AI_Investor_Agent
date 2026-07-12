# 🤖 AI Investment Research Agent

> An AI-powered investment research tool that analyzes public companies using a multi-step agentic pipeline — fetching live financial data, recent news, and synthesizing it all into a final **Invest / Pass** recommendation.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Deployed Link](#-deployed-link)
- [Screenshots](#-screenshots)
- [How to Run](#-how-to-run)
- [How It Works](#-how-it-works)
- [Key Decisions & Trade-offs](#-key-decisions--trade-offs)
- [Example Runs](#-example-runs)
- [What I Would Improve with More Time](#-what-i-would-improve-with-more-time)
- [AI Development Log (Bonus)](#-ai-development-log-bonus)

---

## 🔍 Overview

**AI Investment Research Agent** is a full-stack application that acts as an autonomous investment analyst. Given a company name, it runs a multi-node agentic graph pipeline that:

1. **Scans the company** — generates a business overview (industry, products, competitors, growth).
2. **Pulls live financials** — fetches real-time data from Finnhub (market cap, P/E ratio, EPS, 52-week range).
3. **Gathers recent news** — retrieves the latest 5 articles from NewsAPI and extracts sentiment.
4. **Assesses risk** — identifies the top 3–5 investment risks from all collected data.
5. **Makes a decision** — produces a structured JSON verdict: **Invest** or **Pass**, with confidence score, pros, cons, and summary.

The entire pipeline is orchestrated using **LangGraph** (a state-machine graph framework from LangChain), with each step modeled as a node in a directed acyclic graph (DAG).

### Tech Stack

| Layer      | Technology                                                     |
| ---------- | -------------------------------------------------------------- |
| LLM        | **Groq** (Llama 3.3 70B Versatile) via `@langchain/groq`      |
| Orchestration | **LangGraph** (`@langchain/langgraph`) — state-machine graph |
| Backend    | **Node.js** + **Express.js** (ES Modules)                      |
| Frontend   | **React 19** + **Vite 8** + **Tailwind CSS 4**                 |
| Financial API | **Finnhub** — company profile and key metrics                |
| News API   | **NewsAPI.org** — latest English news articles                 |
| UI Libraries | **Framer Motion**, **React Icons**, **React Markdown**       |
| Validation | **express-validator** — request body validation                |
| Security   | **Helmet**, **CORS**                                           |

---

## 🌐 Deployed Link

> **Live Demo:** [https://ai-investor-agent-mocha.vercel.app/](https://ai-investor-agent-mocha.vercel.app/)
>
> ⚠️ *Note: The backend is deployed on a free-tier service (e.g., Render). It may take ~30 seconds to cold-start on the first request. If the link is down or keys have expired, please run locally using the instructions below.*

---

## 📸 Screenshots

### Homepage — Hero Section
![Homepage Hero](<Screenshot 2026-07-12 232441.png>)
*The landing page with search bar, quick-pick company buttons, and the live analyst snapshot panel.*

### Analysis Results — Company Overview, Financials, News & Risk , Final Verdict
![Analysis1](<Screenshot 2026-07-12 232530.png>)
![Analysis2](<Screenshot 2026-07-12 232547.png>)
![Analysis3](<Screenshot 2026-07-12 232602.png>)
---

## 🚀 How to Run

### Prerequisites

- **Node.js** ≥ 20.0.0
- **npm** (comes with Node.js)
- API Keys (all free tier):
  - [Groq API Key](https://console.groq.com/) — for LLM inference
  - [Finnhub API Key](https://finnhub.io/) — for financial data
  - [NewsAPI Key](https://newsapi.org/) — for recent news

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI_Investor_Agent.git
cd AI_Investor_Agent
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (use `.env.example` as reference):

```env
NODE_ENV=development
PORT=3000
API_VERSION=1.0.0
CORS_ORIGIN=*
REQUEST_BODY_LIMIT=10kb
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
FINNHUB_API_KEY=your_finnhub_api_key_here
NEWS_API_KEY=your_newsapi_key_here
```

Start the backend:

```bash
npm run dev
```

The server runs on `http://localhost:3000`.

### 3. Setup the Frontend

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### 4. Use the App

1. Open `http://localhost:5173` in your browser.
2. Type a company name (e.g., "Tesla", "Apple", "Nvidia") or click a quick-pick button.
3. Wait ~10–15 seconds for the full analysis pipeline to complete.
4. View the structured results: overview, financials, news, risks, and the final recommendation.

### Supported Companies

The ticker-mapping currently supports these companies out of the box:

| Company    | Ticker |
| ---------- | ------ |
| Tesla      | TSLA   |
| Apple      | AAPL   |
| Microsoft  | MSFT   |
| Amazon     | AMZN   |
| Alphabet/Google | GOOGL |
| Meta       | META   |
| Netflix    | NFLX   |
| Nvidia     | NVDA   |
| AMD        | AMD    |
| Intel      | INTC   |
| Oracle     | ORCL   |
| Adobe      | ADBE   |
| Salesforce | CRM    |
| PayPal     | PYPL   |
| Uber       | UBER   |
| Airbnb     | ABNB   |

> Companies outside this list will return a "Ticker not found" error. See [Key Decisions](#-key-decisions--trade-offs) for why this approach was chosen.

---

## ⚙️ How It Works

### Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│              React + Vite + Tailwind CSS                     │
│                                                              │
│  SearchBar ──→ POST /api/analyze { company } ──→ Results UI  │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│              Express.js + LangGraph Pipeline                 │
│                                                              │
│  ┌─────────┐  ┌───────────┐  ┌────────┐  ┌────────┐  ┌────┐│
│  │ Company  │→ │ Finance   │→ │  News  │→ │  Risk  │→ │Dec-││
│  │  Node   │  │  Node     │  │  Node  │  │  Node  │  │isi-││
│  │(LLM)   │  │(Finnhub   │  │(News   │  │(LLM)  │  │on  ││
│  │         │  │ + LLM)    │  │API+LLM)│  │        │  │Node││
│  └─────────┘  └───────────┘  └────────┘  └────────┘  └────┘│
│       ▲                                                ▼     │
│     START                                             END    │
│                                                              │
│              LangGraph State Machine (DAG)                   │
└──────────────────────────────────────────────────────────────┘
```

### The 5-Node Pipeline (LangGraph DAG)

The core of this project is a **LangGraph StateGraph** that models the research workflow as a directed graph. Each node represents a distinct research step, and data flows through a shared state object:

```
START → companyNode → financeNode → newsNode → riskNode → decisionNode → END
```

#### Node Details

| # | Node            | What It Does                                                                                              | Data Source          |
|---|-----------------|-----------------------------------------------------------------------------------------------------------|----------------------|
| 1 | `companyNode`   | Generates a concise business overview — industry, products, market position, competitors, growth           | LLM (Groq)           |
| 2 | `financeNode`   | Fetches live financial metrics (market cap, P/E, EPS, 52W high/low) and asks the LLM to analyze health   | Finnhub API + LLM    |
| 3 | `newsNode`      | Pulls the 5 most recent English news articles and asks the LLM to extract sentiment and developments      | NewsAPI + LLM        |
| 4 | `riskNode`      | Synthesizes all prior data (overview + financials + news) and identifies the top 3–5 investment risks     | LLM (all prior state) |
| 5 | `decisionNode`  | Produces the final **Invest / Pass** JSON with confidence, pros, cons, and summary                        | LLM (all prior state) |

#### Shared State Schema (LangGraph Annotation)

```javascript
const InvestmentState = Annotation.Root({
  company:    Annotation(),   // Input: company name string
  overview:   Annotation(),   // Output of companyNode
  financials: Annotation(),   // Output of financeNode
  news:       Annotation(),   // Output of newsNode
  risks:      Annotation(),   // Output of riskNode
  decision:   Annotation(),   // Output of decisionNode (JSON object)
});
```

### Backend Architecture (Server)

```
server/
├── server.js                  # Entry point — starts Express, graceful shutdown
├── .env                       # API keys (not committed)
├── .env.example               # Template for required env vars
└── src/
    ├── app.js                 # Express app — middleware, routes, error handling
    ├── config/env.js          # Centralized env config with dotenv
    ├── constants/             # HTTP status codes
    ├── controllers/           # Route handlers (analyzeController)
    ├── errors/                # Custom error classes
    ├── graph/
    │   └── investmentGraph.js # LangGraph DAG definition & compilation
    ├── llm/
    │   └── model.js           # Groq ChatModel initialization
    ├── middlewares/            # errorHandler, asyncHandler, validation
    ├── nodes/                 # The 5 pipeline nodes (company, finance, news, risk, decision)
    ├── prompts/               # Prompt templates
    ├── routes/                # Express route definitions
    ├── services/              # Business logic (analyzeService)
    ├── types/                 # Type definitions
    └── utils/                 # Helpers (companyTicker map, API response formatter)
```

### Frontend Architecture (Client)

```
client/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Root component with routing
    ├── index.css              # Global styles (Tailwind imports)
    ├── App.css                # Additional app-level styles
    ├── components/
    │   ├── Navbar.jsx         # Top navigation with tech badges
    │   ├── SearchBar.jsx      # Company search input + submit
    │   ├── Loading.jsx        # Animated loading state
    │   ├── OverviewCard.jsx   # Company overview display
    │   ├── FinancialCard.jsx  # Financial analysis display
    │   ├── NewsCard.jsx       # News sentiment display
    │   ├── RiskCard.jsx       # Risk assessment display
    │   ├── DecisionCard.jsx   # Final recommendation (Invest/Pass)
    │   ├── MarkdownContent.jsx# Renders markdown from LLM responses
    │   └── Footer.jsx         # Page footer
    ├── pages/
    │   └── Home.jsx           # Main page — orchestrates search & results
    └── services/
        └── api.js             # Axios instance for backend calls
```

### Request Flow

1. User types "Tesla" and clicks **Analyze**
2. Frontend sends `POST /api/analyze` with `{ "company": "Tesla" }`
3. `express-validator` validates the input
4. `analyzeController` calls `analyzeService`
5. `analyzeService` invokes the compiled LangGraph (`investmentGraph.invoke()`)
6. LangGraph executes all 5 nodes sequentially, building up the shared state
7. The completed state (overview, financials, news, risks, decision) is returned
8. Frontend renders the results across 5 card components with Framer Motion animations

---

## 🧠 Key Decisions & Trade-offs

### 1. LangGraph over Simple Sequential Functions

**Chose:** LangGraph state machine for pipeline orchestration.

**Why:** LangGraph provides a structured, extensible graph framework. Each node is independently testable, and the state flows cleanly between them. Adding new analysis steps (e.g., competitor comparison, ESG scoring) is as simple as adding a new node and edge — no refactoring needed.

**Trade-off:** Adds a dependency and some boilerplate. A simple `Promise.all()` or sequential `await` chain would have been lighter, but less extensible.

### 2. Groq (Llama 3.3 70B) over OpenAI / Gemini

**Chose:** Groq with Llama 3.3 70B Versatile.

**Why:** Groq offers extremely fast inference (~200ms per call) with a generous free tier. Llama 3.3 70B provides strong reasoning for financial analysis at zero cost during development.

**Trade-off:** Slightly lower quality than GPT-4o for nuanced financial commentary. However, the speed advantage (sub-second responses vs. 2-3s) makes the UX significantly better.

### 3. Static Ticker Map vs. Dynamic Lookup

**Chose:** A hardcoded `companyTickerMap` object mapping ~17 popular companies.

**Why:** Keeps the codebase simple, avoids an extra API call for ticker resolution, and ensures reliable mapping for the demo companies. Adding new companies is a one-line change.

**Trade-off:** Doesn't support arbitrary company names. A production version would use a search API (e.g., Finnhub's `/search` endpoint) for dynamic ticker resolution.

### 4. Sequential Node Execution over Parallel

**Chose:** Sequential execution (Company → Finance → News → Risk → Decision).

**Why:** Later nodes depend on earlier outputs. The `riskNode` needs the overview, financials, and news context. The `decisionNode` needs everything. True parallelism is only possible for independent data fetches (e.g., finance + news could run in parallel).

**Trade-off:** Total latency is the sum of all node times (~10–15 seconds). With parallelization of `financeNode` and `newsNode`, this could drop to ~8–10 seconds.

### 5. Tailwind CSS over Custom CSS / Component Libraries

**Chose:** Tailwind CSS v4 with `@tailwindcss/vite` plugin.

**Why:** Rapid styling with utility classes. The glassmorphism effects, gradients, and responsive layout were all achievable with Tailwind alone — no need for a heavy UI library like MUI or Chakra.

**Trade-off:** Class strings in JSX can be verbose. Some developers prefer CSS modules or styled-components for better separation of concerns.

### 6. What Was Left Out

- **Authentication / User accounts** — not needed for a demo.
- **Database / Result caching** — each analysis is fresh; results aren't persisted.
- **Streaming / SSE** — results arrive all at once; streaming each node's output as it completes would improve perceived speed.
- **Historical trend charts** — could integrate Chart.js or Recharts for price history.
- **Multiple LLM comparison** — could run the same pipeline with different models and compare outputs.
- **Testing suite** — no unit/integration tests; would add Jest + Supertest in production.

---

## 📊 Example Runs

### Example 1: Tesla

**Input:** `Tesla`

**Company Overview:**
> Tesla operates in the electric vehicle and clean energy industry. Its main products include electric cars (Model 3, Model Y, Model S, Model X), energy storage systems (Powerwall, Megapack), and solar panels. Tesla holds a dominant position in the global EV market with ~20% market share. Major competitors include BYD, Rivian, Ford (Mach-E), and GM (Ultium). Recent growth highlights include record deliveries exceeding 1.8M vehicles and expansion of Gigafactory operations globally.

**Financial Analysis:**
> Market Cap: ~$850B | P/E Ratio: ~70x | EPS: ~$3.50 | 52W Range: $138–$278.
> Strengths: Strong brand, category leader, vertically integrated.
> Concerns: Elevated P/E, margin compression from price cuts, increasing competition.

**AI Recommendation:**
```json
{
  "recommendation": "Invest",
  "confidence": 68,
  "pros": [
    "Market leader in EVs with strong brand moat",
    "Vertically integrated (batteries, software, manufacturing)",
    "Growing energy storage segment with high margins"
  ],
  "cons": [
    "P/E ratio significantly above industry average",
    "Margin pressure from aggressive pricing strategy"
  ],
  "summary": "Tesla remains a long-term growth play in EVs and energy, but the elevated valuation demands caution. Suitable for risk-tolerant investors."
}
```

---

### Example 2: Apple

**Input:** `Apple`

**Company Overview:**
> Apple is a technology company known for consumer electronics and software services. Key products include iPhone, Mac, iPad, Apple Watch, and a growing services segment (App Store, Apple Music, iCloud, Apple TV+). Apple holds the #1 or #2 position in smartphones, tablets, and smartwatches globally. Competitors include Samsung, Google (Pixel), and Microsoft. Recent highlights include the Vision Pro launch and record services revenue.

**Financial Analysis:**
> Market Cap: ~$3.4T | P/E Ratio: ~33x | EPS: ~$6.50 | 52W Range: $164–$237.
> Strengths: Massive cash reserves, services revenue growth, strong ecosystem lock-in.
> Concerns: iPhone dependency (~52% of revenue), China market risks.

**AI Recommendation:**
```json
{
  "recommendation": "Invest",
  "confidence": 82,
  "pros": [
    "World's most valuable company with strong cash generation",
    "Services segment growing 15%+ YoY with high margins",
    "Unmatched ecosystem loyalty and switching costs"
  ],
  "cons": [
    "Revenue concentration in iPhone",
    "Regulatory risks in App Store and EU markets"
  ],
  "summary": "Apple is a blue-chip quality holding with strong fundamentals and growing services revenue. The premium valuation is justified by consistent execution."
}
```

---

### Example 3: Nvidia

**Input:** `Nvidia`

**Company Overview:**
> Nvidia is a semiconductor company leading the AI/ML accelerator market. Its GPU products (H100, A100, RTX series) dominate data center AI training and gaming. Nvidia holds ~80%+ market share in AI training chips. Competitors include AMD (MI300X), Intel (Gaudi), and custom silicon from Google (TPU) and Amazon (Trainium). Recent highlights include record data center revenue and the Blackwell architecture launch.

**Financial Analysis:**
> Market Cap: ~$3.0T | P/E Ratio: ~60x | EPS: ~$12.00 | 52W Range: $39–$140.
> Strengths: AI boom demand, 75%+ gross margins, dominant market position.
> Concerns: Customer concentration (hyperscalers), export restrictions to China.

**AI Recommendation:**
```json
{
  "recommendation": "Invest",
  "confidence": 78,
  "pros": [
    "Undisputed leader in AI/ML training hardware",
    "Data center revenue growing 200%+ year-over-year",
    "Strong software ecosystem with CUDA moat"
  ],
  "cons": [
    "Extremely high valuation leaves little room for error",
    "US-China export controls could limit growth"
  ],
  "summary": "Nvidia is the premier AI infrastructure play. While the valuation is stretched, the secular demand for AI compute supports the growth thesis. Position sizing is key."
}
```

> ⚠️ **Disclaimer:** These are AI-generated analyses for demonstration purposes only. They do not constitute financial advice. Always do your own research before making investment decisions.

---

## 🔮 What I Would Improve with More Time

1. **Streaming / Server-Sent Events (SSE):** Stream each node's output to the frontend as it completes instead of waiting for the entire pipeline. This would drastically improve perceived latency and user experience.

2. **Dynamic Ticker Resolution:** Replace the static `companyTickerMap` with Finnhub's `/search` endpoint so any publicly traded company can be analyzed without needing to add it manually.

3. **Parallel Node Execution:** Run `financeNode` and `newsNode` concurrently since they don't depend on each other — only on `companyNode` output. This would cut ~3–5 seconds off total analysis time.

4. **Result Caching & History:** Store past analyses in a database (MongoDB / PostgreSQL) so users can revisit results. Add a "Recent Searches" sidebar.

5. **Historical Price Charts:** Integrate Alpha Vantage or Yahoo Finance data with a charting library (Recharts / Chart.js) to show price trends alongside the AI analysis.

6. **Test Suite:** Add comprehensive unit tests (Jest) for each node, integration tests (Supertest) for the API, and component tests (React Testing Library) for the frontend.

7. **Multi-Model Comparison:** Let users compare outputs from different LLMs (GPT-4, Gemini, Claude) side-by-side for the same company.

8. **ESG & Competitor Nodes:** Add new graph nodes for ESG (Environmental, Social, Governance) scoring and detailed competitor analysis.

9. **PDF Report Export:** Generate a downloadable PDF investment report from the analysis results.

10. **Rate Limiting & Auth:** Add rate limiting to prevent API abuse and optional user authentication for personalized experiences.

---

## 🤖 AI Development Log (Bonus)

This project was built with the assistance of an AI coding assistant (Gemini / Claude). Below is a log of key prompts used during development. The AI served as a **helper and advisor** — suggesting approaches, debugging issues, and reviewing decisions — while all architectural choices, code structure, and final implementations were driven by me.

### Session Log

#### 1. Initial Architecture Planning
**Prompt:** *"What's the best way to structure a multi-step AI agent pipeline in Node.js? I'm thinking of using LangChain."*

**AI helped with:** Suggested LangGraph's `StateGraph` pattern over plain LangChain chains. Pointed me to the `Annotation.Root` API for defining shared state. I chose this over a simple function chain because of extensibility.

---

#### 2. LangGraph Node Structure
**Prompt:** *"How do I define nodes in LangGraph that share state? I need 5 steps: company overview, financials, news, risk, and decision."*

**AI helped with:** Showed the basic syntax for `addNode()` and `addEdge()` with `START` / `END` constants. I adapted the pattern to my specific use case and designed the state schema.

---

#### 3. Finnhub API Integration
**Prompt:** *"How do I fetch company financial metrics from Finnhub? I need P/E ratio, market cap, and EPS."*

**AI helped with:** Identified the correct endpoints (`/stock/profile2` and `/stock/metric`) and the parameter names. I combined both calls with `Promise.all()` for efficiency.

---

#### 4. Decision Node JSON Parsing
**Prompt:** *"The LLM sometimes wraps JSON in markdown code blocks. How to handle that reliably?"*

**AI helped with:** Suggested the `replace(/```json/g, "").replace(/```/g, "")` cleanup pattern with a `try/catch` fallback. I added the fallback object structure for graceful degradation.

---

#### 5. Frontend Card Layout
**Prompt:** *"Suggest a clean card-based layout for displaying AI analysis results — overview, financials, news, risks, and a recommendation card."*

**AI helped with:** Recommended the two-column layout with the analysis stack on the left and the decision card on the right. I implemented the glassmorphism design and added Framer Motion animations.

---

#### 6. Error Handling Middleware
**Prompt:** *"What's a good Express error handling pattern with custom error classes?"*

**AI helped with:** Outlined the `asyncHandler` wrapper pattern and operational vs. programmer error distinction. I adapted it to my project structure.

---

#### 7. Environment Configuration
**Prompt:** *"Best practice for managing env vars in a Node.js project with ES modules?"*

**AI helped with:** Suggested the centralized `config/env.js` with `Object.freeze()` and the `.env.example` pattern. Simple but effective.

---

> **Note:** All conversations were part of an iterative development process. The AI accelerated development by ~40% by reducing time spent on API documentation lookup and boilerplate patterns, but every design decision, code structure, and debugging effort was mine. The full chat session transcript is available upon request.

---

## 📄 License

This project is for educational and demonstration purposes only. Not intended for production use or real investment decisions.

---

<p align="center">
  Built with ❤️ using LangGraph, Groq AI, React & Node.js
</p>
