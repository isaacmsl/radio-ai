const INITIAL_AUDIO_SRC = 'slogan.mp3';
const MILLI_DELAY_BETWEEN_AUDIOS = 2000;
const JAMENDO_QUEUE_QNT = 100;
const JAMENDO_GENRES = ['rock', 'eletronic', 'house', 'lofi'];

const LocalAudio = require('./LocalAudio');
const { songs } = require('./audios');
const Queue = require('./Queue');
const JamendoQueue = require('./JamendoQueue');
const SpeakerAI = require('./SpeakerAI');

const SLOGAN_AUDIO = new LocalAudio('Slogan', INITIAL_AUDIO_SRC);

class DJ {
    constructor(io) {
        this.speakerAI = new SpeakerAI(["piadas", "curiosidades", "música"]);
        this.io = io;
        this.currentAudio = SLOGAN_AUDIO;
        this.queue = new Queue();
        this.queue.enqueue(SLOGAN_AUDIO);
        this.jamendoQueue = new JamendoQueue(JAMENDO_QUEUE_QNT, JAMENDO_GENRES);
        this.jamendoQueue.pull();
        this.rockIt();
    }

    queueJamendos(qnt) {
        while(qnt--) {
            if (!this.jamendoQueue.isEmpty) {
                this.queue.enqueue(this.jamendoQueue.dequeue());
            } else {
                return;
            }
        }
    }

    letMeSeeNextAudio() {
        if (this.queue.length == 0) {
            this.queue.enqueue(SLOGAN_AUDIO);
            this.speakerAI.getAudioRandomTheme().then((audio) => {
                if (audio) {
                    this.queue.enqueue(audio);
                }
            });
            if (!this.jamendoQueue.isEmpty) {
                this.queueJamendos(4);
            } else {
                this.jamendoQueue.pull();
                this.queue.enqueue(songs[Math.floor(Math.random() * songs.length)]);
            }
        }

        this.currentAudio = this.queue.dequeue();
    }

    updateSongTo(channel) {
        const songInfo = {
            name: this.currentAudio.getName(),
            src: this.currentAudio.getSrc(),
            time: this.currentAudio.getCurrentAudioTime()
        };
        channel.emit("Song-Info", songInfo);
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