const numberRegex = /^\d+([,.]\d+)?$/;

export const isValidNumber = (text: string | number): boolean => numberRegex.test(text.toString());
