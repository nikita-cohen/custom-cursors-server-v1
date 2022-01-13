const express = require('express');
const collectionController = require("../controller/collection-controller/CollectionController")
const router = express.Router();

router.get('/', collectionController.getAllCollectionsController)

router.get('/:id', collectionController.getOneCollectionController)

router.post('/add', collectionController.addCollectionController)

module.exports = router;