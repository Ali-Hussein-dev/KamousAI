import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useResponse } from "./use-response";
import * as React from "react";
export const useFetchStream = () => {
  const setResponse = useResponse((s) => s.setResponse);
  const setStatus = useResponse((s) => s.setStatus);
  const [controller, setController] = React.useState<null | AbortController>(
    null
  );
  // it is not working...
  // const stopStream = () => {
  //   if (controller) {
  //     console.log("aborting");
  //     setStatus("idle");
  //     controller.abort();
  //     setController(null);
  //   }
  // };
  const fetcher = (term: { term: string }) => {
    const abortController = new AbortController();
    setController(abortController);

    let text = "";
    fetchEventSource("/api/term", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(term),
      signal: controller?.signal,
      onmessage: (event) => {
        if (event.data === "[DONE]") {
          text = "";
          abortController.abort();
          setStatus("idle");
        } else {
          const data = JSON.parse(event.data);
          text += data.text;
          setResponse(text);
        }
      },
    });
  };
  return { fetcher };
};
