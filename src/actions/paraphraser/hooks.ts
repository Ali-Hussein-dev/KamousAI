import type {
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getParaphraser, updateParaphraser } from "./action";
import { useForm } from "@/context/form-paraphraser-context";
import { useParaphraserContext } from "@/hooks/use-paraphraser";

const queryKey = ["paraphraser"];
//-------------------------------------------------------------QUERY
type TDataQuery = PromiseType<ReturnType<typeof getParaphraser>>;

export const useQueryParaphraser = (
    options: Omit<UseQueryOptions, "queryKey" | "queryFn"> = {}
) => {
    return useQuery<TDataQuery>({
        queryKey,
        queryFn: () => getParaphraser(),
        ...options,
    } as UseQueryOptions<TDataQuery>);
};

//-------------------------------------------------------------MUTATION
type TDataMutation = PromiseType<ReturnType<typeof updateParaphraser>>;

export const useMutationParaphraser = (
    options: Omit<UseMutationOptions, "mutationKey" | "mutationFn"> = {}
) => {
    // form 
    const tones = useParaphraserContext((s) => s.tones);
    const temperature = useParaphraserContext((s) => s.temperature);
    const form = useForm({
        initialValues: { configs: { temperature, tones } },
    });
    // mutation
    const queryClient = useQueryClient();
    const res = useMutation<TDataMutation, Error, Pick<Paraphraser, "configs">>({
        mutationKey: [queryKey, "mutation"],
        mutationFn: async (data) => await updateParaphraser(data),
        // @ts-expect-error need to define the TContext type for onSuccess
        onSuccess(_data) {
            form.resetDirty();
            // ✅ refetch the query after the mutation is successful
            queryClient.invalidateQueries({ queryKey });
            // OR
            // ✅ update detail view directly
            // queryClient.setQueryData(queryKey, data)
        },
        // @ts-expect-error need to define the TContext type for onSuccess
        onError: (error) => {
            console.warn(error);
        },
        ...options,
    })
    return { form, ...res };
};
