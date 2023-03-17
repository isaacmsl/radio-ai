const socket = io();
const audio = document.querySelector('audio');
const audioName = document.querySelector('#audioName');

function listen() {
    socket.emit("Get-Song");
}

socket.on("Song-Name", (name) => {
    audioName.innerHTML = name;
});

socket.on("Song-Src", (src) => {
    audio.src = src;
});

socket.on("Song-Time", (time) => {
    audio.currentTime = time / 1000;
    audio.play();
});