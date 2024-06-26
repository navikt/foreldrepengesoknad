const trimNumberValue = (value: string): string => {
    return value.replace(/,/g, '.').replace(/\s/g, '').replace(/%/g, '');
};

const numberRegExp = RegExp(/^[-]?[0-9,.\s]*$/);

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

export const getNumberFromNumberInputValue = (inputValue: string | undefined): number | undefined => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && isNaN(inputValue)) {
        return undefined;
    }
    const value = `${inputValue}`.replace(/,/g, '.').trim();
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};
