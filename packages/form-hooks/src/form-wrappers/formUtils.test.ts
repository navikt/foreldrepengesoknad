import { FieldErrors } from 'react-hook-form';

import { ValidationReturnType, getError, getValidationRules } from './formUtils';

interface TestForm {
    navn: string;
    adresse: {
        gate: string;
    };
    barn: Array<{
        navn: string;
    }>;
}

describe('getError', () => {
    it('skal returnere feilmelding for et felt på øverste nivå', () => {
        const errors = {
            navn: { type: 'required', message: 'Påkrevd' },
        } as FieldErrors<TestForm>;

        expect(getError(errors, 'navn')).toBe('Påkrevd');
    });

    it('skal returnere feilmelding for et nøstet felt', () => {
        const errors = {
            adresse: { gate: { type: 'required', message: 'Mangler gate' } },
        } as FieldErrors<TestForm>;

        expect(getError(errors, 'adresse.gate')).toBe('Mangler gate');
    });

    it('skal returnere feilmelding for et felt i en liste', () => {
        const errors = {
            barn: [{ navn: { type: 'required', message: 'Navn mangler' } }],
        } as FieldErrors<TestForm>;

        expect(getError(errors, 'barn.0.navn')).toBe('Navn mangler');
    });

    it('skal returnere undefined når feltet ikke har feil', () => {
        const errors = {} as FieldErrors<TestForm>;

        expect(getError(errors, 'navn')).toBeUndefined();
    });

    it('skal returnere undefined når deler av stien finnes, men løvnoden mangler', () => {
        const errors = {
            adresse: {},
        } as FieldErrors<TestForm>;

        expect(getError(errors, 'adresse.gate')).toBeUndefined();
    });
});

describe('getValidationRules', () => {
    it('skal lage en regel per valideringsfunksjon, indeksert på posisjon', () => {
        const ikkeTom = (value: string): ValidationReturnType => (value ? null : 'Påkrevd');
        const minstTreTegn = (value: string): ValidationReturnType => (value.length >= 3 ? null : 'For kort');

        const rules = getValidationRules([ikkeTom, minstTreTegn]) as Record<
            string,
            (value: string) => ValidationReturnType | true
        >;

        expect(Object.keys(rules)).toEqual(['0', '1']);
    });

    it('skal returnere true når valideringsfunksjonen ikke gir feil', () => {
        const ikkeTom = (value: string): ValidationReturnType => (value ? null : 'Påkrevd');

        const rules = getValidationRules([ikkeTom]) as Record<string, (value: string) => ValidationReturnType | true>;

        expect(rules['0']?.('noe')).toBe(true);
    });

    it('skal returnere feilmeldingen når valideringsfunksjonen gir feil', () => {
        const ikkeTom = (value: string): ValidationReturnType => (value ? null : 'Påkrevd');

        const rules = getValidationRules([ikkeTom]) as Record<string, (value: string) => ValidationReturnType | true>;

        expect(rules['0']?.('')).toBe('Påkrevd');
    });
});
