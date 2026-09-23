import { FieldErrors, FieldValues, Path } from 'react-hook-form';

export type ValidationReturnType = string | null;

export const getValidationRules = <T>(validate: Array<(value: T) => ValidationReturnType>) =>
    validate.reduce(
        (acc, fn, index) => ({
            ...acc,
            [index]: (value: T) => fn(value) || true,
        }),
        {},
    );

const erVanligObjekt = (value: object): boolean => {
    const prototype: unknown = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

/**
 * Fjerner whitespace i start og slutt av alle tekstverdier i skjemaet.
 * Valideringen ignorerer slik whitespace, så verdiene som sendes videre må gjøre det samme.
 * Verdier som ikke er vanlige objekt/lister (Date, File, dayjs og liknende) blir ikke rørt.
 */
export const trimStringValues = <T>(values: T): T => {
    if (typeof values === 'string') {
        return values.trim() as T;
    }

    if (Array.isArray(values)) {
        return values.map(trimStringValues) as T;
    }

    if (values !== null && typeof values === 'object' && erVanligObjekt(values)) {
        return Object.fromEntries(
            Object.entries(values).map(([key, value]) => [key, trimStringValues(value)]),
        ) as unknown as T;
    }

    return values;
};

export const getError = <T extends FieldValues>(
    errors: FieldErrors<T>,
    name: (string | undefined) & Path<T>,
): string | undefined => {
    const error = name
        .split('.')
        .reduce<unknown>(
            (node, key) => (node && typeof node === 'object' ? (node as Record<string, unknown>)[key] : undefined),
            errors,
        );

    if (error && typeof error === 'object' && 'message' in error) {
        const { message } = error as { message?: unknown };
        return typeof message === 'string' ? message : undefined;
    }

    return undefined;
};
