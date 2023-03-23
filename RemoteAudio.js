const Audio = require('./Audio');

class RemoteAudio extends Audio {
    constructor(artist, name, src, durationMilli) {
        super(artist, name, src);
        this.durationMilli = durationMilli;
    }

    async getDurationMilli() {
        return this.durationMilli;
    }
};

module.exports = RemoteAudio;