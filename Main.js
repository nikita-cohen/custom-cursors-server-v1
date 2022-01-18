require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const collectionRouter = require('./router/CollectionRouter');
const userRouter = require("./router/UserRouter");
const cursorRouter = require("./router/CursorRouter");
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

require("./config/ConfigDB");

app.use(express.json());
app.use(cors());
app.use('/collection', collectionRouter);
app.use('/user', userRouter);
app.use('/cursor', cursorRouter);

const port = 8089;
const host = "178.62.228.13";

app.listen(port)


