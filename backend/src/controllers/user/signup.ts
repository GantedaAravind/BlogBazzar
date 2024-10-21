import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import userModel from "../../models/userModel.js";
import { createToken } from "../../utils/token-manager.js";
import { COOKIE_NAME } from "../../utils/constants.js";

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, profilePicture } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      profilePicture,
    });

    await user.save();
    // console.log(password);

    //create token and store cookie
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    return res
      .cookie(COOKIE_NAME, token, {
        path: "/", // Default path
        httpOnly: true, // Prevents client-side access via JavaScript
        sameSite: "none", // Required for cross-origin cookies
        secure: true, // Must be true if using HTTPS
        signed: true,
      })
      .status(200)
      .json({
        message: "SignUP sccessfully...🙂",
        data: user,
        success: true,
        error: false,
      });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({
        message: "User already exists with this email...😐",
        success: false,
        error: true,
      });
    }

    return res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

export default userSignup;
