const CollectionSchema = require("../module/CollectionSchema")

const getAllCollection = (numberOfCollections) => {
    return new Promise((resolve, reject) => {
        CollectionSchema.find({published: true})
            .sort({_id:1})
            .limit(numberOfCollections)
            .exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const getOneCollection = (collectionId) => {
    return new Promise((resolve, reject) => {
        CollectionSchema.find({_id : collectionId},
            ((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        }))
    })
}

module.exports = {getAllCollection, getOneCollection};