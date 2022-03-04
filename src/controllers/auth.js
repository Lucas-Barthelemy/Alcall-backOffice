const User = require('../models/userModel');

exports.registerUser = async (req, res, next) => {
    const user = new User({
        ...req.body,
        firebaseId: req.user.firebaseId
    })
    try {
        await user.save()
        res.status(201).json({ message: 'Post saved successfully!' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

exports.me = async (req, res, next) => {
    try {
        const user = await User.findOne({ firebaseId: req.user.firebaseId })
        res.status(200).json({ data: user })
    } catch (error) {
        res.status(404).json({ error: "NOT_FOUND" })
    }
}