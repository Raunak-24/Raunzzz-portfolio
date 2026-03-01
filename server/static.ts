import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // ✅ Fall through to index.html ONLY for non-API routes
  app.use((req, res, next) => {
    // ✅ Skip API routes - let them be handled by Express error handler
    if (req.path.startsWith("/api")) {
      return next();
    }
    
    // ✅ For all other routes, serve index.html (for SPA routing)
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
