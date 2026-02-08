import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { config } from "../config/config.js";



export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");       
         if (!token) {
            throw new ApiError(401, "Invalid access token.");
        }
        const decodedToken = jwt.verify(token, config.accessTokenSec);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Unauthorized access.");
        }
        req.user = user;
        next()

    } catch (error) {
        // If access token expired, try to refresh using refresh token
        if (error.name === "TokenExpiredError") {
            const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

            if (!incomingRefreshToken) {
                throw new ApiError(401, "Access token expired");
            }

            let decodedRefresh;
            try {
                decodedRefresh = jwt.verify(incomingRefreshToken, config.refereshTokenSec);
            } catch (err) {
                throw new ApiError(401, "Refresh token expired or invalid");
            }

            const user = await User.findById(decodedRefresh._id);
            if (!user || user.refreshToken !== incomingRefreshToken) {
                throw new ApiError(401, "Invalid refresh token");
            }

            // Generate new tokens
            const newAccessToken = user.generateAccessToken();
            const newRefreshToken = user.generateRefreshToken();

            user.refreshToken = newRefreshToken;
            await user.save({ validateBeforeSave: false });

            const options = {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
            };

            res.cookie("accessToken", newAccessToken, options);
            res.cookie("refreshToken", newRefreshToken, options);

            const sanitizedUser = await User.findById(user._id).select("-password -refreshToken");
            req.user = sanitizedUser;
            return next();
        }

        throw new ApiError(401, "Invalid access token");
    }
})