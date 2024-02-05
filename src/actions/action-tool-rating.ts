"use server";
import { redisClient } from "@/utils/redis-client";
// import { z } from "zod";

// const bodySchema = z.object({
//     rating: z.number().int().min(1).max(4),
//     note: z.string().max(1000).optional(),
//     tool: z.string(),
//     os: z.string().optional(),
// });

export const actionToolRating = async (prv: FormData, formData: FormData): Promise<{ msg: string }> => {
    const rawFormData = {
        rating: +(formData?.get("rating") || 0),
        note: formData?.get("note"),
        tool: formData?.get("tool"),
        os: formData?.get("os"),
        createdAt: new Date().toISOString(),
        id: Math.random().toFixed(4),
    };
    await redisClient
        .rpush(
            "kamousai-tool-rating",
            JSON.stringify(rawFormData)
    )
        .catch(console.error);

    return { msg: "success" }
};
