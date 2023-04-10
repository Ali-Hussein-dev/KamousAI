import { OpenAIChat } from "langchain/llms";
// import { ChatOpenAI } from "langchain/chat_models";
import { PromptTemplate } from "langchain/prompts";
import { env } from "@/env.mjs";
import { type NextApiRequest, type NextApiResponse } from "next";
import { CallbackManager } from "langchain/callbacks";
// import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
const systemMessage = [
  "Act as a dictionary. Follow the following rules strictly: \n",
  "* Be concise with your answer.\n",
  "* For formating, use Markdown to present the answer.\n",
  "* Use seprate section for antonyms and synomyms (present in table format).\n",
  "* Use emoji if it helps \n",
  "* Don't mention this phrase ever 'As an AI language model'\n",
];

// const Chat_option = async (input: string, cb: (token: string) => void) => {
//   const getPrompt = async (input: string) => {
//     const promptSimple = new PromptTemplate({
//       template: "Explain the following: {word}",
//       inputVariables: ["word"],
//     });
//     const formattedPrompt = await promptSimple.format({ word: input });
//     return [
//       new SystemChatMessage(systemMessage),
//       new HumanChatMessage(formattedPrompt),
//     ];
//   };
//   const model = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo",
//     temperature: 0.1,
//     openAIApiKey: env.OPENAI_API_KEY,
//     streaming: true,
//     callbackManager: CallbackManager.fromHandlers({
//       async handleLLMNewToken(token) {
//         // runs: sendData(JSON.stringify({ text: token }));
//         cb(token);
//       },
//     }),
//   });
//   const prompt = await getPrompt(input);
//   return await model.call(prompt);
// };

const Model_option = async (input: string, cb: (token: string) => void) => {
  const model = new OpenAIChat({
    modelName: "gpt-3.5-turbo",
    temperature: 0.1,
    openAIApiKey: env.OPENAI_API_KEY,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      async handleLLMNewToken(token) {
        // sendData(JSON.stringify({ text: token }));
        cb(token);
      },
    }),
  });
  const promptSimple = new PromptTemplate({
    template: "Act as a dictionary. Explain the following: {word}",
    inputVariables: ["word"],
  });

  const formattedPrompt = await promptSimple.format({
    word: input,
  });
  return await model.call(systemMessage.join("") + formattedPrompt);
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { term } = req.body;
  const sanitizedTerm = term.trim();
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  const sendData = (data: string) => {
    res.write(`data: ${data}\n\n`);
  };

  try {
    await Model_option(sanitizedTerm, (token) => {
      sendData(JSON.stringify({ text: token }));
    });
  } catch (error) {
    console.log("error", error);
  } finally {
    sendData("[DONE]");
    res.end();
  }
};
export default handler;
