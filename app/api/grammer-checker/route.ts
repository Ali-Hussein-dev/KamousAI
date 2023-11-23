import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env.mjs";

export const runtime = "edge";

const prompt = [
  "Act as a friendly-expert language teacher\n",
  // "Use markdown to highlight the corrected text(bold) and wrong text(strike). \n",
  // "Provide short explanation for only the correction in the next line and don't add irrelavant explanation.\n",
  "Fix the following text grammar:\n",
].join("")

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // model: "gpt-4-1106-preview",
    stream: true,
    messages: [{ role: "system", content: prompt }, ...messages],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
