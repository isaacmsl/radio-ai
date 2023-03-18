class Audio {
    constructor(name, src, durationMilli = 0) {
        this.name = name;
        this.src = src;
        this.durationMilli = durationMilli;
    }

    start() {
        this.startTime = Date.now();
    }
    
    getName() {
        return this.name;
    }

    getSrc() {
        return this.src;
    }

    getCurrentAudioTime() {
        return Date.now() - this.startTime;
    }

    async getDurationMilli() {
        return this.durationMilli;
    }

}

module.exports = Audio;