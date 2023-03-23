const BASE_SRC = "audio/"
const FULL_BASE_SRC = "public/" + BASE_SRC;

const { getAudioDurationInSeconds } = require('get-audio-duration');
const Audio = require('./Audio');

class LocalAudio extends Audio {
    constructor(artist, name, src) {
        super(artist, name, BASE_SRC + src, 0);
        this.fullSrc = FULL_BASE_SRC + src;   
    }

    async getDurationMilli() {
        if (!this.durationMilli) {
            const seconds = await getAudioDurationInSeconds(this.fullSrc);
            this.durationMilli = seconds * 1000;
        }

        return this.durationMilli;
    }

    getFullSrc() {
        return this.fullSrc;
    }
}

module.exports = LocalAudio;