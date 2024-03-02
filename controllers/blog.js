import Blog from "../Models/blog.js";


export const addBlog = async (req, res) => {
  const {title,description,img} = req.body

  if (!title) {
    return res.json({
      success: false,
      message: "please enter the title",
    });
  }
  if (!description) {
    return res.json({
      success: false,
      message: "please enter the description",
    });
  }
  if (!img) {
    return res.json({
      success: false,
      message: "please enter the img",
    });
  }


const newBlog = await Blog.create({
    title,
    description,
    img,
  })
  if (newBlog) {
    res.json({
      success: true,
      message: "Add successful",
      newBlog
    })
  }
};
export const deleteBlog = async (req, res) => {
  const {id} = req.params

  const blog = await Blog.findByIdAndDelete(id);
  
  if(blog) {
    return  res.json({
      success: true,
      message: "the blog was deleted",
    });
  }
  if (!blog) {
    return  res.json({
      success: false,
      message: "No Blog found with this ID",
    });
  }
}
export const updateBlog = async (req, res) => {
  const {id} = req.params

  const blog = await Blog.findByIdAndUpdate({_id:id},req.body,{new:true});

  if (blog) {
    return res.json({
      success: true,
      message: "the blog was updated",
      data: blog,
    });
  } else {
    return res.json({
      success: false,
      message: "No found blog",
    });
  }
}
export const allBlog = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 9;

  const blogCount = await Blog.countDocuments();
  const extractAllBlog = await Blog.find()
  .skip(page * limit)
  .limit(limit);

  const pageCount = parseInt(blogCount / limit);

  if (extractAllBlog) {
    return res.json({
      success: true,
      blogCount,
      page: page + 1,
      pageCount: pageCount + 1,
      data: extractAllBlog,
    });
  } else {
    return res.json({
      success: false,
      message: "No found blog",
    });
  }
}

export const singleBlog = async (req, res) => {
  const {id} = req.params;

  const extractBlog = await Blog.findById(id);

  if (extractBlog) {
    return res.json({
      success: true,
      data: extractBlog,
    });
  } else {
    return res.json({
      success: false,
      message: "No found blog",
    });
  }
}
export const threeBlog = async (req, res) => {
  const extractThreeBlog = await Blog.find().limit(3);
  
  if (extractThreeBlog) {
    return res.json({
      success: true,
      data: extractThreeBlog,
    });
  } else {
    return res.json({
      success: false,
      message: "No found user",
    });
  }
}

