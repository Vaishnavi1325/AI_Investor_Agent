import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { rootRouter } from "./routes/rootRoutes.js";
import { healthRouter } from "./routes/healthRoutes.js";
import { analyzeRouter } from "./routes/analyzeRoutes.js";
import { testAiRouter } from "./routes/testAiRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(express.json({ limit: env.requestBodyLimit }));

app.use("/", rootRouter);
app.use("/health", healthRouter);
app.use("/api/analyze", analyzeRouter);
app.use("/api/test-ai", testAiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
