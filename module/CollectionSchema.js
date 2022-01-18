const mongoose = require('mongoose');

const cursorSchema = new mongoose.Schema({
    "id": {type : Number},
    "name": {type : String},
    "image": {type :  String},
    "cursor": {"id": {type : Number},
        "name": {type : String},
        "path": {type : String},
        "width": {type : Number},
        "height": {type : Number},
        "offsetX": {type : Number},
        "offsetY": {type : Number},
        "newPath": {type : String}
    },
    "pointer": {
        "id": {type : Number},
        "name": {type : String},
        "path": {type : String},
        "width": {type : Number},
        "height": {type : Number},
        "offsetX": {type : Number},
        "offsetY": {type : Number},
        "newPath": {type : String}
    },
    "newCursorImagePath": {type : String},
    "mediumSrc": {type : String}
})

const collectionSchema = new mongoose.Schema({
    "id" : {type : Number},
    "name" : {type : String},
    "image" : {type : String},
    "slug" : {type : String},
    "count_download": {type : Number},
    "items" : {type : [cursorSchema]},
    "newImage": {type : String}
});

module.exports = mongoose.model("cursorCollection", collectionSchema, "cursorCollection");
