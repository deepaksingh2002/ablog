import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { userRouter } from "./routers/user.router.js";
import { postRouter } from "./routers/post.router.js";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = config.corsOrigin
  ? config.corsOrigin.split(",").map(origin => origin.trim())
  : ["http://localhost:5173"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/api/users", userRouter);
app.use("/api/blogs", postRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";
  
  console.error("Error:", err);
  
  return res.status(status).json({
    success: false,
    statusCode: status,
    message,
    ...(config.env === "development" && { stack: err.stack })
  });
});

export { app };

