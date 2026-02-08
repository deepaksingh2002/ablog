import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";

const createPost = asyncHandler(async (req, res) => {
  const { title, content, metaTitle, metaDescription } = req.body;
  
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized request");
  }
  
  if (!title?.trim() || !metaTitle?.trim() || !metaDescription?.trim() || !content?.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  const post = await Post.create({
    title: title.trim(),
    content: content.trim(),
    metaTitle: metaTitle.trim(),
    metaDescription: metaDescription.trim(),
    owner: req.user._id
  });

  const createdPost = await Post.findById(post._id)
    .populate("owner", "name username");

  return res.status(201).json(
    new ApiResponse(201, createdPost, "Post created successfully")
  );
});

const getBlogBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const blog = await Post.findOne({ slug, isPublished: true })
    .populate("owner", "name username");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res.status(200).json(
    new ApiResponse(200, blog, "Blog fetched successfully")
  );
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  const blogs = await Post.find({ isPublished: true })
    .select("title slug metaTitle metaDescription createdAt owner")
    .populate("owner", "name username")
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Post.countDocuments({ isPublished: true });

  return res.status(200).json(
    new ApiResponse(200, {
      blogs,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }, "Blogs fetched successfully")
  );
});

export { createPost, getBlogBySlug, getAllBlogs };
