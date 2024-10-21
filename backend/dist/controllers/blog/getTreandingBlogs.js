import blogModel from "../../models/blogModel.js";
const getTrendingBlogs = async (req, res, next) => {
    try {
        const blogs = await blogModel.aggregate([
            {
                $group: {
                    _id: "$category", // Group by category
                    blog: { $first: "$$ROOT" }, // Get the first blog in each category
                },
            },
            {
                $replaceRoot: { newRoot: "$blog" }, // Replace the root with the blog document
            },
            {
                $lookup: {
                    from: "users", // Assuming your User model is in the same database
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author", // Create a field named author
                },
            },
            {
                $unwind: {
                    path: "$author", // Unwind the author array
                    preserveNullAndEmptyArrays: true, // Optional: keep blogs without an author
                },
            },
            {
                $project: {
                    title: 1, // Include title
                    content: 1, // Include content
                    featuredImage: 1, // Include featuredImage
                    tags: 1, // Include tags
                    status: 1, // Include status
                    category: 1, // Include category
                    createdAt: 1, // Include created timestamp
                    updatedAt: 1, // Include updated timestamp
                    authorId: {
                        _id: "$author._id", // Author ID
                        name: "$author.name", // Author name
                        profilePicture: "$author.profilePicture", // Author profile picture
                    },
                },
            },
        ]);
        // Map the blogs to the desired structure
        const formattedBlogs = blogs.map(blog => ({
            key: blog._id,
            _id: blog._id,
            category: blog.category,
            authorId: {
                _id: blog.authorId._id,
                name: blog.authorId.name,
                profilePicture: blog.authorId.profilePicture,
            },
            content: blog.content,
            title: blog.title,
            featuredImage: blog.featuredImage,
            createdAt: blog.createdAt,
        }));
        return res.status(200).json({
            message: "Trending Blogs! 🙂",
            data: formattedBlogs, // Return the formatted blogs
            success: true,
            error: false,
        });
    }
    catch (err) {
        console.error("Error fetching trending blogs:", err); // Log the error
        return res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
        });
    }
};
export default getTrendingBlogs;
//# sourceMappingURL=getTreandingBlogs.js.map