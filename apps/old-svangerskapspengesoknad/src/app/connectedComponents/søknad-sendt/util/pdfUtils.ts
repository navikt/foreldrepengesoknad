const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};

export const openPdfPreview = (base64: string) => {
    window.open(
        URL.createObjectURL(
            new Blob([base64ToArrayBuffer(base64)], {
                type: 'application/pdf',
            })
        )
    );
};
