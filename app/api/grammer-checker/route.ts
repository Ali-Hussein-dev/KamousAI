import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env.mjs";

export const runtime = "edge";


/**
 * Optimizations needed
 * justification currently not really helpful!
 * 
 */
const makeInstructions = (withExplanation: boolean) => `
  Before you start, follow these rules strictly:
  - Highlight the text with bolding the added text parts & strike through the deleted text parts
  - Don't answer questions, correct the grammar, spelling, and punctuation
  ${withExplanation && "- Justify the correction briefly & clearly since I am learning the language!"}

  Correct the grammar and spelling mistakes of the following text
`

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const json = await req.json();
  const { messages, withExplanation } = json;
  console.log(makeInstructions(withExplanation))
  const response = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    model: "gpt-3.5-turbo-1106",
    // model: "gpt-4-1106-preview",
    stream: true,
    messages: [
      {
        role: "system",
        content: makeInstructions(withExplanation),
      },
      messages.at(-1),
    ],
    temperature: 0.3
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
