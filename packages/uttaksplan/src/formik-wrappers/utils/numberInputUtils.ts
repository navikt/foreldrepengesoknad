export const getNumberFromNumberInputValue = (inputValue: string | undefined): number | undefined => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && Number.isNaN(inputValue)) {
        return undefined;
    }
    const value = `${inputValue}`.replace(/,/g, '.').trim();
    const numValue = Number(value);
    if (Number.isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};
