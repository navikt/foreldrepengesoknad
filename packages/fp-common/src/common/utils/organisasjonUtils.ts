export const getMod11 = (strValue: string): number => {
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
