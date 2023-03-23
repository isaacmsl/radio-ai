const socket = io();
const audio = document.querySelector('audio');
const audioName = document.querySelector('#audioName');
const volumePanel = document.querySelector('#volumePanel');
const rangeVolume = document.querySelector('#rangeVolume');
const qntClients = document.querySelector('#qntClients');
const playBtn = document.querySelector('#playBtn');
const volumeIcon = document.querySelector('#volumeIcon');
const artistName = document.querySelector('#artistName');
const album = document.querySelector('#album');

audio.volume = 0.5;
let lastVolume = audio.volume;

function toggleMute() {
    if (audio.volume == 0) {
        rangeVolume.value = lastVolume;
    } else {
        lastVolume = audio.volume;
        rangeVolume.value = 0;
    }

    updateVolume();
}

function updateVolume() {
    audio.volume = rangeVolume.value;
    if (audio.volume > 0 && audio.volume <= 0.5) {
        volumeIcon.src = "volume-1.svg";
    } else if (audio.volume > 0.5) {
        volumeIcon.src = "volume-2.svg";
    } else {
        volumeIcon.src = "volume-x.svg";
    }
}

function listen() {
    socket.emit("Get-Song");
    playBtn.style.display = "none";
    volumePanel.style.display = "flex";
}

socket.on("Qnt-Clients", (qnt) => {
    qntClients.innerHTML = qnt;
});

socket.on("Song-Info", (songInfo) => {
    if (songInfo.albumUrl) {
        album.src = songInfo.albumUrl;
    } else {
        album.src = "default.jpg";
    }
    songInfo.artist && (artistName.innerHTML = songInfo.artist);
    songInfo.name && (audioName.innerHTML = songInfo.name);
    songInfo.src && (audio.src = songInfo.src);
    songInfo.time && (audio.currentTime = songInfo.time / 1000);
    audio.play();
});