import OpenAI from "openai";

const openai = new OpenAI();

export async function getOpenaiAudio({ input }: { input: string }) {
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input,
    });
    return Buffer.from(await mp3.arrayBuffer());
}