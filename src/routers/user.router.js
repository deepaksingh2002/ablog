import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewate.js";
import {registerUser, logInUser, logOutUser, getCurrentUser, refreshAccessToken} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/logout").get(verifyJWT, logOutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/refresh-token").post(refreshAccessToken);

export { router as userRouter };
