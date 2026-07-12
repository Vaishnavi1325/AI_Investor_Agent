import app from "./src/app.js";
import { env } from "./src/config/env.js";

const server = app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Closing HTTP server.`);
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

