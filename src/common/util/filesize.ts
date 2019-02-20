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

export const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};
