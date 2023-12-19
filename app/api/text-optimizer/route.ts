import { createChatStream } from "@/utils/openai";

export const runtime = "edge";


export async function POST(req: Request) {
    // Extract the `messages` from the body of the request
    const body = await req.json();
    const { messages } = body;
    return await createChatStream({ messages: [messages[0], messages.at(-1)] });
}
