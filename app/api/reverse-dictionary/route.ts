import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env.mjs";

export const runtime = "edge";

const prompt = "I will give you the meaning of a word and you will suggest all the words that mean the same.";
const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const body = await req.json();
    const { messages } = body;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [{ role: "system", content: prompt }, ...messages],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}