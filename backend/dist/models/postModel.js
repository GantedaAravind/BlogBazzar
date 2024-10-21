import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    featuredImage: {
        type: String,
        required: false, // Optional field for a featured image URL
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [],
    },
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
    },
    category: {
        type: String,
    },
    comments: [
        {
            userId: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, {
    timestamps: true,
});
const blogModel = mongoose.model("Post", blogSchema);
export default blogModel;
//# sourceMappingURL=postModel.js.map