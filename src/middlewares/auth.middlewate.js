import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { config } from "../config/config.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      throw new ApiError(401, "Access token required");
    }
    
    const decodedToken = jwt.verify(token, config.accessTokenSecret); 
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(
        new ApiError(401, "Access token expired. Please refresh token")
      );
    }
    return res.status(401).json(
      new ApiError(401, "Invalid access token")
    );
  }
});
