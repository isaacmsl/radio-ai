const INITIAL_AUDIO_SRC = 'slogan.mp3';
const SONG_ONLY_MODE = true;
const MILLI_DELAY_BETWEEN_AUDIOS = 2000;

const Audio = require('./Audio');
const Queue = require('./Queue');

const SLOGAN_AUDIO = new Audio('Slogan', INITIAL_AUDIO_SRC);

class DJ {
    constructor(io) {
        this.io = io;
        this.currentAudio = new Audio('Slogan', INITIAL_AUDIO_SRC);
        this.queue = new Queue();
        this.queue.enqueue(SLOGAN_AUDIO);
        
        this.rockIt();
    }

    letMeSeeNextAudio() {
        if (this.queue.length == 0) {
            if (SONG_ONLY_MODE) {
                this.queue.enqueue(new Audio('Gamação', 'song/Gamação.mp3'));
                this.queue.enqueue(SLOGAN_AUDIO)
            }
        }

        this.currentAudio = this.queue.dequeue();
    }

    updateSongTo(channel) {
        channel.emit("Song-Name", this.currentAudio.getName());
        channel.emit("Song-Src", this.currentAudio.getSrc());
        channel.emit("Song-Time", this.currentAudio.getCurrentAudioTime());
    }

    updateGuys() {
        console.log(`Playing ${this.currentAudio.getName()}`);
        this.currentAudio.start();
        this.updateSongTo(this.io);
    }

    async rockIt() {
        this.letMeSeeNextAudio();
        this.updateGuys();
        const currentAudioDurationMilli = await this.currentAudio.getDurationMilli();
        setTimeout(() => {
            this.rockIt()
        }, currentAudioDurationMilli + MILLI_DELAY_BETWEEN_AUDIOS);
    }
}

module.exports = DJ;