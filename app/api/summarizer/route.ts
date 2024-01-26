import { createChatStream } from "@/utils/openai";

export const runtime = "edge";
const prompt = `Summarize the following text`

export async function POST(req: Request) {
    const body = await req.json();
    const { messages } = body;
    return await createChatStream({ messages: [{ role: "system", content: prompt }, ...messages] });
}