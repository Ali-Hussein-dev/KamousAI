import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getParaphraser,
  updateParaphraser,
} from "@/actions/paraphraser-action";
import { useForm } from "@/context/paraphraser-form-ctx";
import { useAuth } from "@/hooks/use-auth";
import defaultTones from "@/content/default-tones.json";
import * as React from "react";

const queryKey = ["paraphraser"];
//-------------------------------------------------------------QUERY
type TDataQuery = PromiseType<ReturnType<typeof getParaphraser>>;

export const useQueryParaphraser = (
  options: Omit<UseQueryOptions, "queryKey" | "queryFn"> = {}
) => {
  const { isAuth } = useAuth();

  return useQuery<TDataQuery>({
    queryKey,
    queryFn: () => getParaphraser(),
    enabled: isAuth,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
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
  const { data, status } = useQueryParaphraser();
  const form = useForm({
    initialValues: {
      configs: data?.configs ?? { tones: defaultTones, temperature: 1 },
    },
  });
  // update form values when data is fetched
  React.useEffect(() => {
    if (status === "success") {
      form.setValues({ configs: data?.configs });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
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
  const onSubmit = form.onSubmit((inputs) => {
    res.mutate(inputs.configs);
  });

  return { form, ...res, onSubmit, isAuth };
};
