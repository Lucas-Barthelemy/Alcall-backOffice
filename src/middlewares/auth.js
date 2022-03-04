const firebase = require("../firebase/admin");
const userDto = require("../dto/UserDTO");

async function authMiddleware(request, response, next) {
    const headerToken = request.headers.authorization;
    if (!headerToken) {
        return response.send({ message: "No token provided" }).status(401);
    }

    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        response.send({ message: "Invalid token" }).status(401);
    }
    const token = headerToken.split(" ")[1];
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token, true);
        const firebaseUser = await firebase.auth().getUser(decodedToken.uid);

        let usr = new userDto()
        usr.firebaseId = firebaseUser.uid
        usr.mail = firebaseUser.email

        request.user = usr
        next();
    } catch (error) {
        return response.send({ message: error.message }).status(401);
    }
}

module.exports = authMiddleware;
