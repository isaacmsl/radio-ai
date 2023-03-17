const BASE_SRC = "audio/"
const FULL_BASE_SRC = "public/" + BASE_SRC;

const { getAudioDurationInSeconds } = require('get-audio-duration')

class Audio {
    constructor(name, src) {
        this.name = name;
        this.src = BASE_SRC + src;
        this.fullSrc = FULL_BASE_SRC + src;   
    }

    start() {
        this.startTime = Date.now();
    }
    
    async getDurationMilli() {
        const seconds = await getAudioDurationInSeconds(this.fullSrc);
        const milli = seconds * 1000; 
        return milli;
    }

    getName() {
        return this.name;
    }

    getFullSrc() {
        return this.fullSrc;
    }

    getSrc() {
        return this.src;
    }

    getCurrentAudioTime() {
        return Date.now() - this.startTime;
    }

}

module.exports = Audio;