require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const collectionRouter = require('./router/CollectionRouter');
const userRouter = require("./router/UserRouter");
const cursorRouter = require("./router/CursorRouter");
const bodyParser = require('body-parser');
const http = require('http');

const hostname = '178.62.228.13';
const port = 8089;


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

require("./config/ConfigDB");

app.use(express.json());
app.use(cors());
app.use('/collection', collectionRouter);
app.use('/user', userRouter);
app.use('/cursor', cursorRouter);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Sysmon App is Up and Running!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
