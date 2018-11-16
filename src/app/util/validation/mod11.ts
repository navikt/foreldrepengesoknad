export const getMod11 = (strValue: string): number => {
    let checkNbr = 2;
    let mod = 0;

    for (let i = strValue.length - 2; i >= 0; --i) {
        mod += parseInt(strValue.charAt(i), 10) * checkNbr;
        if (++checkNbr > 7) {
            checkNbr = 2;
        }
    }
    const result = 11 - mod % 11;
    return result === 11 ? 0 : result;
};
