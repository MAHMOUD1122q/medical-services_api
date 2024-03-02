import express  from "express";
import {addBlog,allBlog, deleteBlog, singleBlog, threeBlog, updateBlog} from "../controllers/blog.js";

const router = express.Router();

router.post("/add-blog", addBlog)

router.get("/all-blog", allBlog)

router.get("/single-blog/:id", singleBlog)

router.get("/three-blog", threeBlog)

router.patch('/updated-blog/:id',updateBlog);

router.delete("/delete-blog/:id", deleteBlog)

export default router;