import { createChatStreamDeepSeek } from "@/utils/deepseek";
import { CreatePrompt } from "@/utils/prompt-builder";

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const json = await req.json();
  const { messages, withExplanation } = json;
  const params = {
    messages: [
      {
        role: "system",
        content: CreatePrompt.fixGrammar(withExplanation),
      },
      messages.at(-1),
    ],
    temperature: 0.3,
  };
  return await createChatStreamDeepSeek(params);
}
