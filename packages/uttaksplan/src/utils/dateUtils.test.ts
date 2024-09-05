import MockDate from 'mockdate';
import { createIntl, createIntlCache } from 'react-intl';

import { Utsettelsesperiode } from '@navikt/fp-common';

import { ISOStringToDate, dateRangeValidation } from './dateUtils';

// Create the IntlProvider to retrieve context for wrapping around.
const cache = createIntlCache();

const getIntlMock = () => {
    return createIntl(
        {
            locale: 'nb',
            defaultLocale: 'nb',
            messages: {},
        },
        cache,
    );
};

describe('dateUtils', () => {
    const intl = getIntlMock();

    beforeAll(() => {
        MockDate.set('2021-07-08');
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal konvertere string til Date riktig', () => {
        const dato = ISOStringToDate('2021-05-05');

        expect(dato?.getTime()).toBe(new Date('2021-05-05').getTime());
    });

    const periodeId = '0';

    describe('validateToDateInRange', () => {
        it('skal ikke gi feilmelding når dato er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-09');
            const maxDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateToDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                disableWeekend: false,
            });

            expect(dato).toBeUndefined();
        });

        it('skal gi feilmelding når dato ikke er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-07');

            const dato = dateRangeValidation.validateToDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                disableWeekend: false,
            });

            expect(dato).toBe(
                'Til og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 05. mai 2021 til 07. mai 2021',
            );
        });

        it('skal gi feilmelding når dato ikke er satt', () => {
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const fromDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateToDateInRange({
                intl,
                date: undefined,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                fromDate,
                disableWeekend: false,
            });

            expect(dato).toBe('Til og med dato må være en gyldig dato på formatet dd.mm.åååå');
        });

        it('skal gi feilmelding når dato er før fromDate', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const fromDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateToDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                disableWeekend: false,
                fromDate,
            });

            expect(dato).toBe('Du må legge inn en til og med dato som er etter fra og med datoen.');
        });
        it('skal gi feilmelding når til-dato overlapper en utsettelsesperiode', () => {
            const date = new Date('2022-08-13');
            const minDate = new Date('2020-05-05');
            const maxDate = new Date('2023-05-11');
            const fromDate = new Date('2020-05-11');
            const utsettelserIPlan = [
                { tidsperiode: { fom: new Date('2022-08-10'), tom: new Date('2022-08-15') }, id: '4' },
            ] as Utsettelsesperiode[];

            const validering = dateRangeValidation.validateToDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                fromDate,
                disableWeekend: false,
                periodeId,
                utsettelserIPlan,
            });

            expect(validering).toBe(
                'Du har en utsettelse fra 10.08.2022 til 15.08.2022 som overlapper med den valgte datoen. Du må endre på denne utsettelsen først.',
            );
        });
    });

    describe('validateFromDateInRange', () => {
        it('skal ikke gi feilmelding når dato er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-09');
            const maxDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateFromDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                disableWeekend: false,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
            });

            expect(dato).toBeUndefined();
        });

        it('skal gi feilmelding når dato ikke er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-07');

            const dato = dateRangeValidation.validateFromDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                disableWeekend: false,
            });

            expect(dato).toBe(
                'Fra og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 05. mai 2021 til 07. mai 2021',
            );
        });

        it('skal gi feilmelding når dato ikke er satt', () => {
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const toDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateFromDateInRange({
                intl,
                date: undefined,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                toDate,
                disableWeekend: false,
            });

            expect(dato).toBe('Fra og med dato må være en gyldig dato på formatet dd.mm.åååå');
        });

        it('skal gi feilmelding når dato er før toDate', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const toDate = new Date('2021-05-05');

            const dato = dateRangeValidation.validateFromDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                disableWeekend: false,
                toDate,
            });

            expect(dato).toBe('Du må legge inn en til og med dato som er etter fra og med datoen.');
        });
        it('skal gi feilmelding når fra-dato overlapper en utsettelsesperiode', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2020-05-05');
            const maxDate = new Date('2023-05-11');
            const toDate = new Date('2021-05-11');
            const utsettelse1 = {
                tidsperiode: { fom: new Date('2021-04-10'), tom: new Date('2021-04-12') },
                id: '1',
            } as Utsettelsesperiode;
            const utsettelse2 = {
                tidsperiode: { fom: new Date('2021-05-01'), tom: new Date('2021-06-10') },
                id: '2',
            } as Utsettelsesperiode;

            const validering = dateRangeValidation.validateFromDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                toDate,
                disableWeekend: false,
                periodeId,
                utsettelserIPlan: [utsettelse1, utsettelse2],
            });

            expect(validering).toBe(
                'Du har en utsettelse fra 01.05.2021 til 10.06.2021 som overlapper med den valgte datoen. Du må endre på denne utsettelsen først.',
            );
        });
        it('skal ikke gi feilmelding om overlappende utsettelser når fra-dato settes på selve utsettelsen', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2020-05-05');
            const maxDate = new Date('2023-05-11');
            const toDate = new Date('2021-05-11');

            const utsettelseSomEndres = {
                tidsperiode: { fom: new Date('2021-05-01'), tom: new Date('2021-06-10') },
                id: '2',
            } as Utsettelsesperiode;
            const validering = dateRangeValidation.validateFromDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                toDate,
                disableWeekend: false,
                periodeId: utsettelseSomEndres.id,
                utsettelserIPlan: [utsettelseSomEndres],
            });

            expect(validering).toBe(undefined);
        });
    });
});
