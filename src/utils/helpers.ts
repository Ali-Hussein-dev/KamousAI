// Writen by: Chatpgt
export function capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
        return inputString; // Return the original string if it's empty
    }

    // Get the first letter and capitalize it
    const firstLetter = inputString.charAt(0).toUpperCase();
    // Get the rest of the string
    const restOfString = inputString.slice(1);

    // Combine and return
    return firstLetter + restOfString;
}