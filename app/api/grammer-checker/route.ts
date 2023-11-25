import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { env } from "@/env.mjs";

export const runtime = "edge";

const instructions = [
  "Follow these styling guide strictly:",
  "Highlight the text with bolding the added text parts & strike through the deleted text parts",
  // "For correction, bold the corrected text and strike through the deleted text",
];

const explanation = [
  "Justify the correction briefly & clearly",
  // "If the sentence is correct, return the same sentence with '✅'",
  // `
  // Examples: 
  // ❌: I has a question.\n
  // ✅: I **have** a question.

  // ❌: I have so much questions.\n
  // ✅: I have so **many** questions.
  // `,
  "Correct the grammar and spelling mistakes",
];

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const json = await req.json();
  const { messages, withExplanation } = json;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // model: "gpt-3.5-turbo-1106",
    // model: "gpt-4-1106-preview",
    stream: true,
    messages: [
      {
        role: "system",
        content: withExplanation
          ? [...instructions, ...explanation].join("\n")
          : [...instructions, explanation[1]].join("\n"),
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
