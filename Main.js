const express = require('express');
const cors = require('cors');
const app = express();
const collectionRouter = require('./router/CollectionRouter');
const userRouter = require("./router/UserRouter");
const cursorRouter = require("./router/CursorRouter")

require("./config/ConfigDB");

app.use(express.json());
app.use(cors());
app.use('/collection', collectionRouter);
app.use('/user', userRouter);
app.use('/cursor', cursorRouter);

app.listen(8089);