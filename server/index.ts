import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { handleDemo } from "./routes/demo";
import { handleCreateCollection, handleGetPortfolio, handleCreatePortfolio, handleUpdatePortfolio, handleDeletePortfolio, handleUploadFile, handleDeleteFile } from "./routes/create-collection";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Multer configuration for file uploads
  const upload = multer({ storage: multer.memoryStorage() });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/create-collection", handleCreateCollection);

  // Portfolio API routes
  app.get("/api/portfolio/:collectionId", handleGetPortfolio);
  app.post("/api/portfolio", handleCreatePortfolio);
  app.put("/api/portfolio", handleUpdatePortfolio);
  app.delete("/api/portfolio/:collectionId/:documentId", handleDeletePortfolio);

  // Storage API routes
  app.post("/api/upload", upload.single('file'), handleUploadFile);
  app.delete("/api/files/:fileId", handleDeleteFile);

  return app;
}
