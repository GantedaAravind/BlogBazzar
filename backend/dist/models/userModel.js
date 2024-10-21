import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user", // Default role is 'user', 'admin' for administrators
    },
    profilePicture: {
        type: String, // URL to profile picture
        default: "",
    },
}, {
    timestamps: true,
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
//# sourceMappingURL=userModel.js.map