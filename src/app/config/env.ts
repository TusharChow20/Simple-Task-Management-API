import * as dotenv from "dotenv";
dotenv.config();

const varEnv = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default varEnv;
