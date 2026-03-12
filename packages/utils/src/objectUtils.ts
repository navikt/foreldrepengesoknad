export const omitOne = <T, K extends keyof T>(object: T, keyToOmit: K): Omit<T, K> => {
    const o: Omit<T, K> & Partial<Pick<T, K>> = { ...object };
    delete o[keyToOmit];
    return o;
};

export const omitMany = <T, K extends keyof T>(object: T, keysToOmit: K[]): Omit<T, K> => {
    const result: Partial<T> = { ...object };
    for (const key of keysToOmit) {
        delete result[key];
    }
    return result as Omit<T, K>;
};
