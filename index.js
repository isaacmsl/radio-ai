const http = require('http');
const express = require('express');
const Socket = require('./Socket');

require('dotenv').config()
const app = express();
const server = http.createServer(app);
const socket = new Socket(server);

app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT, () => {
    console.log(`Rádio AI is live!`);
});