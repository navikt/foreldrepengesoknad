import { usynligeCharsRegex } from './validationUtil';

export const replaceInvisibleCharsWithSpace = (inputString: string): string => {
    return inputString.replace(usynligeCharsRegex, '\u0020');
};

export const capitalizeFirstLetter = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
