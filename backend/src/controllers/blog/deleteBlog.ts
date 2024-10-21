import { NextFunction, Request, Response } from "express";
import blogModel from "../../models/blogModel.js";

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found...🙁",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Deleted Successfully...🙄",
      data: blog, 
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

export default deleteBlog;
