import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Post} from "../models/post.model.js";

const createPost = asyncHandler(async (req, res) => {
    const {title, content, metaTitle, metaDescription } = req.body;
    if(!req.user?._id){
        throw new ApiError(401, "Unauthorized request");
    }
    if (!title || !metaTitle || !metaDescription ||content) {
        throw new ApiError(400, "All fields are required");
    }
    const post = await Post.create({
        title,
        content,
        metaTitle,
        metaDescription,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            post, 
            "Post created successfully"
        )
    )
});

const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const blog = await Post.findOne({ slug, isPublished: true })
    .populate("owner", "name");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res.status(200).json(
    new ApiResponse(200, blog, "Blog fetched successfully")
  );
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Post.find({ isPublished: true })
    .select("title slug metaTitle metaDescription createdAt owner")
    .populate("owner", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, blogs, "Blogs fetched successfully")
  );
});

export {createPost, getBlogBySlug, getAllBlogs}