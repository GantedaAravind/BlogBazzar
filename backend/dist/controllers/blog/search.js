import blogModel from "../../models/blogModel.js";
const getSearch = async (req, res, next) => {
    try {
        const searchKeyword = req.query.query.trim(); // Get the search keyword from query params and trim any whitespace
        // Create a regex for the entire search phrase
        const phraseRegex = new RegExp(searchKeyword, "i"); // Case-insensitive match for the entire phrase
        const searchQuery = {
            $or: [
                { title: phraseRegex }, // Match the entire phrase in the title
                { content: phraseRegex }, // Match the entire phrase in the content
                { tags: { $elemMatch: { $regex: phraseRegex } } } // Match any tag that contains the search phrase
            ],
        };
        // Find blogs based on the search query
        const blogs = searchKeyword
            ? await blogModel.find(searchQuery).populate("authorId", "name profilePicture")
            : await blogModel.find({}).populate("authorId", "name profilePicture");
        return res.status(200).json({
            message: "All Blogs...🙂",
            data: blogs,
            success: true,
            error: false,
        });
    }
    catch (err) {
        return res.status(400).json({
            message: err.message || "Something went wrong",
            success: false,
            error: true,
        });
    }
};
export default getSearch;
//# sourceMappingURL=search.js.map