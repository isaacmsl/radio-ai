const Audio = require('./Audio');

class RemoteAudio extends Audio {
    constructor(name, src, durationMilli) {
        super(name, src);
        this.durationMilli = durationMilli;
    }

    async getDurationMilli() {
        return this.durationMilli;
    }
};

module.exports = RemoteAudio;