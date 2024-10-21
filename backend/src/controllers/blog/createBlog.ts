import { NextFunction, Request, Response } from "express";
import blogModel from "../../models/blogModel.js";

const createblog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, featuredImage, tags,category } = req.body;

    const authorId = res.locals._id;
    const blog = new blogModel({
      title,
      content,
      tags,
      authorId,
      featuredImage,
      category
    });

    await blog.save();

    res.status(200).json({
      message: "Blog Created Successfully...🙂",
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

export default createblog;
