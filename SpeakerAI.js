const { Configuration, OpenAIApi } = require("openai");
const LocalAudio = require('./LocalAudio');
const gTTS = require('gtts');
const fs = require('fs');

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

class SpeakerAI {
    constructor(themes) {
        this.themes = themes;
    }

    async getAudioRandomTheme() {
        const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
        try {
            const audioScript = await this.getCompletion(`Você é radialista na Rádio AI. Fala um pouco sobre você ser uma inteligência artificial. Faça um programa curto de ${theme}.`);

            const gtts = new gTTS(audioScript, 'pt-br');

            return new Promise((resolve, reject) => {
                if (fs.existsSync(process.env.SPEAKER_FULL_SRC)){
                    fs.rmSync(process.env.SPEAKER_FULL_SRC);
                }
                gtts.save(process.env.SPEAKER_FULL_SRC, function (err, result) {
                    if (err) { reject(error); }
                    console.log(`Áudio salvo do programa sobre ${theme}`);
                    resolve(new LocalAudio('Inteligência artificial', `Programa sobre ${theme}`, process.env.SPEAKER_FILENAME));
                });
            })
        }
        catch (error) {
            console.error(`Erro no SpeakerAI: ${error.message}`);
        }
    }

    async getCompletion(prompt) {
        const response = await openai.createCompletion({
            model: process.env.OPENAI_DJ_MODEL,
            prompt,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.data.choices[0].text;
    }
}

module.exports = SpeakerAI;