import { COOKIE_NAME } from "../../utils/constants.js";
const userLogOut = async (req, res, next) => {
    try {
        res
            .clearCookie(COOKIE_NAME, {
            path: "/", // Default path
            httpOnly: true, // Prevents client-side access via JavaScript
            sameSite: "none", // Required for cross-origin cookies
            secure: true, // Must be true if using HTTPS
            signed: true,
        })
            .status(200)
            .json({
            message: "Logout Successfully...😣",
            success: true,
            error: false,
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: true,
            error: false,
        });
    }
};
export default userLogOut;
//# sourceMappingURL=logout.js.map