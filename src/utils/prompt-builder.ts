export class CreatePrompt {
    static summarizeBulletsPoints = "Summarize the following bullet points";

    static fixGrammar({TEXT_TO_CORRECT, withExplanation}: {TEXT_TO_CORRECT: string, withExplanation: boolean}) {
        return `
You are tasked with correcting the grammar, spelling, and punctuation of a given text. Your goal is to improve the text while clearly showing the changes made and, if requested, providing brief explanations for these changes.

Here is the text you need to correct:

${TEXT_TO_CORRECT}

Follow these rules when making corrections:
1. Use bold text to highlight additions (e.g., "This is **an** example").
2. Use strikethrough for deletions (e.g., "This is ~~and~~ an example").
3. Make sure to correct grammar, spelling, and punctuation errors only.
4. Do not change the overall meaning or style of the text.


To complete this task:
1. Read through the entire text carefully.
2. Identify grammar, spelling, and punctuation errors.
3. Make the necessary corrections using the formatting rules provided.
4. ${withExplanation ? "Provide a brief, clear justification for each correction immediately after the corrected sentence or phrase. Place these explanations under title 'Explanations'." : "Don't explain the corrections."}

Ensure that all changes are clearly visible using the specified formatting.

Begin your correction now.`;
    }
    static summarize(mode: "paraghraph" | "bullet points" = "paraghraph") {
        return `Summarize the following into ${mode} with a title (bold formated)`;
    }
    static reverseDictionary(suggestionsCount: "3" | "5" = "3") {
        return `I will provide you with the definition of a word, and your task is to suggest up to ${suggestionsCount} commonly-used synonyms. Make sure not to include the original word in your suggestions. The results should be presented in a table with three columns: the first column for the synonym, the second for its sentiment, and the third for the context in which the synonym is most frequently used. The output language should be the same language of the user input`;
    }

    static translate({TEXT_TO_TRANSLATE, inputLanguage, TARGET_LANGUAGE}:{TEXT_TO_TRANSLATE: string, inputLanguage: string, TARGET_LANGUAGE: string}) {
        return `The source language is:
<source_language>
${inputLanguage}
</source_language>

The target language is:
<target_language>
${TARGET_LANGUAGE}
</target_language>

Here is the text to translate:
${TEXT_TO_TRANSLATE}

Translate the given text from the source language to the target language. Follow these guidelines:

1. Maintain the original meaning and intent of the text.
2. Use appropriate vocabulary and idiomatic expressions in the target language.
3. Preserve the tone and style of the original text as much as possible.
4. Ensure grammatical correctness in the target language.
5. If there are culture-specific terms or concepts, translate them in a way that is understandable to speakers of the target language.

Provide your translation. Do not include any other text, explanations, or comments. Your entire response should consist solely of the translated text.
`;
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
