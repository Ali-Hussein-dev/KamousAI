import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getParaphraser, updateParaphraser } from "./action";

const queryKey = ["paraphraser"];

export const useQueryParaphraser = (
    options: Omit<UseQueryOptions, "queryKey" | "queryFn"> = {}
) =>
    useQuery({
        queryKey,
        queryFn: () => getParaphraser(),
        select: (data) => data?.data[0],
        ...options,
    });

export const useMutationParaphraser = (
    options: Omit<UseMutationOptions, "mutationKey" | "mutationFn"> = {}
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [queryKey, "mutation"],
        mutationFn: (data) => updateParaphraser(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey }),
        ...options,
    });
};
