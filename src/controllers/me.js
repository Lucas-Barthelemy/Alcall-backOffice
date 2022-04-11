const Event = require("../models/eventModel");
const express = require("express");
const typeEvent = require('../Enum/TypeEvent')


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