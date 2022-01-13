const userService = require("../service/UserService");

const addUserController = async (req, res) => {
    const newUser = req.body;
    try {
        let data = await userService.addUser(newUser);
        res.send(data).status(200);
    } catch (e) {
        res.json(e);
    }
}

const deleteUserController = async (req, res) => {
    const userId = req.params.id;
    try {
        const data = await userService.deleteUser(userId)
        res.send(data).status(200);
    } catch (e) {
        res.json(e);
    }
}

const getUserLastUsedCollectionController = async (req, res) => {
    const userId = req.params.id;
    try {
        const data = await userService.getUserLastUsedCollection(userId);
        res.send(data).status(200);
    } catch (e) {
        res.json(e);
    }
}

const getUserCollectionController = async (req, res) => {
    const userId = req.params.id;
    try {
        const data = await userService.getUserCollection(userId)
        res.send(data).status(200);
    } catch (e) {
        res.json(e);
    }
}

module.exports = {addUserController, deleteUserController, getUserLastUsedCollectionController, getUserCollectionController};