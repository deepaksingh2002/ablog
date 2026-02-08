import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { config } from "./config/config.js";

const app = express()

app.set("trust proxy", 1);

const allowedOrigins = config.corsOrigin
  ? config.corsOrigin.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-side calls
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import {userRouter} from "./routers/user.router.js";
import {postRouter} from "./routers/post.router.js";

app.use("/api/users", userRouter);
app.use("/api/blogs", postRouter);

export { app }