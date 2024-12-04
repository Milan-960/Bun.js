import { createServer } from "./indexRoute";
import { loggerMiddleware } from "./logger";

// Create and configure the server
const server = createServer({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  middleware: [loggerMiddleware],
});

// Graceful shutdown handler
const shutdown = () => {
  console.log("Shutting down server...");
  server.stop();
  process.exit(0);
};

// Handle shutdown signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(`
 _____       _     _
|  __ \\     | |   | |
| |__) |   _| |__ | |_ ___
|  ___/ | | | '_ \\| __/ __|
| |   | |_| | |_) | |_\\__ \\
|_|    \\__,_|_.__/ \\__|___/

Bun server running on port ${server.port}
`);
