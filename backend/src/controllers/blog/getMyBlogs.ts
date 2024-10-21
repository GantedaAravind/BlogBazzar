import { NextFunction, Request, Response } from "express";
import blogModel from "../../models/blogModel.js";

const getMyBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = res.locals._id;
    const blogs = await blogModel
      .find({ authorId })
      .populate("authorId", "name profilePicture");
    if (blogs.length === 0) {
      return res.status(200).json({
        message: "No blogs found for this author...😯",
        data: [],
        success: true,
        error: false,
      });
    }
    return res.status(200).json({
      message: "All Blogs...🙂",
      data: blogs,
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

export default getMyBlogs;
