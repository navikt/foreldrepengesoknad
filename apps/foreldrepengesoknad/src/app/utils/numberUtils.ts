import { hasValue } from '@navikt/fp-common';

const onlyNumbersRegExp = /^[0-9]*$/;

const getMod11 = (strValue: string): number => {
    let checkNbr = 2;
    let mod = 0;

    for (let i = strValue.length - 2; i >= 0; --i) {
        mod += parseInt(strValue.charAt(i), 10) * checkNbr;
        if (++checkNbr > 7) {
            checkNbr = 2;
        }
    }
    const result = 11 - (mod % 11);
    return result === 11 ? 0 : result;
};

const er9Tall = (orgnr: string): boolean => {
    return onlyNumbersRegExp.test(orgnr) && orgnr.length === 9;
};

const starterPå8Eller9 = (orgnr: string): boolean => {
    return orgnr.charAt(0) === '8' || orgnr.charAt(0) === '9';
};

export const erGyldigNorskOrgnummer = (orgnr: string): boolean => {
    if (!orgnr || er9Tall(orgnr) === false || starterPå8Eller9(orgnr) === false || orgnr === '999999999') {
        return false;
    }
    return getMod11(orgnr) === parseInt(orgnr.charAt(8), 10);
};

export const numberHasValue = (num: string): boolean => {
    if (!hasValue(num) || num.trim().length === 0) {
        return false;
    }

    return true;
};

const numberRegExp = RegExp(/^[-]?[0-9,.\s]*$/);

export const trimNumberValue = (value: string): string => {
    return value.replace(/,/g, '.').replace(/\s/g, '');
};

export const getFloatFromString = (value: string | undefined): number | undefined => {
    if (value !== undefined && value !== null && value.length > 0 && numberRegExp.test(value)) {
        const trimmedValue = trimNumberValue(value);
        const numberOfPoints = (trimmedValue.match(/\./g) || []).length;
        if (numberOfPoints > 1) {
            return undefined;
        }
        return parseFloat(trimmedValue);
    }
    return undefined;
};
