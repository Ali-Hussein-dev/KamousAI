import { CreatePrompt } from "@/utils/prompt-builder";
import { createChatStreamDeepSeek } from "@/utils/deepseek";

export const runtime = "edge";

export async function POST(req: Request) {
    const body = await req.json();
    const { messages, count } = body;
    return await createChatStreamDeepSeek({ messages: [{ role: "system", content: CreatePrompt.reverseDictionary(count) }, ...messages] });
}