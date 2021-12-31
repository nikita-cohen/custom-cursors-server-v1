const express = require('express');
const router = express.Router();
const userService = require("../service/UserService");

router.route('/')
    .post(async (req, res) => {
        const data = req.body;
        try {
            const status = await userService.addCursor(data);
            res.send(status).status(200);
        } catch (e) {
            console.log(e)
        }
    })

router.route('/')
    .delete(async (req, res) => {
        const data = req.body;
        try {
            const status = await userService.deleteCursor(data)
            res.send(status).status(200);
        } catch (e) {
            console.log(e)
        }
    })

module.exports = router;