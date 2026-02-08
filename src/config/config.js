import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

export const config = {
  port: process.env.PORT || 5000,

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  dbUrl: process.env.MONGO_DB_URL,

  env: process.env.NODE_ENV || "development",

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",

  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
};
