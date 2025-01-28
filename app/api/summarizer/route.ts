import { CreatePrompt } from "@/utils/prompt-builder";
import { createChatStreamDeepSeek } from "@/utils/deepseek";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, mode } = body;
  const params = {
    messages: [
      { role: "system", content: CreatePrompt.summarize(mode) },
      ...messages,
    ],
  };
  return await createChatStreamDeepSeek(params);
}
