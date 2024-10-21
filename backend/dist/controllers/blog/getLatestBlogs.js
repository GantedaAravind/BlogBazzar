import blogModel from "../../models/blogModel.js";
const getLatestBlogs = async (req, res, next) => {
    try {
        const blogs = await blogModel
            .find({})
            .populate("authorId", "name profilePicture")
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .limit(3); // Limit the results to the latest 3 blogs
        return res.status(200).json({
            message: "Latest 3 Blogs...🙂",
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
export default getLatestBlogs;
//# sourceMappingURL=getLatestBlogs.js.map