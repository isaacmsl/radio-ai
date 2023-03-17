const http = require('http');
const express = require('express');
const Socket = require('./Socket');

const app = express();
const server = http.createServer(app);
const socket = new Socket(server);

app.use(express.static(__dirname + '/public'));

server.listen(3000, () => {
    console.log(`Rádio AI is live!`);
});