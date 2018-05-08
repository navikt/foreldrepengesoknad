export const getDateFromString = (dato?: string) => {
    if (dato) {
        return new Date(dato);
    }
    return undefined;
};
