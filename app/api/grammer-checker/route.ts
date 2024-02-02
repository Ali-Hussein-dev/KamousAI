import { CreatePrompt } from "@/utils/prompt-builder";
import { createChatStream } from "@/utils/openai";

export const runtime = "edge";



export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const json = await req.json();
  const { messages, withExplanation } = json;
  return await createChatStream({
    messages: [
      {
        role: "system",
        content: CreatePrompt.fixGrammar(withExplanation),
      },
      messages.at(-1),
    ], temperature: 0.3
  });
}
