const Audio = require('./Audio');

class RemoteAudio extends Audio {
    constructor(artist, name, src, albumUrl, shareUrl, durationMilli) {
        super(artist, name, src);
        this.albumUrl = albumUrl;
        this.shareUrl = shareUrl;
        this.durationMilli = durationMilli;
    }

    getAlbumUrl() {
        return this.albumUrl;
    }

    getShareUrl() {
        return this.shareUrl;
    }
    
    async getDurationMilli() {
        return this.durationMilli;
    }
};

module.exports = RemoteAudio;