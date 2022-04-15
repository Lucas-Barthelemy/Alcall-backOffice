const User = require("../models/userModel.js");
const Group = require("../models/groupModel.js");

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

// [GET]
exports.getUsersGroup = async (req, res, next) => {
    try {
        const group = await Group.findOne({_id: req.params.groupId})

        let owner = []
        owner[0] = await User.findOne({ firebaseId: group.owner })

        let members = await Promise.all(group.members.map((memberId) =>  {
            return User.findOne({ _id: memberId})
        }));

        members = owner.concat(members)

        res.status(200).json({
            error: null,
            data: members
        });
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null
        });
    }
}