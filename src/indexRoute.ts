import figlet from "figlet";
import { createAsciiArt } from "./ascii-art";

// Server configuration interface
interface ServerConfig {
  port?: number;
  middleware?: Array<(req: Request) => Request | null>;
}

// Create server with optional middleware
export function createServer(config: ServerConfig = {}) {
  const port = config.port || 3000;

  return Bun.serve({
    port,

    // Main request handler
    async fetch(req: Request) {
      // Apply middlewares
      if (config.middleware) {
        for (const middleware of config.middleware) {
          const modifiedReq = middleware(req);
          if (modifiedReq === null) {
            return new Response("Middleware blocked request", { status: 403 });
          }
        }
      }

      // Route handling
      const url = new URL(req.url);
      switch (url.pathname) {
        case "/":
          return handleHomeRoute();

        case "/health":
          return handleHealthCheck();

        case "/ascii":
          return handleAsciiRoute();

        default:
          return handleNotFound();
      }
    },

    // Error handling
    error(error: Error) {
      return new Response(`An error occurred: ${error.message}`, {
        status: 500,
      });
    },
  });
}

// Route Handlers
function handleHomeRoute(): Response {
  const message = figlet.textSync("Bun.js Rocks!", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  });

  return new Response(message, {
    headers: { "Content-Type": "text/plain" },
  });
}

function handleHealthCheck(): Response {
  return new Response(
    JSON.stringify({
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

function handleAsciiRoute(): Response {
  const art = createAsciiArt("Bun.js Awesome!");
  return new Response(art, {
    headers: { "Content-Type": "text/plain" },
  });
}

function handleNotFound(): Response {
  return new Response("404 - Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain" },
  });
}
