export const fullNameFormat = (fornavn: string, mellomnavn: string, etternavn: string) => {
    if (mellomnavn) {
        return `${fornavn} ${mellomnavn} ${etternavn}`;
    }
    return `${fornavn} ${etternavn}`;
};

export default {
    fullNameFormat
};
