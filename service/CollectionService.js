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
        CollectionSchema.findOne({_id : collectionId},
            ((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        }))
    })
}

const addCollection = (collection) => {
    return new Promise((resolve, reject) => {
        const newCollection = new CollectionSchema({
            "id" : collection.id,
            "name" : collection.name,
            "image" : collection.image,
            "slug" : collection.slug,
            "count_download": collection.count_download,
            "items" : collection.items,
            "newImage": collection.newImage
            })

        newCollection.save((err) => {
            if (err) {
                reject(err)
            } else {
              resolve(newCollection)
            }
        })
    })
}

const searchCollection = (word) => {
    return new Promise((resolve, reject) => {
        CollectionSchema.find({name : {$regex : new RegExp("^" + word.toLowerCase(), "i")}},
            (err, data) => {
            if (err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


module.exports = {getAllCollection, getOneCollection, addCollection, searchCollection};