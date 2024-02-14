import { createChatStream } from "@/utils/openai";
import { CreatePrompt } from "@/utils/prompt-builder";

export const runtime = "edge";

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const body = await req.json();
    const { messages, tones = "simple" } = body;
    return await createChatStream({
        messages: [
            { role: "system", content: CreatePrompt.paraphrase(tones) },
            messages.at(-1),
        ],
        temperature: 1.3,
    });
}
