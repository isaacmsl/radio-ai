const OpenAI = require('openai');
const LocalAudio = require('./LocalAudio');
const gTTS = require('gtts');
const fs = require('fs');

require('dotenv').config();

const openai = new OpenAI();

class SpeakerAI {
    constructor(themes) {
        this.themes = themes;
    }

    async getAudioRandomTheme() {
        const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
        try {
            const audioScript = await this.getCompletion(`Você é inteligência artificial radialista na Rádio AI. Faça uma breve introdução. Faça um programa rápido de "${theme}".`);

            const gtts = new gTTS(audioScript, 'pt-br');

            return new Promise((resolve, reject) => {
                if (fs.existsSync(process.env.SPEAKER_FULL_SRC)) {
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
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: process.env.OPENAI_DJ_MODEL,
        });

        return chatCompletion;
    }
}

module.exports = SpeakerAI;