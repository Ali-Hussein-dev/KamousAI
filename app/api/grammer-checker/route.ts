import { createChatStream } from "@/utils/openai";

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

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const json = await req.json();
  const { messages, withExplanation } = json;
  return await createChatStream({
    messages: [
      {
        role: "system",
        content: makeInstructions(withExplanation),
      },
      messages.at(-1),
    ], temperature: 0.3
  });
}
