import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
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

// auto genrate slug form title.
postSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Post = mongoose.model("Post", postSchema);