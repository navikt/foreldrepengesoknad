import { usynligeCharsRegex } from './validationUtil';

export const replaceInvisibleCharsWithSpace = (inputString: string): string => {
    return inputString.replace(usynligeCharsRegex, '\u0020');
};
