import { compare } from "bcrypt";
import userModel from "../../models/userModel.js";
import { createToken } from "../../utils/token-manager.js";
import { COOKIE_NAME } from "../../utils/constants.js";
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // console.log(email,password);
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: "User Not Regestered...😣",
                success: false,
                error: true,
            });
        }
        const isPasswordCorrect = await compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Incorrect Password...😣",
                success: false,
                error: true,
            });
        }
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            sameSite: "none",
            signed: true,
            secure: true, // Set to true only in production
        });
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //change the domain when production
        return res
            .cookie(COOKIE_NAME, token, {
            path: "/", // Default path
            httpOnly: true, // Prevents client-side access via JavaScript
            sameSite: "none", // Required for cross-origin cookies
            secure: true, // Must be true if using HTTPS
            signed: true,
        })
            .status(200)
            .json({
            message: "Login sccessfully...🙂",
            data: existingUser,
            token: token,
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
export default userLogin;
//# sourceMappingURL=login.js.map