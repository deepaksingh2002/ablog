import { Router } from "express";
import { createPost, getBlogBySlug, getAllBlogs} from "../controllers/post.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewate.js";

const router = Router();

router.route("/createblog").post(verifyJWT, createPost);
router.route("/:slug").get(getBlogBySlug);
router.route("/").get(getAllBlogs);

export { router as postRouter };