import { createChatStreamDeepSeek } from "@/utils/deepseek";
import { CreatePrompt } from "@/utils/prompt-builder";
import { type CoreMessage} from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const json = await req.json();
  const { messages, withExplanation } = json;

  const params = {
    messages: [
      {
        role: "system",
        content: "You are a grammar checker."
      },
      {
        role: "user",
        content: CreatePrompt.fixGrammar({TEXT_TO_CORRECT: messages.at(-1).content, withExplanation}),
      },
    ] as CoreMessage[],
    temperature: 0.3,
  };
  return await createChatStreamDeepSeek(params);
}
