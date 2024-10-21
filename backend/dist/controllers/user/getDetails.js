import userModel from "../../models/userModel.js";
const userDetails = async (req, res, next) => {
    try {
        const user = await userModel.findById(res.locals._id);
        return res.status(200).json({
            message: "User Datails...🥰",
            data: user,
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
export default userDetails;
//# sourceMappingURL=getDetails.js.map