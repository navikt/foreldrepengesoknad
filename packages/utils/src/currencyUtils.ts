export const formatCurrencyWithKr = (value: number | string): string => {
    const formattedValue = Number(value).toLocaleString('nb-NO');
    return `${formattedValue} kr`;
};

export const formatCurrency = (value: number | string): string => {
    const formattedValue = Number(value).toLocaleString('nb-NO');
    return `${formattedValue}`;
};
