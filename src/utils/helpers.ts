import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Writen by: Chatpgt
export function capitalizeFirstLetter(inputString = ""): string {
    if (inputString.length === 0) {
        console.warn('capitalizeFirstLetter: Empty string passed in', inputString)
        return inputString; // Return the original string if it's empty
    }

    // Get the first letter and capitalize it
    const firstLetter = inputString.charAt(0).toUpperCase();
    // Get the rest of the string
    const restOfString = inputString.slice(1);

    // Combine and return
    return firstLetter + restOfString;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(functionToCheck: any): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}




export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
