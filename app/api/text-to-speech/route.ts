import { env } from "@/env.mjs";

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

export async function POST(req: Request) {
    const body = await req.json();
    const term = body.term;
    console.log("textToSpeech:POST", { term });
    if (term) {
        try {
            const data = await getElevenLabsAudio(term);
            return new Response(data, {
                headers: {
                    "Content-Type": "arraybuffer",
                },
            });
        } catch (error) {
            console.error("🚀 textToSpeech", error);
        }
    } else {
        return new Response("No term provided", { status: 400 })
    }
}
