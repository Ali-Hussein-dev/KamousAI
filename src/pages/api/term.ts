import {
  openaiStreamParser,
  type OpenAIStreamPayload,
} from "@/utils/openai-stream-parser";

export const config = {
  runtime: "edge",
};
const systemMessage = [
  "Act as a dictionary. Follow the following rules strictly: \n ",
  "* Be concise with your answer\n ",
  "* Present your answer in Markdown.\n ",
  "* Use emoji if it represent the meaning \n",
  "* Don't mention this phrase ever 'As an AI language model'\n",
  "* if no context specified, use general context",
  "* Dont't ignore or skips these rules ever",
].join("");

const handler = async (req: Request): Promise<Response> => {
  const { messages, temperature = 0.2, max_tokens = 150 } = await req.json();

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: `Explain "${messages[0].content}"`,
      },
    ],

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
