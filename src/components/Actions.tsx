import { type ResType, useActions, useResponse } from "@/hooks";
import { Button, Transition } from "@mantine/core";
const list: { label: string; resType: ResType }[] = [
  { label: "Examples", resType: "examples" },
  { label: "Synonyms", resType: "synonyms" },
  { label: "Antonyms", resType: "antonyms" },
  // { label: "Related", resType: "related" },
];
//======================================
export const Actions = () => {
  const { onSubmit } = useActions();
  const setActionResponse = useResponse((s) => s.setActionResponse);
  const setKeyword = useResponse((s) => s.setKeyword);
  const store = useResponse();
  return (
    <div className="gap-2 pb-2 flex-row-start flex-wrap">
      {list.map((o) => (
        <Transition
          key={o.label}
          mounted
          transition="scale"
          duration={3400}
          timingFunction="ease"
        >
          {(styles) => (
            <Button
              variant="default"
              style={styles}
              size="xs"
              onClick={() => {
                setKeyword(o.resType);
                store[o.resType as keyof typeof store]
                  ? setActionResponse(o.resType as ResType)
                  : onSubmit(o.label.toLowerCase() as ResType);
              }}
            >
              {o.label}
            </Button>
          )}
        </Transition>
      ))}
    </div>
  );
};
