const axios = require('axios');
const Queue = require('./Queue');
const RemoteAudio = require('./RemoteAudio');

class JamendoQueue extends Queue {
    constructor(limit, fuzzytags) {
        super();
        const fuzzytagsStr = fuzzytags.join('+');
        this.urlReq = `https://api.jamendo.com/v3.0/tracks/?client_id=2b8dda4b&limit=${limit}&fuzzytags=${fuzzytagsStr}&boost=popularity_week`;
    }

    getUrlReq() {
        return this.urlReq;
    }

    async pull() {
        const res = await axios.get(this.urlReq);
        const { data } = res;

        data.results.forEach((song) => {
            const remoteAudio = new RemoteAudio(
                song.name,
                song.audio,
                song.duration * 1000
            );
            
            this.enqueue(remoteAudio);
        });
    }
}

module.exports = JamendoQueue;