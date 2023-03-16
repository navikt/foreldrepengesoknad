import { detect } from 'detect-browser';

const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};

export const openPdfPreview = (base64: string) => {
    const browserInfo = detect();
    const pdfBlob = new Blob([base64ToArrayBuffer(base64)], {
        type: 'application/pdf',
    });

    if (
        browserInfo &&
        (browserInfo.name === 'edge' || browserInfo.name === 'ie') &&
        window.navigator &&
        (window as any).navigator.msSaveOrOpenBlob
    ) {
        (window as any).navigator.msSaveOrOpenBlob(pdfBlob);
    } else {
        window.open(URL.createObjectURL(pdfBlob));
    }
};
