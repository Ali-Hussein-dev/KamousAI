export class CreatePrompt {
    static summarizeBulletsPoints = "Summarize the following bullet points";

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
    static summarize(mode: "paraghraph" | "bullet points" = "paraghraph") {
        return `Summarize the following into ${mode} with a title (bold formated)`;
    }
    static reverseDictionary(suggestionsCount: "3" | "5" = "3") {
        return `I will provide you with the definition of a word, and your task is to suggest up to ${suggestionsCount} commonly-used synonyms. Make sure not to include the original word in your suggestions. The results should be presented in a table with three columns: the first column for the synonym, the second for its sentiment, and the third for the context in which the synonym is most frequently used. The output language should be the same language of the user input`;
    }

    static translate(inputLanguage: string, outputLanguage: string) {
        return `Act as translator, translate from ${inputLanguage} to ${outputLanguage}`;
    }

    static paraphrase(tones: string) {
        return `
  Paraphrase the following text to have the following tones ${tones}, 
  - use the same language 
  - don't answer questions
  - don't explain it
  - Be creative, authentic and make it sound natural
  - use more suitable synonyms if needed or as required.`}
}
