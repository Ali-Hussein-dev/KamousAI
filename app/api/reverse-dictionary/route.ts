import { createChatStream } from "@/utils/openai";

export const runtime = "edge";
const prompt = `
I will give you the meaning of a word and you will suggest only commonly-used words that mean the same, maximum suggestions (4) Do not reiterate my words; simply provide the outcomes without elaboration. Include sentiment for each word using parenthises
`

export async function POST(req: Request) {
    const body = await req.json();
    const { messages } = body;
    return await createChatStream({ messages: [{ role: "system", content: prompt }, ...messages] });
}