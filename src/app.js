import cookieParser from "cookie-parser";
import express from "express";

const app = express()


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import {userRoutes} from "./routers/user.router.js";
import {postRoutes} from "./routers/post.router.js";

app.use("/api/users", userRoutes);
app.use("/api/blogs", postRoutes);

export { app }