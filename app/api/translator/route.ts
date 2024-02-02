import { CreatePrompt } from "@/utils/prompt-builder";
import { createChatStream } from "@/utils/openai";

export const runtime = "edge";

export const POST = async (req: Request) => {
    const {
        prompt,
        inputLanguage,
        outputLanguage,
    } = await req.json();
    return await createChatStream({
        messages: [{
            role: "system",
            content: CreatePrompt.translate(inputLanguage, outputLanguage)
        }, { role: "user", content: prompt }]
    });
}