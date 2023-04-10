import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useResponse } from "./use-response";

export const useFetchStream = (
  setStatus: React.Dispatch<React.SetStateAction<"idle" | "loading">>
) => {
  const setResponse = useResponse((s) => s.setResponse);
  const ctrl = new AbortController();
  const fetcher = ({ term }: { term: string }) => {
    let text = "";
    fetchEventSource("/api/term", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(term),
      signal: ctrl.signal,
      onmessage: (event) => {
        if (event.data === "[DONE]") {
          text = "";
          setStatus("idle");
          ctrl.abort();
        } else {
          const data = JSON.parse(event.data);
          text += data.text;
          setResponse(text);
        }
      },
    });
  };
  return fetcher;
};
