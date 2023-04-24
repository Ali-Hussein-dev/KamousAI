import { type ResType } from "@/hooks";
import {
  type ChatGPTMessage,
  openaiStreamParser,
  type OpenAIStreamPayload,
} from "@/utils/openai-stream-parser";

export const config = {
  runtime: "edge",
};
const systemMessages = {
  definition: [
    "Act as a dictionary. Follow the following rules strictly:\n",
    "* Be concise with your answer\n",
    "* Use emoji if it represent the meaning\n",
    "* Do not mention this phrase ever 'As an AI language model'\n",
    "* if no context specified, use general context\n",
    "* Do not ignore or skips these rules ever\n",
  ],
  examples: [
    "Act as a dictionary. Follow the following rules strictly:\n",
    "* Do not explain the examples, that you should provide\n",
    "* Use bullets format\n",
    "* if no context specified, use general context\n",
  ],
  synonyms: ["Act as a dictionary. Follow the following rules strictly:\n", ""],
  anatonyms: [
    "Act as a dictionary. Follow the following rules strictly:\n",
    "",
  ],
  related: [
    "Act as a dictionary. Follow the following rules strictly:\n",
    "Be concise with your answer\n",
    "* Use emoji if it represent the meaning\n",
  ],
};

const getMessages = (messages: ChatGPTMessage[], keyword: ResType) => {
  const term = messages[0]?.content as string;
  const systemInstructions = {
    role: "system",
    content: systemMessages[keyword].join(""),
  };
  switch (keyword) {
    case "definition":
      return [
        systemInstructions,
        {
          role: "user",
          content: `Explain "${term}"`,
        },
      ];
    case "examples":
      return [
        systemInstructions,
        {
          role: "user",
          content: `List 3 examples of the following "${term}"`,
        },
      ];
    case "synonyms":
      return [
        systemInstructions,
        {
          role: "user",
          content: `Generate not greater than 5 synonyms of the following "${term}"`,
        },
      ];
    case "anatonyms":
      return [
        systemInstructions,
        {
          role: "user",
          content: `Generate not greater than 5 anatonyms of the following "${term}"`,
        },
      ];
    case "related":
      return [
        systemInstructions,
        {
          role: "user",
          content: `What is the tone of the word "${term}"? and where it can be used?`,
        },
      ];
    default:
      return [
        {
          role: "user",
          content: term,
        },
      ];
  }
};
const handler = async (req: Request): Promise<Response> => {
  const {
    messages,
    keyword,
    temperature = 0.2,
    max_tokens = 150,
  } = await req.json();
  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: getMessages(messages, keyword),

    stream: true,
    temperature,
    max_tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    n: 1,
  };

  const stream = await openaiStreamParser(payload);
  return new Response(stream);
};

export default handler;
