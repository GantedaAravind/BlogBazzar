import blogModel from "../../models/blogModel.js";
const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await blogModel.find({}).populate("authorId", "name profilePicture");
        return res.status(200).json({
            message: "All Blogs...🙂",
            data: blogs,
            success: true,
            error: false,
        });
    }
    catch (err) {
        return res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
        });
    }
};
export default getAllBlogs;
//# sourceMappingURL=getAllBlogs.js.map