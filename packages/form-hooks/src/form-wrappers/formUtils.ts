import { FieldErrors, FieldValues, Path } from 'react-hook-form';

//TODO (TOR) Trur ein bør fjerna undefined her
export type ValidationReturnType = string | null | undefined;

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
    // @ts-expect-error Denne må ein testa før ein fjernar
    const error = name.split('.').reduce((o, i) => (o !== undefined ? o[i] : o), errors);
    // @ts-expect-error fiks
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return error?.message;
};
