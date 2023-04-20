import { useForm } from "react-hook-form";
import React from "react";
import { useResponse } from "@/hooks";

interface FormData {
  term: string;
}

export const useStream = () => {
  const methods = useForm<FormData>();
  const { reset } = methods;
  const setResponse = useResponse((s) => s.setResponse);
  const setStatus = useResponse((s) => s.setStatus);
  const [controller, setController] = React.useState<null | AbortController>(
    null
  );

  const stopStreaming = () => {
    if (controller) {
      controller.abort();
      setController(null);
      setStatus("success");
    }
  };
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
    let response = "";
    while (!done) {
      try {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        if (chunkValue) {
          response += chunkValue;
          setResponse(response);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: unknown | any) {
        if (error?.name === "AbortError") {
          console.log("Stream stopped by user");
        } else {
          console.error("Error in reading stream:", error);
        }
        break;
      }
    }
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    setStatus("success");
    if (done) {
      return;
    }
  };
  const onSubmit = async ({ term: input }: FormData) => {
    await fetchStreaming(input.trim());
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  return { methods, onSubmit, stopStreaming };
};
