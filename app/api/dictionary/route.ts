import { type ChatCompletionMessageParam } from "openai/resources/chat";
import { type WordEntryKey } from "@/hooks/use-history-store";
import { type PreferencesT } from "@/hooks/use-response";
import { createChatStream } from "@/utils/openai";

export const runtime = "edge";

const systemMessages = {
    definition: [
        "Act as a dictionary. Follow the following rules strictly:\n",
        "* Be concise with your answer\n",
        "* Use emoji if it represent the meaning\n",
        "* Do not mention this phrase ever 'As an AI language model'\n",
        "* if no context specified, use general context\n",
        "* Do not ignore or skips these rules ever\n",
        "* use the following format for explanation\n",
    ],
    examples: [
        "Act as a dictionary. Follow the following rules strictly:\n",
        "* Do not explain the examples, that you should provide\n",
        "* Use bullets format\n",
        "* Example must be short and real-world\n",
        "* if no context specified, use general context\n",
    ],
    synonyms: [
        "Act as a dictionary. Follow the following rules strictly:\n",
        "Use table format with 3 columns (synonyms, context, tone)\n",
    ],
    antonyms: [
        "Act as a dictionary. Follow the following rules strictly:\n",
        "Use table format with 3 columns (antonyms, context, tone)\n",
    ],
    idioms: [
        "Act as a dictionary. Follow the following rules strictly:\n",
        "Bold idiom text\n",
        "Do not explain the idioms or provide related examples\n",
        `Reply with "No related idioms found" if there are no idioms\n`,
    ],
};
interface Options extends PreferencesT {
    wordEntryKey: WordEntryKey;
}

const getMessages = (
    messages: string,
    options: Options
): Array<ChatCompletionMessageParam> => {
    const {
        wordEntryKey = "definition",
        mode = "mono",
        inputLanguage,
        outputLanguage,
    } = options;
    const outputLang =
        mode == "bili"
            ? `* Generate response in the following language code ${outputLanguage}`
            : `* Generate response in the following language code ${inputLanguage}`;
    // const term = messages[0]?.content as string;
    const term = messages;
    const systemInstructions = {
        role: "system",
        content: systemMessages[wordEntryKey].join("") + outputLang,
    } as const;
    switch (wordEntryKey) {
        case "definition": {
            if (mode === "mono") {
                return [
                    systemInstructions,
                    {
                        role: "user",
                        content: `Explain "${term}"`,
                    },
                ];
            } else {
                return [
                    systemInstructions,
                    {
                        role: "user",
                        content: `Translate the following "${term}" from ${inputLanguage} to ${outputLanguage}`,
                    },
                ];
            }
        }
        case "examples":
            return [
                systemInstructions,
                {
                    role: "user",
                    content: `Generate 3 examples including the phrase "${term}"`,
                },
            ];
        case "synonyms":
            return [
                systemInstructions,
                {
                    role: "user",
                    content: `Generate mostly-used synonyms (max 5 synonyms) and with its mostly used context of the following "${term}"`,
                },
            ];
        case "antonyms":
            return [
                systemInstructions,
                {
                    role: "user",
                    content: `Generate mostly-used antonyms (max 5 antonyms) of the following "${term}"`,
                },
            ];
        case "idioms":
            return [
                systemInstructions,
                {
                    role: "user",
                    content: `Generate mostly-used idioms (max 3 idioms) that contains "${term}"`,
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
export const POST = async (req: Request) => {
    const { prompt, wordEntryKey, preferences } = await req.json();
    return await createChatStream({
        messages: getMessages(prompt, {
            wordEntryKey: wordEntryKey || "definition",
            ...preferences,
        }),
    });
};
