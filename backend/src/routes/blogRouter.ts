import { Router } from "express";
import { verifyTheAdmin, verifyTheToken } from "../utils/token-manager.js";
import createBlog from "../controllers/blog/createBlog.js";
import getAllBlogs from "../controllers/blog/getAllBlogs.js";
import deleteBlog from "../controllers/blog/deleteBlog.js";
import getMyBlogs from "../controllers/blog/getMyBlogs.js";
import getBlogDetails from "../controllers/blog/getBlogDetails.js";
import getCategoryBlogs from "../controllers/blog/getCategoryBlogs.js";
import getLatestBlogs from "../controllers/blog/getLatestBlogs.js";
import getSearch from "../controllers/blog/search.js";
import getTrendingBlogs from "../controllers/blog/getTreandingBlogs.js";

const blogRouter = Router();
blogRouter.get("/", verifyTheToken, verifyTheAdmin, getAllBlogs);
blogRouter.post("/create-blog", verifyTheToken, createBlog);
blogRouter.delete("/delete-blog/:id", verifyTheToken, deleteBlog);
blogRouter.get("/my-blogs", verifyTheToken, getMyBlogs);
blogRouter.get("/details/:id", getBlogDetails);
blogRouter.get("/category/:category", getCategoryBlogs);
blogRouter.get("/latest", getLatestBlogs);
blogRouter.get("/search", getSearch);
blogRouter.get("/treanding",getTrendingBlogs)
export default blogRouter;
