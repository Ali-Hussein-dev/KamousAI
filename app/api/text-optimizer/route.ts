import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env.mjs";

export const runtime = "edge";

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const body = await req.json();

    const { messages } = body;
    // Request the OpenAI API for the response based on the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [messages[0], messages.at(-1)],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}
