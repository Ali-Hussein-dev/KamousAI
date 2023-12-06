import { getElevenLabsAudio } from "@/utils/eleven-labs";

export async function POST(req: Request) {
    const body = await req.json();
    const term = body.term;

    if (term) {
        try {
            // const data = await getOpenaiAudio({ input: term });
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
