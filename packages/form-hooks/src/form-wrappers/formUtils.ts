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
