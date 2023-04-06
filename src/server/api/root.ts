import { createTRPCRouter } from "@/server/api/trpc";
import { termRouter } from "@/server/api/routers/term";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  term: termRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
