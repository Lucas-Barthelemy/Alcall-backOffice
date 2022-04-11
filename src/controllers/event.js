const Event = require("../models/eventModel");
const e = require("express");
const typeEvent = require('../Enum/TypeEvent')

// [POST]
exports.createEvent = async (req, res, next) => {

    for (const param in req.body) {
        switch (param) {
            case 'name':
                break;
            case 'description':
                break;
            case 'members':
                break;
            case 'date':
                break;
            case 'street':
                break;
            case 'city':
                break;
            case 'price':
                break;
            case 'type':
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

    const { price, type } = req.body

    if (!parseFloat(price)) {
        res.status(400).json({
            error: "NOT_VALID_TYPE",
            data: null
        });
        return
    }

    try {
        typeEvent(type)
    } catch (error) {
        res.status(400).json({
            error: "NOT_VALID_TYPE",
            data: null
        });
        return
    }

    const event = new Event({
        ...req.body,
        owner: req.user.firebaseId
    })

    try {
        const newEvent = await event.save()
        res.status(201).json({
            error: null,
            data: newEvent
        });
    } catch (error) {
        res.status(500).json({
            error: "INTERNAL_ERROR",
            data: null
        });
    }
}

// [GET]
exports.getEvents = async (req, res, next) => {
    const events = await Event.find()

    let eventsResult = events.filter((event) => {
        if (event.owner !== req.user.firebaseId) {
            return event
        }
    })

    if (eventsResult.length === 0) {
        res.status(200).json({
            error: null,
            data: null
        });
    }

    res.status(200).json({
        error: null,
        data: eventsResult
    });
}

// [GET]
exports.getEventById = async (req, res, next) => {
    try {
        const event = await Event.findOne({ _id: req.params.eventId})
        res.status(200).json({
            error: null,
            data: event
        });
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null
        });
    }
}

// [PUT]
exports.modifyEvent = async (req, res, next) => {
    for (const param in req.body) {
        switch (param) {
            case 'name':
                break;
            case 'description':
                break;
            case 'members':
                break;
            case 'date':
                break;
            case 'street':
                break;
            case 'city':
                break;
            case 'price':
                break;
            case 'type':
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

    const { price, type } = req.body

    if (price && !parseFloat(price)) {
        res.status(400).json({
            error: "NOT_VALID_TYPE",
            data: null
        });
        return
    }

    try {
        typeEvent(type)
    } catch (error) {
        res.status(400).json({
            error: "NOT_VALID_TYPE",
            data: null
        });
        return
    }

    let eventFind = null
    try {
        eventFind = await Event.findOne({ _id: req.params.eventId })
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null
        });
        return
    }

    if (!(req.user.firebaseId === eventFind.owner)) {
        res.status(401).json({
            error: "NOT_OWNER",
            data: null
        });
        return
    }

    try {
        await Event.updateOne({ _id: req.params.eventId }, { ...req.body, owner: req.user.firebaseId })
        let eventUpdate = await Event.findOne({ _id: req.params.eventId })
        res.status(200).json({
            error: null,
            data: eventUpdate
        });
    } catch (e) {
        res.status(500).json({
            error: "UNKNOWN_ERROR",
            data: null
        });
    }
}

// [DELETE]
exports.deleteEvent = async (req, res, next) => {
    let event = null
    try {
       event = await Event.findOne({ _id: req.params.eventId})
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null,
        });
    }

    if (event != null && !(req.user.firebaseId === event.owner)) {
        res.status(401).json({
            error: "NOT_OWNER",
            data: null
        });
        return
    }

    try {
        await Event.deleteOne({ _id: req.params.eventId})
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

module.exports.addMembers = async (req, res) => {
    let event = null
    const eventId = req.params.eventId

    try {
        event  = await Event.findOne({ _id: eventId })
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null,
        });
        return
    }

    if (event.owner === req.user.firebaseId) {
        res.status(401).json({
            error: "YOU_ARE_OWNER",
            data: null,
        });
        return
    }

    if (event.members.includes(req.user.firebaseId)) {
        res.status(401).json({
            error: "USER_IS_ALREADY_IN_MEMBERS",
            data: null,
        });
        return
    }

    try {
        await Event.updateOne({ _id: eventId }, { members: [...event.members, req.user.firebaseId] })

        let eventUpdate  = await Event.findOne({ _id: eventId })

        res.status(200).json({
            error: null,
            data: eventUpdate,
        });
    } catch (e) {
        res.status(500).json({
            error: "UNKNOWN_ERROR",
            data: null,
        });
    }
}

module.exports.deleteMembers = async (req, res) => {
    let event = null
    const eventId = req.params.eventId

    try {
        event  = await Event.findOne({ _id: eventId })
    } catch (e) {
        res.status(404).json({
            error: "NOT_FOUND",
            data: null,
        });
        return
    }

    if (event.owner === req.user.firebaseId) {
        res.status(401).json({
            error: "YOU_ARE_OWNER",
            data: null,
        });
        return
    }

    if (!event.members.includes(req.user.firebaseId)) {
        res.status(401).json({
            error: "USER_IS_NOT_IN_MEMBERS",
            data: null,
        });
        return
    }

    try {
        let newMembers = event.members.filter((member) => {
            return member != req.user.firebaseId
        })
        await Event.updateOne({ _id: eventId }, { members: newMembers })

        let eventUpdate  = await Event.findOne({ _id: eventId })

        res.status(200).json({
            error: null,
            data: eventUpdate,
        });
    } catch (e) {
        res.status(500).json({
            error: "UNKNOWN_ERROR",
            data: null,
        });
    }
}