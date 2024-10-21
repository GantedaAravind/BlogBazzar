import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(422).json({
      message: errors.array()[0].msg,
      success: false,
      error: true,
      allErrors: errors.array(),
    });
  };
};

export const loginValidator = [
  // Email validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required...📧")
    .isEmail()
    .withMessage("Please enter a valid email address...📧") // More professional message
    .normalizeEmail(), // Normalizes the email

  // Password validation
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required...🔒")
    .isLength({ min: 8 }) // Adjusting the min length to 8 characters
    .withMessage("Password must be at least 8 characters long...🔒")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter...🔑")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter...🔑")
    .matches(/\d/)
    .withMessage("Password must contain at least one number...🔢")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "Password must contain at least one special character (e.g., @, $, !, %, etc.)...🔒"
    ),
];

export const signupValidator = [
  // Name validation
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required...🕵️‍♂️")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long...🕵️‍♂️"),

  ...loginValidator,
];
