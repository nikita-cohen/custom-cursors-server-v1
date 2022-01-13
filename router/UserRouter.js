const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller/UserController')

router.post('/', userController.addUserController)

router.delete('/:id', userController.deleteUserController)

router.get('/last-used/:id', userController.getUserLastUsedCollectionController)

router.get('/collection/:id', userController.getUserCollectionController)

module.exports = router;


