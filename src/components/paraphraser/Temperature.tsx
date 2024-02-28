"use client";

import { Slider, Text } from "@mantine/core";
import * as React from "react";
import { useParaphraserFormCtx } from "@/context/form-paraphraser-context";

export function Temperature() {
  const form = useParaphraserFormCtx();
  return (
    <div className="py-1">
      <Text size="sm" mb="4px">
        Creativity Level ({form.getInputProps("configs.temperature").value}/2)
      </Text>
      <Slider
        name="temperature"
        {...form.getInputProps("configs.temperature")}
        min={0.1}
        max={2}
        step={0.1}
      />
    </div>
  );
}
