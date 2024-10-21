import { Router } from "express";
import { verifyTheToken } from "../utils/token-manager.js";
import createPost from "../controllers/post/createPost.js";
const postRouter = Router();
postRouter.post("/create-post", verifyTheToken, createPost);
export default postRouter;
//# sourceMappingURL=postRouter.js.map