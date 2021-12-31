const express = require('express');
const collectionService = require('../service/CollectionService');
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const numberOfCollections = parseInt(req.query.numberOfCollection);
        try {
            const collections = await collectionService.getAllCollection(numberOfCollections);
            res.json(collections);
        } catch (e) {
            console.log(e);
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        const collectionId = req.params.id;
        try {
            const data = await collectionService.getOneCollection(collectionId)
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    });


module.exports = router;