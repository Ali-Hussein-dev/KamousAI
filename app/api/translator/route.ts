import { env } from "@/env.mjs";
import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export const runtime = "edge";

export const POST = async (req: Request) => {
    const {
        prompt,
        inputLanguage,
        outputLanguage,
    } = await req.json();
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [{
            role: "system",
            content: `Act as translator, translate from ${inputLanguage} to ${outputLanguage}`,
        }, { role: "user", content: prompt }],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}