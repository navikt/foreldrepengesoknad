export function notEmpty<T>(data: T): NonNullable<T> {
    if (data === undefined || data === null) {
        throw Error('Data er ikke oppgitt');
    }
    return data;
}
