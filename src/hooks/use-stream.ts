import { useForm } from "react-hook-form";
import * as React from 'react'
import { useResponse } from "@/hooks";
import { useRouter } from "next/router";
interface FormData {
  term: string;
}

export const useStream = () => {
  const router = useRouter();
  const { push, query } = router;
  const methods = useForm<FormData>({
    defaultValues: { term: query.term as string },
  });
  const { reset } = methods;
  const setResponse = useResponse((s) => s.setResponse);
  const resetResponse = useResponse((s) => s.resetResponse);
  const setTerm = useResponse((s) => s.setTerm);
  const setStatus = useResponse((s) => s.setStatus);
  const setHistory = useResponse((s) => s.setHistory);
  const [controller, setController] = React.useState<null | AbortController>(
    null
  );

  const preferences = useResponse((s) => s.preferences);
  const stopStreaming = React.useCallback(() => {
    if (controller) {
      controller.abort();
      setStatus("success");
      setController(null);
    }
  }, [controller, setStatus]);
  const fetchStreaming = async (term: string) => {
    setStatus("loading");
    reset({ term: "" });
    const abortController = new AbortController();
    setController(abortController);
    // eslint-disable-next-line prefer-const
    const res = await fetch("api/term", {
      method: "POST",
      signal: abortController.signal,
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: term,
          },
        ],
        keyword: "definition",
        preferences
      }),
    });
    // This data is a ReadableStream
    const data = res.body;
    if (!data) {
      return;
    }
    resetResponse();
    const reader = data.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    while (!done) {
      try {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        if (chunkValue) {
          setResponse(chunkValue, "definition");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: unknown | any) {
        if (error?.name === "AbortError") {
          console.log("Stream stopped by user");
          setStatus("success");
          setController(null);
        } else {
          console.error("Error in reading stream:", error);
        }
        break;
      }
    }
    setStatus("success");
    if (done) {
      return;
    }
  };
  const onSubmit = async ({ term: input }: FormData) => {
    if (input) {
      await fetchStreaming(input.trim());
      push(`/?term=${input}`);
      setTerm(input);
      setHistory(input.trim())
    }
  };
  return { methods, onSubmit, stopStreaming };
};
