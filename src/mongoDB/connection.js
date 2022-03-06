const mongoose = require("mongoose")

async function connectionMongoDB() {
    try {
        await mongoose.connect(
            "mongodb+srv://pierre:pierre@cluster0.ikion.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        console.log("Connecté à mongodb")
    } catch (e) {
        console.log("Problème de connexion")
    }
}

module.exports = connectionMongoDB