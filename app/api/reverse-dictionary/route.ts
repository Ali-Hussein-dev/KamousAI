import { CreatePrompt } from "@/utils/prompt-builder";
import { createChatStream } from "@/utils/openai";

export const runtime = "edge";

export async function POST(req: Request) {
    const body = await req.json();
    const { messages } = body;
    return await createChatStream({ messages: [{ role: "system", content: CreatePrompt["reverseDictionary"] }, ...messages] });
}