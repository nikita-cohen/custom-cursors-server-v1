const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    "id" : {"type": "Number"},
    "name" : {"type": "String"},
    "image" : {"type": "String"},
    "slug" : {"type": "String"},
    "count_download": {"type": "Number"},
    "items" : {"type": ["Mixed"]},
    "newImage": {"type": "String"}
});

module.exports = mongoose.model("cursorCollection", collectionSchema, "cursorCollection");
