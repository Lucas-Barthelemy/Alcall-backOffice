const User = require("../models/userModel.js");

// [GET]
exports.getUserByEmail = async (req, res, next) => {
    try {
        console.log(req.params)
        const user = await User.findOne({email: req.params.userEmail})
        console.log(user)
        res.status(200).json({
            error: null,
            data: user
        });
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null
        });
    }
}