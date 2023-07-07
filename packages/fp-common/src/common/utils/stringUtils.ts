import { usynligeCharsRegex } from './regexUtils';

export const replaceInvisibleCharsWithSpace = (inputString: string): string => {
    return inputString.replace(usynligeCharsRegex, '\u0020');
};
