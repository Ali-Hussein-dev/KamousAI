import { useForm } from "react-hook-form";
import React from "react";
import { type ResType, useResponse } from "@/hooks";

interface FormData {
  term: string;
}

export const useActions = () => {
  const methods = useForm<FormData>();
  const setResponse = useResponse((s) => s.setResponse);
  const preferences = useResponse((s) => s.preferences);
  const term = useResponse((s) => s.term);
  const setActionStatus = useResponse((s) => s.setActionStatus);
  const [controller, setController] = React.useState<null | AbortController>(
    null
  );

  const stopStreaming = React.useCallback(() => {
    if (controller) {
      controller.abort();
      setActionStatus("success");
      setController(null);
    }
  }, [controller, setActionStatus]);
  const fetchStreaming = async (term: string, keyword: ResType) => {
    setActionStatus("loading");
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
        keyword,
        preferences
      }),
    });
    // This data is a ReadableStream
    const data = res.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    while (!done) {
      try {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        if (chunkValue) {
          setResponse(chunkValue, keyword);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: unknown | any) {
        if (error?.name === "AbortError") {
          console.log("Stream stopped by user");
          setActionStatus("success");
          setController(null);
        } else {
          console.error("Error in reading stream:", error);
        }
        break;
      }
    }
    setActionStatus("success");
    if (done) {
      return;
    }
  };
  const onSubmit = async (keyword: ResType) => {
    console.log("🚀 keyword:", keyword);
    if (keyword && term) {
      await fetchStreaming(term, keyword);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      console.warn({ term, keyword });
    }
  };
  return { methods, onSubmit, stopStreaming };
};
