// Throw Error when undefined or null, otherwise return non-nullable version of object
export const notEmpty = <T>(data: T): NonNullable<T> => {
    if (data === undefined || data === null) {
        throw Error('Data er ikke oppgitt');
    }
    return data;
};
