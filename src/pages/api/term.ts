import {
  openaiStreamParser,
  type OpenAIStreamPayload,
} from "@/utils/openai-stream-parser";

export const config = {
  runtime: "edge",
};
const systemMessage =
  "Before you response, follow these instructions:\n 1. Be concise with your answer\n 2. Don't repeat what I say.\n 3. Use bullet points, lists, paragraphs and text styling to present the answer in markdown \n 4. If you are unsure, or don't know, just say 'Sorry, I don't know'.";

const handler = async (req: Request): Promise<Response> => {
  const { messages, temperature = 0.2, max_tokens = 200 } = await req.json();

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      ...messages,
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
