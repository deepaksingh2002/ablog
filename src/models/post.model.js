import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    content: {
      type: String,
      required: true
    },

    metaTitle: {
      type: String,
      required: true,
      maxlength: 60
    },

    metaDescription: {
      type: String,
      required: true,
      maxlength: 160
    },

    isPublished: {
      type: Boolean,
      default: true
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);