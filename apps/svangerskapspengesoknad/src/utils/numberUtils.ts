const numberRegExp = new RegExp(/^[-]?[0-9,.\s]*$/);

const trimNumberValue = (value: string): string => {
    return value.replaceAll(',', '.').replaceAll(/\s/g, '').replaceAll('%', '');
};

export const getFloatFromString = (value: string | undefined): number | undefined => {
    if (value !== undefined && value !== null && value.length > 0 && numberRegExp.test(value)) {
        const trimmedValue = trimNumberValue(value);
        const numberOfPoints = (trimmedValue.match(/\./g) || []).length;
        if (numberOfPoints > 1) {
            return undefined;
        }
        return Number.parseFloat(trimmedValue.replace(',', '.'));
    }
    return undefined;
};
