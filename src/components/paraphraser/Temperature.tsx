"use client";
import { Slider, Text } from "@mantine/core";
import * as React from "react";
import { useParaphraserContext } from "@/hooks/use-paraphraser";

export function Temperature() {
  const temperature = useParaphraserContext((s) => s.temperature);
  const setTemperature = useParaphraserContext((s) => s.setTemperature);

  return (
    <div className="py-1">
      <Text size="sm" mb="4px">
        Creativity Level ({temperature}/2)
      </Text>
      <Slider
        value={temperature}
        onChange={setTemperature}
        min={0.1}
        max={2}
        step={0.1}
      />
    </div>
  );
}
