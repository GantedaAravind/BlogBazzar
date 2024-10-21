import blogModel from "../../models/blogModel.js";
const getBlogDetails = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId).populate("authorId", "name profilePicture");
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found...🙁",
                success: false,
                error: true,
            });
        }
        return res.status(200).json({
            message: "BLog Details...🙄",
            data: blog, // Optionally return the deleted blog data
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
export default getBlogDetails;
//# sourceMappingURL=getBlogDetails.js.map