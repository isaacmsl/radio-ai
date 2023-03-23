const LocalAudio = require("./LocalAudio")

const songs = [
    new LocalAudio('Elza Soares', 'Gamação', 'song/Gamação.mp3'),
    new LocalAudio('Alesso, Tove Lo', 'Alesso, Tove Lo - Heroes', 'song/Alesso, Tove Lo - Heroes (Lyrics) we could be.mp3'),
    new LocalAudio('Cartoon', 'Cartoon - On On', 'song/Cartoon - On On (feat. Daniel Levi) [NCS Release].mp3'),
    new LocalAudio('Cartoon', 'Cartoon - Why We Lose', 'song/Cartoon - Why We Lose (feat. Coleman Trapp) [NCS Release].mp3'),
    new LocalAudio('Janji', 'Janji - Heroes Tonight', 'song/Janji - Heroes Tonight (feat. Johnning) [NCS Release].mp3'),
];

module.exports = {
    songs
}