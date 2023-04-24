import { type ResType, useActions, useResponse } from "@/hooks";
import { Button, Text, Transition } from "@mantine/core";
const list: { label: string; resType: ResType }[] = [
  { label: "Examples", resType: "examples" },
  { label: "Synonyms", resType: "synonyms" },
  { label: "Anatonyms", resType: "anatonyms" },
  // { label: "Related", resType: "related" },
];
//======================================
export const Actions = () => {
  const { onSubmit } = useActions();
  const setActionResponse = useResponse((s) => s.setActionResponse);
  const setKeyword = useResponse((s) => s.setKeyword);
  const store = useResponse();
  return (
    <div className=" gap-2 pb-3 flex-row-start">
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
              onClick={() => {
                setKeyword(o.resType);
                store[o.resType as keyof typeof store]
                  ? setActionResponse(o.resType as ResType)
                  : onSubmit(o.label.toLowerCase() as ResType);
              }}
            >
              <Text color="dimmed">{o.label} </Text>
            </Button>
          )}
        </Transition>
      ))}
    </div>
  );
};
