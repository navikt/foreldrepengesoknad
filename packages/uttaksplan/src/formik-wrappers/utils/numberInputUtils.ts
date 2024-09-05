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

export const getStringForNumberInputValue = (value?: number): string => {
    return value === undefined ? '' : `${value}`.replace(/\./g, ',');
};
