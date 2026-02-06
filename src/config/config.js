import { configDotenv } from "dotenv";

configDotenv({
    path: './.env'
});

export const config= {
    port: process.env.PORT,
    cors: process.env.CORS,
    dbUrl: process.env.MONGO_DB_URL,
    env: process.env.NODE_ENV,
    accessTokenSec: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExp: process.env.ACCESS_TOKEN_EXPIRY,
    refereshTokenSec: process.env.REFRESH_TOKEN_SECRET,
    refereshTokenExp: process.env.REFRESH_TOKEN_EXPIRY,
    cloudName: process.env.CLOUDINARY_CLOUD,
    cloudSec: process.env.CLOUDINARY_API_SECRET,
    cloudKey: process.env.CLOUDINARY_API_KEY

}