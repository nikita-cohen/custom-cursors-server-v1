const express = require('express');
const router = express.Router();
const userService = require("../service/UserService");


router.route('/')
    .post(async (req, res) => {
        const newUser = req.body;
        try {
            let data = await userService.addUser(newUser);
            res.send(data).status(200);
        } catch (e) {
            console.log(e);
        }
    })

router.route('/:id')
    .delete(async  (req, res) => {
        const userId = req.params.id;
        try {
            const data = await userService.deleteUser(userId)
            res.send(data).status(200);
        } catch (e) {
            console.log(e)
        }
    })


router.route('/last-used/:id')
    .get(async  (req, res) => {
        const userId = req.params.id;
        try {
            const data = await userService.getUserLastUsedCollection(userId);
            res.send(data).status(200);
        } catch (e) {
            console.log(e)
        }
    })

router.route('/collection/:id')
    .get(async  (req, res) => {
        const userId = req.params.id;
        try {
            const data = await userService.getUserCollection(userId)
            res.send(data).status(200);
        } catch (e) {
            console.log(e)
        }
    })

module.exports = router;