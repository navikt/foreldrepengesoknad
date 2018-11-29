export const removeSpacesFromString = (value: string) => {
    return value.replace(/\s/g, '');
};

export const maxLengthIsGreaterThanOrEqualToStringLength = (maxLength: number, value: string) => {
    return value.length <= maxLength;
};
