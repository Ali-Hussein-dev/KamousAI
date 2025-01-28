import { CreatePrompt } from "@/utils/prompt-builder";
import { createChatStreamDeepSeek } from "@/utils/deepseek";

export const runtime = "edge";

export const POST = async (req: Request) => {
  const { prompt, inputLanguage, outputLanguage } = await req.json();
  const params = {
    messages: [
      {
        role: "system",
        content: CreatePrompt.translate(inputLanguage, outputLanguage),
      },
      { role: "user", content: prompt },
    ],
  };
  return await createChatStreamDeepSeek(params);
};
