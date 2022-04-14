const Event = require("../models/eventModel");
const Group = require("../models/groupModel");
const express = require("express");
const typeEvent = require('../Enum/TypeEvent');

// [GET]
exports.getEvents = async (req, res, next) => {
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
    }

    res.status(200).json({
        error: null,
        data: myEvents
    });
}

// [GET]
exports.getGroups = async (req, res, next) => {
    const groups = await Group.find()

    let myGroups = groups.filter((group) => {
        if (group.owner === req.user.firebaseId || group.members.includes(req.user.firebaseId)) {
            return group
        }
    })

    if (myGroups.length === 0) {
        res.status(200).json({
            error: null,
            data: null
        });
    }

    res.status(200).json({
        error: null,
        data: myGroups
    });
}