export const assertUnreachable = (_x: never, message?: string): never => {
    throw new Error(message === undefined ? 'This should never happen.' : message);
};
