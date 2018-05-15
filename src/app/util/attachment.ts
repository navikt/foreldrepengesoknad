import Bytes from 'bytes';

export const bytesString = (bytes: number): string => {
    return Bytes(bytes, {
        unitSeparator: ' ',
        thousandsSeparator: ' ',
        decimalPlaces: 1,
        fixedDecimals: false
    });
};

export const getTotalFileSize = (files: File[]): number => {
    return files.reduce(
        (a, b) =>
            ({
                size: a.size + b.size
            } as any),
        { size: 0 }
    ).size;
};
