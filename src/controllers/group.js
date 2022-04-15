const Group = require("../models/groupModel.js");
const User = require("../models/userModel.js");

// [POST]
exports.createGroup = async (req, res, next) => {

    for (const param in req.body) {
        switch (param) {
            case 'name':
                break;
            case 'description':
                break;
            case 'members':
                break;
            case 'owner':
                break;
            default:
                res.status(400).json({
                    error: "MALFORMED_JSON",
                    data: null
                });
                return;
        }
    }

    const group = new Group({
        ...req.body,
        owner: req.user.firebaseId
    })

    try {
        const newGroup = await group.save()
        res.status(201).json({
            error: null,
            data: newGroup
        });
    } catch (error) {
        res.status(500).json({
            error: "INTERNAL_ERROR",
            data: null
        });
    }
}

// [GET]
exports.getGroupById = async (req, res, next) => {
    try {
        const group = await Group.findOne({ _id: req.params.groupId})
        res.status(200).json({
            error: null,
            data: group
        });
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null
        });
    }
}

// [PUT]
exports.modifyGroup = async (req, res, next) => {
    for (const param in req.body) {
        switch (param) {
            case 'name':
                break;
            case 'description':
                break;
            case 'members':
                break;
            case 'owner':
                break;
            default:
                res.status(400).json({
                    error: "MALFORMED_JSON",
                    data: null
                });
                return;
        }
    }

    let groupFind = null

    try {
        groupFind = await Group.findOne({ _id: req.params.groupId })
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null
        });
        return
    }

    if (!(req.user.firebaseId === groupFind.owner)) {
        res.status(401).json({
            error: "NOT_OWNER",
            data: null
        });
        return
    }

    try {
        await Group.updateOne({ _id: req.params.groupId }, { ...req.body, owner: req.user.firebaseId })
        let groupUpdate = await Group.findOne({ _id: req.params.groupId })
        res.status(200).json({
            error: null,
            data: groupUpdate
        });
    } catch (e) {
        res.status(500).json({
            error: "UNKNOWN_ERROR",
            data: null
        });
    }
}

// [DELETE]
exports.deleteGroup = async (req, res, next) => {
    let group = null
    try {
       group = await Group.findOne({ _id: req.params.groupId})
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null,
        });
    }

    if (group != null && !(req.user.firebaseId === group.owner)) {
        res.status(401).json({
            error: "NOT_OWNER",
            data: null
        });
        return
    }

    try {
        await Group.deleteOne({ _id: req.params.groupId})
        res.status(200).json({
            error: null,
            data: {},
        });
    } catch (error) {
        res.status(500).json({
            error: "UNKNOWN_ERROR",
            data: null,
        });
    }
}

// POST
module.exports.addMembers = async (req, res) => {
    let group = null
    const userId = req.params.userId
    const groupId = req.params.groupId

    try {
        group  = await Group.findOne({ _id: groupId })
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null,
        });
        return
    }

    if (group.owner !== req.user.firebaseId) {
        res.status(401).json({
            error: "YOU_ARE_NOT_OWNER",
            data: null,
        });
        return
    }

    if (group.members.includes(userId)) {
        res.status(401).json({
            error: "USER_IS_ALREADY_IN_MEMBERS",
            data: null,
        });
        return
    }

    try {
        await Group.updateOne({ _id: groupId }, { members: [...group.members, userId] })
        let groupUpdate  = await Group.findOne({ _id: groupId })
        res.status(200).json({
            error: null,
            data: groupUpdate,
        });
    } catch (e) {
        res.status(500).json({
            error: "UNKNOWN_ERROR",
            data: null,
        });
    }
}

// DELETE
module.exports.deleteMembers = async (req, res) => {
    let group = null
    const groupId = req.params.groupId

    try {
        group  = await Group.findOne({ _id: groupId })
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null,
        });
        return
    }

    if (group.owner === req.user.firebaseId) {
        res.status(401).json({
            error: "YOU_ARE_OWNER",
            data: null,
        });
        return
    }

    if (!group.members.includes(req.user.firebaseId)) {
        res.status(401).json({
            error: "USER_IS_NOT_IN_MEMBERS",
            data: null,
        });
        return
    }

    try {
        let newMembers = group.members.filter((member) => {
            return member != req.user.firebaseId
        })
        await Group.updateOne({ _id: groupId }, { members: newMembers })

        let groupUpdate  = await Group.findOne({ _id: groupId })

        res.status(200).json({
            error: null,
            data: groupUpdate,
        });
    } catch (e) {
        res.status(500).json({
            error: "UNKNOWN_ERROR",
            data: null,
        });
    }
}

const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}