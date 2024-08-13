// Throw Error when undefined or null, otherwise return non-nullable version of object
export const notEmpty = <T>(data: T): NonNullable<T> => {
    if (data === undefined || data === null) {
        throw Error('Data er ikke oppgitt');
    }
    return data;
};

export const assertUnreachable = (message?: string): never => {
    throw new Error(message ?? 'This should never happen.');
};

export const containsWhiteSpace = (s: string): boolean => {
    return /\s/.test(s);
};
