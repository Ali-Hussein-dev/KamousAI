import type {
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getParaphraser, updateParaphraser } from "./action";
import { useForm } from "@/context/form-paraphraser-context";
import { useAuth } from "@/hooks/use-auth";

export const defaultTones = [
    {
        label: "Professional",
        value: "professional without jargon, knowledgeable, and respectful",
    },
    {
        label: "Friendly",
        value: "friendly, approachable and informal",
    },
    {
        label: "Casual",
        value: "casual, informal, and friendly",
    },
    {
        label: "Simple",
        value: "straightforward, clarity, simple, without jargon",
    },
    {
        label: "Make longer",
        value: "make longer, more detailed, and more descriptive",
    },
    {
        label: "make shorter",
        value: "make shorter, more concise, and more direct",
    },
];

const queryKey = ["paraphraser"];
//-------------------------------------------------------------QUERY
type TDataQuery = PromiseType<ReturnType<typeof getParaphraser>>;

export const useQueryParaphraser = (
    options: Omit<UseQueryOptions, "queryKey" | "queryFn"> = {}
) => {
    return useQuery<TDataQuery>({
        queryKey,
        queryFn: () => getParaphraser(),
        initialData: { tones: defaultTones, temperature: 1 },
        ...options,
    } as UseQueryOptions<TDataQuery>);
};

//-------------------------------------------------------------MUTATION
type TDataMutation = PromiseType<ReturnType<typeof updateParaphraser>>;

export const useMutationParaphraser = (
    options: Omit<UseMutationOptions, "mutationKey" | "mutationFn"> = {}
) => {
    const { isAuth } = useAuth();
    // form
    const { data } = useQueryParaphraser({
        enabled: isAuth,
    });
    const form = useForm({
        initialValues: {
            configs: data?.configs ?? { tones: defaultTones, temperature: 1 },
        },
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
    });
    const onSubmit =
        form.onSubmit((inputs) => {
            res.mutate(inputs.configs)
        })

    return { form, ...res, onSubmit, isAuth };
};
