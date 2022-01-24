const userService = require("../service/UserService");

const addCursorController = async (req, res) => {
    const data = req.body;
    try {
        const status = await userService.addCursor(data);
        res.send(status).status(200);
    } catch (e) {
        res.send(e);
    }
}

const deleteCursorController = async (req, res) => {
    const data = req.body;
    try {
        const status = await userService.deleteCursor(data)
        res.send(status).status(200);
    } catch (e) {
        res.json(e);
    }
}

module.exports = {addCursorController, deleteCursorController};