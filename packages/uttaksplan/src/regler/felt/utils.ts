/** Felles hjelpere for feltregler. */

export const harIngenVerdi = (value: string | undefined | null): boolean =>
    value === undefined || value === null || value === '' || value.trim() === '';

export const harFlereEnnToDesimaler = (value: string | undefined): boolean =>
    value !== undefined && /[.,]\d{3,}$/.test(value.replaceAll(/\s/g, ''));
