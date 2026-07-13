export const omitOne = <T, K extends keyof T>(object: T, keyToOmit: K): Omit<T, K> => {
    const o: Omit<T, K> & Partial<Pick<T, K>> = { ...object };
    delete o[keyToOmit];
    return o;
};

export const omitMany = <T, K extends keyof T>(object: T, keysToOmit: K[]): Omit<T, K> => {
    let result = object as Omit<T, K>;
    for (const key of keysToOmit) {
        result = omitOne(result, key as unknown as keyof Omit<T, K>) as Omit<T, K>;
    }
    return result;
};

// Kanoniserer ein verdi rekursivt: sorterer element i arrays og nøklar i objekt
// slik at to strukturelt like verdiar får identisk representasjon uavhengig av
// rekkefølgje.
const kanoniser = (value: unknown): unknown => {
    if (Array.isArray(value)) {
        // Pre-kalkuler ein sorteringsnøkkel per element slik at JSON.stringify
        // berre køyrer éin gong per element (ikkje på kvar samanlikning).
        return value
            .map((element) => {
                const kanonisert = kanoniser(element);
                return { kanonisert, nøkkel: JSON.stringify(kanonisert) };
            })
            .sort((a, b) => a.nøkkel.localeCompare(b.nøkkel))
            .map(({ kanonisert }) => kanonisert);
    }
    if (value !== null && typeof value === 'object') {
        const record = value as Record<string, unknown>;
        return Object.fromEntries(
            Object.keys(record)
                .sort((a, b) => a.localeCompare(b))
                .map((key) => [key, kanoniser(record[key])]),
        );
    }
    return value;
};

// Deep likskap som ignorerer rekkefølgja på element i arrays. Nyttig for
// registerdata (arbeidsforhold, barn, saker, perioder) der lista er eit sett
// utan meiningsfull rekkefølge, og backend kan returnera elementa i ulik orden
// mellom kall.
export const erLikUansettRekkefølge = (a: unknown, b: unknown): boolean =>
    JSON.stringify(kanoniser(a)) === JSON.stringify(kanoniser(b));
