export class CreatePrompt {
    static summarizeBulletsPoints = "Summarize the following bullet points";

    static reverseDictionary = `I will give you the definition of a word and you will suggest only commonly-used words that mean the same, maximum suggestions (4) Do not reiterate my words; simply provide the outcomes without elaboration. Include sentiment for each word using parenthises
`;
    static fixGrammar(withExplanation: boolean) {
        return `Before you start, follow these rules strictly:
  - Highlight the text with bolding the added text parts & strike through the deleted text parts
  - Don't answer questions, correct the grammar, spelling, and punctuation
  ${withExplanation &&
            "- Justify the correction briefly & clearly since I am learning the language!"
            }
  Correct the grammar and spelling mistakes of the following text
`;
    }
    static summarize(mode: "paraghraph" | "bulletsPoint" = "paraghraph") {
        return `Summarize the following ${mode === "paraghraph" ? "text" : "bullet points"} into a paragraph`;
    }

    static translate(inputLanguage: string, outputLanguage: string) {
        return `Act as translator, translate from ${inputLanguage} to ${outputLanguage}`;
    }
}
