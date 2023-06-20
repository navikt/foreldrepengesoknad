export const assertUnreachable = (_x: never, errorMsg: string): never => {
    throw new Error(errorMsg);
};
