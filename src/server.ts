import mongoose from "mongoose";
import app from "./app";
import varEnv from "./app/config/env";

let server: ReturnType<typeof app.listen>;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(varEnv.MONGODB_URI);
    console.log("MongoDB connected successfully");

    server = app.listen(varEnv.PORT, () => {
      console.log(`Server running on port ${varEnv.PORT}`);
      console.log(` API: http://localhost:${varEnv.PORT}/api/v1`);
    });
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! Shutting down...", err.name, err.message);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...", err.name, err.message);
  process.exit(1);
});