import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add blog title"],
  },
  description: {
    type: String,
    required: [true, "please add blog decription"],
  },
  img: {
    type: String,
    required: [true, "please add blog image"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
