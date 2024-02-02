import { OpenAIStream, StreamingTextResponse } from "ai";
import { type ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";
import { type Stream } from "openai/streaming";
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

export const createChatStream = async (configs: Partial<ChatCompletionCreateParamsBase>) => {
    const customconfigs: ChatCompletionCreateParamsBase = {
        model: "gpt-3.5-turbo-0125",
        stream: true,
        messages: [],
        ...configs,
    }
    const response = await openai.chat.completions.create(customconfigs) as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>;
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream)
}