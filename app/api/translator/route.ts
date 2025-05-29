import { CreatePrompt } from "@/utils/prompt-builder";
import { createChatStreamDeepSeek } from "@/utils/deepseek";

export const runtime = "edge";

export const POST = async (req: Request) => {
  const { prompt, inputLanguage, outputLanguage } = await req.json();

  return await createChatStreamDeepSeek({
    messages: [
      {
        role: "system",
        content: "You are a multilingual translator. Your task is to translate text from one language to another accurately and fluently. You will be given the source language, target language, and the text to translate. Your response should contain only the translated text, without any additional comments or explanations.",
      },
      { role: "user", content: CreatePrompt.translate({TEXT_TO_TRANSLATE: prompt, inputLanguage, TARGET_LANGUAGE: outputLanguage}) },
    ],
  });
};
