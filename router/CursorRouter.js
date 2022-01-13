const express = require('express');
const router = express.Router();
const cursorController = require("../controller/CursorController")

router.post('/', cursorController.addCursorController)

router.delete('/', cursorController.deleteCursorController)

module.exports = router;