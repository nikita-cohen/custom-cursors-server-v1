const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME)
        .catch(e => {
            console.log(e)
    })


