import { getMod11 } from './numberUtils';

const onlyNumbersRegExp = /^\d*$/;

export const er9Tall = (orgnr: string): boolean => {
    return onlyNumbersRegExp.test(orgnr) && orgnr.length === 9;
};

export const starterPå8Eller9 = (orgnr: string): boolean => {
    return orgnr.charAt(0) === '8' || orgnr.charAt(0) === '9';
};

export const erGyldigNorskOrgnummer = (orgnr: string): boolean => {
    if (!orgnr || er9Tall(orgnr) === false || starterPå8Eller9(orgnr) === false) {
        return false;
    }
    return getMod11(orgnr) === parseInt(orgnr.charAt(8), 10);
};
