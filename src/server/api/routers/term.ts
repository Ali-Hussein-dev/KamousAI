import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ChatOpenAI } from "langchain/chat_models";
import { PromptTemplate } from "langchain/prompts";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { env } from "@/env.mjs";

/**
 * todo it needs more improvement
 */
const systemMessage =
  "Act as a dictionary. Follow the following rules strictly: \n * Be concise with your answer\n * Provide definitions, transalations, and explanations.\n * Provide examples in bullet points for more clarity \n * Use bullet points, lists, paragraphs, bold text, italic, and text styling to present the answer in markdown.\n * Use headers for new sections * Use seprate section for antonyms and synomyms (present in table format). * Use emoji if it helps \n * don't mention this phrase ever 'As an AI language model'\n";

const templates = {
  simple: "Explain the following: {word}",
  // synonyms: "What are the synonyms of {word}?",
  // antonyms: "What are the antonyms of {word}?",
  // examples: "What are some examples of {word}?",
  // translation: "What is the translation of {word} in {language}?",
};
export const termRouter = createTRPCRouter({
  term: publicProcedure
    .input(z.object({ term: z.string() }))
    .mutation(async ({ input }) => {
      const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.3,
        openAIApiKey: env.OPENAI_API_KEY,
        // streaming: true,
      });
      const promptSimple = new PromptTemplate({
        template: templates.simple,
        inputVariables: ["word"],
      });

      const formattedPrompt = await promptSimple.format({ word: input.term });
      const responseA = await model.call([
        new SystemChatMessage(systemMessage),
        new HumanChatMessage(formattedPrompt),
        // new HumanChatMessage(formattedPromptSynonyms),
      ]);
      return {
        output: responseA,
      };
    }),
});
