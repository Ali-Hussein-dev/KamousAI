"use client";
import * as React from "react";
import { Button, Rating, Text, Textarea, rem } from "@mantine/core";
import {
  TbMoodCry,
  TbMoodSad,
  TbMoodHappy,
  TbMoodCrazyHappy,
} from "react-icons/tb";
import { cn } from "@/utils/helpers";
import { actionToolRating } from "@/actions/action-tool-rating";
import { usePathname } from "next/navigation";
import { useOs } from "@mantine/hooks";
import { useFormState } from "react-dom";

const getIconStyle = (color?: string) => ({
  width: rem(32),
  height: rem(32),
  color: color ? `var(--mantine-color-${color}-7)` : undefined,
});

const getEmptyIcon = (value: number) => {
  const iconStyle = getIconStyle();

  switch (value) {
    case 1:
      return <TbMoodCry style={iconStyle} />;
    case 2:
      return <TbMoodSad style={iconStyle} />;
    case 3:
      return <TbMoodHappy style={iconStyle} />;
    case 4:
      return <TbMoodCrazyHappy style={iconStyle} />;
    default:
      return null;
  }
};

const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      return <TbMoodCry style={getIconStyle("red")} />;
    case 2:
      return <TbMoodSad style={getIconStyle("orange")} />;
    case 3:
      return <TbMoodHappy style={getIconStyle("lime")} />;
    case 4:
      return <TbMoodCrazyHappy style={getIconStyle("green")} />;
    default:
      return null;
  }
};

export function ToolRating() {
  const [value, setValue] = React.useState(0);
  const pathname = usePathname();
  const os = useOs();
  // @ts-expect-error type is unknown
  const [state, formAction] = useFormState(actionToolRating, {});

  return (
    <div>
      <form
        action={formAction}
        method="POST"
        className={cn(
          "mx-auto gap-3 rounded-xl border-[0.5px] border-solid border-slate-500 px-3 pb-2 pt-3 transition-all duration-500 ease-linear flex-col-center",
          value == 0 ? "max-w-md" : "max-w-lg bg-slate-800 shadow-xl"
        )}
      >
        <input
          type="hidden"
          name="tool"
          value={(pathname as string).split("/").at(-1)}
        />
        <input type="hidden" name="os" value={os} />
        {!state.msg && (
          <div className="w-full gap-2 flex-col-center">
            <Text className="mb-1 text-lg sm:text-2xl">Is this helpful?</Text>
            <Rating
              name="rating"
              emptySymbol={getEmptyIcon}
              fullSymbol={getFullIcon}
              highlightSelectedOnly
              value={value}
              onChange={setValue}
              count={4}
              classNames={{
                root: "flex gap-2 sm:gap-4",
                symbolBody: "text-slate-200",
              }}
              aria-required
            />
          </div>
        )}
        {value > 0 && !state.msg && (
          <div
            className={cn(
              "animate-in w-full gap-3 px-2 py-3 delay-1000 flex-col-center",
              value == 0 ? "hidden" : ""
            )}
          >
            <Textarea
              autosize
              minRows={4}
              placeholder="What can we do better?"
              className="w-full"
              variant="filled"
              name="note"
              classNames={{ input: "bg-slate-500/20" }}
            />
            <div className="w-full gap-2 flex-row-between">
              <Button
                onClick={() => setValue(0)}
                className="rounded-xl"
                variant="subtle"
                w="100%"
              >
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl" w="100%">
                Submit
              </Button>
            </div>
          </div>
        )}
        {state?.msg && (
          <div className="animate-in w-full gap-3 px-2 py-3 pb-5">
            <Text
              className={cn(
                "text-center text-2xl font-semibold",
                value == 0 ? "hidden" : ""
              )}
            >
              Your feedback has been received!
              <br /> Thank you for your help.
            </Text>
          </div>
        )}
      </form>
    </div>
  );
}

/**
 * Rating Form States
 *
 * INITIAL
 * - value: 0
 * - form: hidden
 * - submit-button: disabled
 *
 * GIVING RATING
 * - value: 1-4
 * - form: shown
 * - submit-button: enabled
 *
 * SUBMITTING RATING
 * - value: 1-4
 * - form: hidden
 * - message: "Thank you for your feedback"
 * - submit-button: disabled
 *
 * SUBMITTED RATING
 * - value: 1-4
 * - form: hidden
 * - message: "Thank you for your feedback"
 * - submit-button: disabled
 */
