const OpenAI = require('openai');
const LocalAudio = require('./LocalAudio');
const fs = require('fs');

require('dotenv').config();

const openai = new OpenAI();

class SpeakerAI {
    constructor(themes, voices) {
        this.themes = themes;
        this.voices = voices;
    }

    async getAudioOpenAIRandomTheme() {
        const theme = this.themes[Math.floor(Math.random() * this.themes.length)];
        const voice = this.voices[Math.floor(Math.random() * this.voices.length)];
        try {
            const audioScript = await this.getCompletion(`Você é ${voice}, uma inteligência artificial radialista na Rádio AI. Faça uma breve introdução. Faça um programa rápido de "${theme}".`);
            const bufferMp3FromText = await this.getBufferMp3FromTextWithVoice(audioScript, voice);
            await fs.promises.writeFile(process.env.SPEAKER_FULL_SRC, bufferMp3FromText);
            console.log(`Áudio salvo do programa sobre ${theme}`);
            return new LocalAudio('Inteligência artificial', `Programa sobre ${theme}`, process.env.SPEAKER_FILENAME);
        }
        catch (error) {
            console.error(`Erro no SpeakerAI: ${error.message}`);
        }
    }

    async getBufferMp3FromTextWithVoice(text, voice) {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice,
            input: text,
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        return buffer;
    }

    async getCompletion(prompt) {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: process.env.OPENAI_DJ_MODEL,
        });

        return chatCompletion.choices[0].message.content;
    }
}

module.exports = SpeakerAI;