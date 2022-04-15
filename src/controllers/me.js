const Event = require("../models/eventModel");
const Group = require("../models/groupModel");
const User = require('../models/userModel');
const express = require("express");
const typeEvent = require('../Enum/TypeEvent');



// [GET]
exports.getEvents = async (req, res) => {
    const events = await Event.find()

    let myEvents = events.filter((event) => {
        if (event.owner === req.user.firebaseId) {
            return event
        }
    })

    if (myEvents.length === 0) {
        res.status(200).json({
            error: null,
            data: null
        });
    } else {
        res.status(200).json({
            error: null,
            data: myEvents
        });
    }
}

// [GET]
exports.getGroups = async (req, res) => {
    const groups = await Group.find()
    const user = await User.findOne({firebaseId: req.user.firebaseId})

    let myGroups = groups.filter((group) => {
        if (group.owner === req.user.firebaseId || group.members.includes(user._id)) {
            return group
        }
    })

    if (myGroups.length === 0) {
        res.status(200).json({
            error: null,
            data: null
        });
    } else {
        res.status(200).json({
            error: null,
            data: myGroups
        });
    }
}

exports.getMe = async (req, res) => {
    try {
        let myInformations = await User.findOne({ firebaseId: req.user.firebaseId });
        res.status(200).json({
            error: null,
            data: myInformations
        });
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null
        });
    }
}