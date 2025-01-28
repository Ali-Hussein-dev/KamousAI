import { type CoreMessage, smoothStream, streamText } from "ai";
import { deepseek } from "@ai-sdk/deepseek";

export async function createChatStreamDeepSeek(configs: {
    messages: CoreMessage[],
    system?: string,
    temperature?: number,
}) {
    console.log({apiKey: process.env.DEEPSEEK_API_KEY})
    const res =  streamText({
        model: deepseek("deepseek-chat"),
        ...configs,
        messages: configs.messages,

        experimental_transform: smoothStream({
            // delayInMs: 12, // optional: defaults to 10ms
            delayInMs: 12
        }),
    });
    return res.toDataStreamResponse();
}