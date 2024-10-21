import blogModel from "../../models/blogModel.js";
const getCategoryBlogs = async (req, res, next) => {
    try {
        const category = req.params.category.trim();
        console.log(category);
        const blogs = await blogModel
            .find({ category })
            .populate("authorId", "name profilePicture");
        // console.log(category);
        // console.log(blogs);
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
export default getCategoryBlogs;
//# sourceMappingURL=getCategoryBlogs.js.map