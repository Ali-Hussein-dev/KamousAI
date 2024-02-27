import type {
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getParaphraser, updateParaphraser } from "./action";

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
    const queryClient = useQueryClient();

    return useMutation<TDataMutation, Error, Pick<Paraphraser, "configs">>({
        mutationKey: [queryKey, "mutation"],
      mutationFn: async (data) => await updateParaphraser(data),
      // @ts-expect-error need to define the TContext type for onSuccess
      onSuccess: (_data, _variables, _context) => {
          // ✅ refetch the query after the mutation is successful
          queryClient.invalidateQueries({ queryKey });
          // OR
          // ✅ update detail view directly
          // queryClient.setQueryData(queryKey, data)
      },
      ...options,
  });
};
