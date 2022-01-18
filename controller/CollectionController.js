const collectionService = require('../service/CollectionService');

 const getAllCollectionsController = async (req, res) => {
    const numberOfCollections = parseInt(req.query.numberOfCollection);
    try {
        const collections = await collectionService.getAllCollection(numberOfCollections);
        res.json(collections);
    } catch (e) {
        res.json(e);
    }
}

const getOneCollectionController = async (req, res) => {
    const collectionId = req.params.id;
    try {
        const data = await collectionService.getOneCollection(collectionId)
        res.json(data)
    } catch (e) {
        res.json(e);
    }
}

const addCollectionController = async (req, res) => {
    const collection = req.body;
    try {
        const data = await collectionService.addCollection(collection)
        res.json(data)
    } catch (e) {
        res.json(e);
    }
}

const searchCollectionController = async (req, res) => {
     const collectionName = req.params.name;
     try {
         const data = await collectionService.searchCollection(collectionName)
         res.json(data)
     } catch (e) {
         res.json(e)
     }
}

module.exports = {getAllCollectionsController, getOneCollectionController, addCollectionController, searchCollectionController};