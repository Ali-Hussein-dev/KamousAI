import { env } from "@/env.mjs";
export const textToSpeechLanguagesElevenlabs = [
    "en", // English
    "zh", // Chinese
    "es", // Spanish
    "hi", // Hindi
    "pt", // Portuguese
    "fr", // French
    "de", // German
    "ja", // Japanese
    "ar", // Arabic
    "ru", // Russian
    "ko", // Korean
    "id", // Indonesian
    "it", // Italian
    "nl", // Dutch
    "tr", // Turkish
    "pl", // Polish
    "sv", // Swedish
    "fil", // Filipino
    "ms", // Malay
    "ro", // Romanian
    "uk", // Ukrainian
    "el", // Greek
    "cs", // Czech
    "da", // Danish
    "fi", // Finnish
    "bg", // Bulgarian
    "hr", // Croatian
    "sk", // Slovak
    "ta", // Tamil
];
export async function getElevenLabsAudio(text: string): Promise<ArrayBuffer> {
    const voiceId = "21m00Tcm4TlvDq8ikWAM";

    const elevenLabsTextToSpeechURL = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const headers = {
        accept: "audio/mpeg",
        "xi-api-key": env.ELEVEN_LABS_KEY,
        "Content-Type": "application/json",
    };
    const response = await fetch(elevenLabsTextToSpeechURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            text: text,
        }),
    });
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer
}