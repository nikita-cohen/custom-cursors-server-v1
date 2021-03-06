const userSchema = require("../module/UserSchema");
const collectionService = require("../service/CollectionService");

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        const newUser = new userSchema({
            "cursorsCollection" : user.cursorsCollection,
            "lastUsedCollection" : user.lastUsedCollection
        })
        newUser.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve(newUser)
            }
        })
    })
}

const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        userSchema.findOneAndDelete({_id : userId},
            (err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs);
            }
        })
    })
}

const getOneUser = (userId) => {
    return new Promise((resolve, reject) => {
        userSchema.findOne({_id : userId} , (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const findCursorInCollection = (collectionId, cursorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await collectionService.getOneCollection(collectionId);

            const cursorObj = {
                collectionId ,
                collectionName : data.name
            }

            data.items.forEach(cursor => {
                if (cursor.id === cursorId) {
                    cursorObj.cursorObj = cursor;
                    resolve(cursorObj)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const addCursorToUserCollection = (user, cursor) => {
    let cursorArray = user.cursorsCollection;
    const cursorObject = {
            id : cursor.cursorObj.id,
            name : cursor.cursorObj.name,
            image : cursor.cursorObj.newCursorImagePath,
            cursor_path : cursor.cursorObj.cursor.newPath,
            pointer_path : cursor.cursorObj.pointer.newPath,
            collectionName : cursor.collectionName,
            collectionId : cursor.collectionId,
            width : 128,
            height : 128
        }
        cursorArray.push(cursorObject)
    return cursorArray
}

const updateUser = (userId, user) => {
    return new Promise((resolve, reject) => {
        const newUser = {
            cursorsCollection : user.cursorsCollection,
            lastUsedCollection : user.lastUsedCollection
        }
        userSchema.findByIdAndUpdate(userId, newUser, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("updated")
            }
        })
    })
}

const isCursorExistInUserCollection = (userCollection, cursorId) => {
    let isExist = false;
    userCollection.forEach(cursor => {
        if (cursor.id === cursorId) {
            isExist = true;
        }
    })
    return isExist
}

const addCollectionToUserLastUsedCollection = (user, collectionId) => {
    let lastUsed = user.lastUsedCollection;
    lastUsed.push(collectionId);
    return lastUsed;
}

const isLastUsedCollection = (userLastUsed, collectionID) => {
    let isExist = false;
    userLastUsed.forEach(collection => {
        if (collection === collectionID) {
            isExist = true;
        }
    })
    return isExist
}

const replaceLastUsedCursor = (user, collectionId) => {
    const newArray = user.lastUsedCollection;
    const index  = newArray.findIndex(x => x === collectionId)
    newArray.splice(index, 1);
    user.lastUsedCollection = newArray;
    return addCollectionToUserLastUsedCollection(user, collectionId);
}

const addCursor = (dataObject) => {
    return new Promise(async (resolve, reject) => {
        try {
           const user = await getOneUser(dataObject.userId);
           const cursor = await findCursorInCollection(dataObject.collectionId, dataObject.cursorId);

           const isExistCollection = isCursorExistInUserCollection(user.cursorsCollection, cursor.cursorObj.id);
           const isExistLastUsed = isLastUsedCollection(user.lastUsedCollection, cursor.collectionId);

           if (!isExistCollection && !isExistLastUsed) {
                user.lastUsedCollection = addCollectionToUserLastUsedCollection(user, cursor.collectionId);
                user.cursorsCollection = addCursorToUserCollection(user, cursor);

                const status = await updateUser(user.id, user);

                resolve(status)
           } else if (!isExistCollection) {
               user.cursorsCollection = addCursorToUserCollection(user, cursor);
               user.lastUsedCollection = replaceLastUsedCursor(user, cursor.collectionId);

               const status = await updateUser(user.id, user);

               resolve(status)
           } else {
               resolve("you already got this cursor")
           }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCursor = (dataObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getOneUser(dataObject.userId);
            const userCollection = user.cursorsCollection;
            let index = userCollection.findIndex(cursor => cursor.id === dataObject.cursorId);
            userCollection.splice(index , 1);
            user.cursorsCollection = userCollection;
            const status = await updateUser(user._id, user)
            resolve(status)
        } catch (e) {
            reject(e)
        }
    })
}

const getUserLastUsedCollection = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getOneUser(userId);
            resolve(user.lastUsedCollection)
        } catch (e) {
            reject(e)
        }
    })
}

const getUserCollection = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getOneUser(userId);
            resolve(user.cursorsCollection);
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {addUser, deleteUser, addCursor, deleteCursor, getUserLastUsedCollection, getUserCollection};
