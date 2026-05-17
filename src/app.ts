import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import varEnv from "./app/config/env";

const app: Application = express();

// Cached connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(varEnv.MONGODB_URI);
  isConnected = true;
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);

// Connect DB on every request
app.use(async (_req, _res, next) => {
  await connectDB();
  next();
});

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Task Management API is running thankssss",
    version: "1.0.0",
  });
});

// API routes
app.use("/api/v1", router);

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use(notFound);

export default app;
