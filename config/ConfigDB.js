const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME).then(data => console.log(data))
        .catch(e => {
            console.log(e)
    })


