import { Router } from "express";
import { verifyTheAdmin, verifyTheToken } from "../utils/token-manager.js";
import getAllUsers from "../controllers/user/getAllUsers.js";
import userSignup from "../controllers/user/signup.js";
import userLogin from "../controllers/user/login.js";
import userDetails from "../controllers/user/getDetails.js";
import userLogOut from "../controllers/user/logout.js";
import {
  loginValidator,
  signupValidator,
  validate, 
} from "../utils/validators.js"; 

const userRouter = Router();  

userRouter.get("/", verifyTheToken, verifyTheAdmin, getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/details", verifyTheToken, userDetails);
userRouter.get("/logout", verifyTheToken, userLogOut);

export default userRouter;
