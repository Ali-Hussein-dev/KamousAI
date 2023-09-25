import fs from "fs";
import path from "path";
import { env } from "@/env.mjs";

async function getElevenLabsAudio(term: string): Promise<string> {
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
            text: term,
        }),
    });
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const file = `${term}_${Math.random().toString(36).substring(7)}`;

    fs.writeFile(path.join("public", `${file}.mp3`), buffer, () => {
        console.log("File written successfully");
    });
    return file;
}

export async function POST(req: Request) {
    const body = await req.json();
    const term = body.term;
    console.log("term-------------", term);
    if (term) {
        try {
            const filename = await getElevenLabsAudio(term);
            const data = JSON.stringify({ filename: filename + ".mp3" });
            return new Response(data, {
                headers: {
                    "Content-Type": "audio/mpeg",
                },
            });
        } catch (error) {
            console.error("🚀 ~ textToSpeech ~ error", error);
        }
    } else {
        return new Response("No term provided", { status: 400 })
    }
}
