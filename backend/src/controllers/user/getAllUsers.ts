import { NextFunction, Request, Response } from "express";
import userModel from "../../models/userModel.js";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      message: "All Users...🙂",
      data: users,
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

export default getAllUsers;
