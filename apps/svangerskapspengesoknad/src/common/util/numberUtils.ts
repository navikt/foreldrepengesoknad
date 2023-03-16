const numberRegExp = RegExp(/^[0-9,.\s]*$/);

const trimNumberValue = (value: string): string => {
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

export const trimNumberFromInput = (str: string): undefined | number => {
    const nbr = Number.parseInt(str.replace(/ /g, ''), 10);
    return isNaN(nbr) ? undefined : nbr;
};
