/** Felles hjelpere for feltregler. */

export const harIngenVerdi = (value: string | undefined | null): boolean =>
    value === undefined || value === null || value === '' || value.trim() === '';
