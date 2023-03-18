const INITIAL_AUDIO_SRC = 'slogan.mp3';
const SONG_ONLY_MODE = true;
const MILLI_DELAY_BETWEEN_AUDIOS = 2000;
const JAMENDO_QUEUE_QNT = 100;
const JAMENDO_GENRES = ['pop', 'rock', 'eletronic', 'latin', 'house', 'lofi'];

const LocalAudio = require('./LocalAudio');
const { songs } = require('./audios');
const Queue = require('./Queue');
const JamendoQueue = require('./JamendoQueue');

const SLOGAN_AUDIO = new LocalAudio('Slogan', INITIAL_AUDIO_SRC);

class DJ {
    constructor(io) {
        this.io = io;
        this.currentAudio = SLOGAN_AUDIO;
        this.queue = new Queue();
        this.queue.enqueue(SLOGAN_AUDIO);
        this.jamendoQueue = new JamendoQueue(JAMENDO_QUEUE_QNT, JAMENDO_GENRES);
        this.jamendoQueue.pull();
        this.rockIt();
    }

    letMeSeeNextAudio() {
        if (this.queue.length == 0) {
            if (SONG_ONLY_MODE) {
                if (!this.jamendoQueue.isEmpty) {
                    this.queue.enqueue(this.jamendoQueue.dequeue());
                    this.queue.enqueue(this.jamendoQueue.dequeue());
                } else {
                    this.jamendoQueue.pull();
                    this.queue.enqueue(songs[Math.floor(Math.random() * songs.length)]);
                }
                this.queue.enqueue(SLOGAN_AUDIO);
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