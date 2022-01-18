const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
    "cursorsCollection" : {type : []},
    "lastUsedCollection" : {type : []}
});

module.exports = mongoose.model("users", userSchema);
