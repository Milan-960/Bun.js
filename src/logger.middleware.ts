// Logger middleware to log incoming requests
export function loggerMiddleware(req: Request): Request | null {
  const url = new URL(req.url);
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${url.pathname}`);

  // Optional request filtering/blocking logic
  if (url.pathname.includes("suspicious")) {
    console.warn(`Blocked suspicious request to ${url.pathname}`);
    return null; // Block the request
  }

  return req; // Allow the request to continue
}
