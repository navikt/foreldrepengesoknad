export const omitOne = <T, K extends keyof T>(object: T, keyToOmit: K): Omit<T, K> => {
    const o: Omit<T, K> & Partial<Pick<T, K>> = { ...object };
    delete o[keyToOmit];
    return o;
};

export const omitMany = <T, K extends keyof T>(object: T, keysToOmit: K[]): Omit<T, K> => {
    let result = object as Omit<T, K>;
    keysToOmit.forEach((key) => {
        result = omitOne(result, key as unknown as keyof Omit<T, K>) as Omit<T, K>;
    });
    return result;
};
