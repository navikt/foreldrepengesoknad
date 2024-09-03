import { usynligeCharsRegex } from '@navikt/fp-common';

export const replaceInvisibleCharsWithSpace = (inputString: string): string => {
    return inputString.replace(usynligeCharsRegex, '\u0020');
};
