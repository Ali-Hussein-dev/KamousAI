"use client"
import { type MantineColorsTuple, createTheme } from "@mantine/core";

const primary: MantineColorsTuple = [
    "#fffbeb",
    "#fef3c7",
    "#fde68a",
    "#fcd34d",
    "#fbbf24",
    "#f59e0b",
    "#d97706",
    "#b45309",
    "#92400e",
    "#78350f",
    "#451a03"
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
    fontFamily: "Inter",
    colors: {
        primary,
        dark
    },
})