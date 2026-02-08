import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true
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
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

// Generate slug before saving
postSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    if (!this.slug) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
  }
  next();
});

export const Post = mongoose.model("Post", postSchema);
