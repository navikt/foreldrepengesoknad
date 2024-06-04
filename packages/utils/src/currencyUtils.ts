export const formatCurrencyWithKr = (value: number | string): string => {
    const formattedValue = Number(value).toLocaleString('nb-NO').replace(/,|\s/g, ' ');
    return `${formattedValue} kr`;
};
