import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d";

export const config = {
  port: process.env.PORT || 5000,

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  dbUrl: process.env.MONGO_DB_URL,

  env: process.env.NODE_ENV || "development",

  // canonical names
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  accessTokenExpiry: ACCESS_TOKEN_EXPIRY,

  refreshTokenSecret: REFRESH_TOKEN_SECRET,
  refreshTokenExpiry: REFRESH_TOKEN_EXPIRY,

  // legacy / alternate keys used across the codebase
  accessTokenSec: ACCESS_TOKEN_SECRET,
  accessTokenExp: ACCESS_TOKEN_EXPIRY,
  refereshTokenSec: REFRESH_TOKEN_SECRET,
  refereshTokenExp: REFRESH_TOKEN_EXPIRY,
};
