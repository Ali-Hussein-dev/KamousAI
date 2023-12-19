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
            content: `Act as translator, translate from ${inputLanguage} to ${outputLanguage}`,
        }, { role: "user", content: prompt }]
    });
}