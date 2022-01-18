const express = require('express');
const collectionController = require("../controller/CollectionController")
const router = express.Router();

router.get('/', collectionController.getAllCollectionsController)

router.get('/:id', collectionController.getOneCollectionController)

router.get('/search/:name', collectionController.searchCollectionController)

router.post('/add', collectionController.addCollectionController)

module.exports = router;