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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
        trim: true,
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
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
const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
//# sourceMappingURL=blogModel.js.map