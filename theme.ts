"use client"
import { type MantineColorsTuple, createTheme } from "@mantine/core";

const primary: MantineColorsTuple = [
    "#eef3ff",
    "#dee2f2",
    "#bdc2de",
    "#98a0ca",
    "#7a84ba",
    "#6672b0",
    "#5c68ac",
    "#4c5897",
    "#424e88",
    "#364379"
];
const dark: MantineColorsTuple = [
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
    "#020617"
]

export const theme = createTheme({
    primaryColor: "primary",
    primaryShade: 6,
    colors: {
        primary,
        dark
    },
})