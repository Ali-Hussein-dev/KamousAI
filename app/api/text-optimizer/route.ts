import { createChatStreamDeepSeek } from "@/utils/deepseek";
import { CreatePrompt } from "@/utils/prompt-builder";

export const runtime = "edge";

export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const body = await req.json();
    const { messages, tones = "simple", temperature = 1 } = body;
    const params = {
            messages: [
                { role: "system", content: CreatePrompt.paraphrase(tones) },
                messages.at(-1),
            ],
            temperature,
        }
    return await createChatStreamDeepSeek(params)
}
