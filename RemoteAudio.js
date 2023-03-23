const Audio = require('./Audio');

class RemoteAudio extends Audio {
    constructor(artist, name, src, albumUrl, durationMilli) {
        super(artist, name, src);
        this.albumUrl = albumUrl;
        this.durationMilli = durationMilli;
    }

    getAlbumUrl() {
        return this.albumUrl;
    }
    
    async getDurationMilli() {
        return this.durationMilli;
    }
};

module.exports = RemoteAudio;