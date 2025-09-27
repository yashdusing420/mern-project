// server/index.ts
import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { exec } from "child_process";

// ✅ Custom API routes
import professionalsRoute from "./routes/professionals";
import bookingsRoute from "./routes/bookings";
import servicesRoute from "./routes/services"; // 👈 ADD THIS

const app = express();

// Trust proxy for production deployments
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Security middleware – Content Security Policy (dev vs prod)
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'", "data:", "https:"],
              connectSrc: ["'self'"],
              fontSrc: ["'self'"],
              objectSrc: ["'none'"],
              mediaSrc: ["'self'"],
              frameSrc: ["'none'"],
            },
          }
        : {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'", "data:", "https:"],
              connectSrc: ["'self'", "ws:", "wss:"],
              fontSrc: ["'self'"],
              objectSrc: ["'none'"],
              mediaSrc: ["'self'"],
              frameSrc: ["'none'"],
            },
          },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple request logger for /api routes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let captured: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    captured = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${Date.now() - start}ms`;
      if (captured) logLine += ` :: ${JSON.stringify(captured)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

// ✅ Mount custom APIs BEFORE registerRoutes
app.use("/api/professionals", professionalsRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/services", servicesRoute); // 👈 NEW

(async () => {
  // Register remaining routes (auth, etc.)
  const server = await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
    throw err;
  });

  // Dev vs prod serving
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Listen on PORT (default 5000)
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`serving on port ${port}`);

    if (process.env.NODE_ENV === "development") {
      const url = `http://localhost:${port}`;
      log(`Opening browser at ${url}`);
      const command =
        process.platform === "win32"
          ? `start ${url}`
          : process.platform === "darwin"
          ? `open ${url}`
          : `xdg-open ${url}`;
      exec(command, (error) => {
        if (error) log(`Manual browser opening required: ${url}`);
      });
    }
  });
})();
