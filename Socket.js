
const initSocket = require('socket.io');
const DJ = require('./DJ');

class Socket {
    constructor(server) {
        this.server = server;
        this.io = initSocket(server);
        this.dj = new DJ(this.io);

        this.io.on('connection', (socket) => {
            
            socket.on('disconnect', () => {
                this.io.emit('Qnt-Clients', this.io.sockets.sockets.size);
            });

            socket.on("Get-Song", () => {
                this.io.emit('Qnt-Clients', this.io.sockets.sockets.size);

                this.dj.updateSongTo(socket);
            });
        })
    }
}

module.exports = Socket;