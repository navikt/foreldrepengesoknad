import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export const usynligeCharsRegex =
    /[\u034f\t\u00a0\u00ad\u061c\u115f\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200b\u200c\u200d\u200e\u200f\u202d\u202f\u205f\u2060\u2061\u2062\u2063\u2064\u206a\u206b\u206c\u206d\u206e\u206f\u3000\u2800\u3164\ufeff\uffa0\u1160]/g;

export const convertYesOrNoOrUndefinedToBoolean = (value: YesOrNo | undefined) => {
    if (value === YesOrNo.YES) {
        return true;
    }

    if (value === YesOrNo.UNANSWERED) {
        return undefined;
    }

    return false;
};

export const replaceInvisibleCharsWithSpace = (inputString: string): string => {
    return inputString.replace(usynligeCharsRegex, '\u0020');
};
