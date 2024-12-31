import { type CoreMessage, streamText } from "ai";
import { openai, } from '@ai-sdk/openai';
import OpenAI from "openai";


export async function getOpenaiAudio({ input }: { input: string }) {
    const openai = new OpenAI();
    const mp3 = await openai.audio.speech.create({
        model: "tts-1-hd",
        voice: "alloy",
        input,
    });
    return Buffer.from(await mp3.arrayBuffer());
}

export const createChatStream = async (configs: {
    messages: CoreMessage[],
    system?: string,
    temperature?: number,
}) => {


    const customConfigs = {
        temperature: 0.5,
        ...configs,
    }
    // Respond with the stream
    const res = streamText({
        model: openai('gpt-4o-mini'
        ),
        ...customConfigs,
        messages: customConfigs.messages,
    })
    return res.toDataStreamResponse()
}