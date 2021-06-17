import {
    getDateFromDateString,
    dateRangeValidation,
    isDateABeforeDateB,
    isDateInTheFuture,
    velgEldsteBarn,
} from './dateUtils';

import getIntlMock from 'utils-test/intl-test-helper';
import { RegistrertBarn } from 'app/types/Person';

describe('dateUtils', () => {
    const intl = getIntlMock();

    it('skal konvertere string til Date', () => {
        const dato = getDateFromDateString('2021-05-05');

        expect(dato?.getTime()).toBe(new Date('2021-05-05').getTime());
    });

    describe('validateToDateInRange', () => {
        it('skal ikke gi feilmelding når dato er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-09');
            const maxDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateToDateInRange(
                intl,
                date,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato'
            );

            expect(dato).toBeUndefined;
        });

        it('skal gi feilmelding når dato ikke er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-07');

            const dato = dateRangeValidation.validateToDateInRange(
                intl,
                date,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato'
            );

            expect(dato).toBe(
                'Til og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 05. May 2021 til 07. May 2021'
            );
        });

        it('skal gi feilmelding når dato ikke er satt', () => {
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const fromDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateToDateInRange(
                intl,
                undefined,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato',
                fromDate
            );

            expect(dato).toBe('Til og med dato må være en gyldig dato på formatet dd.mm.åååå');
        });

        it('skal gi feilmelding når dato er før fromDate', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const fromDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateToDateInRange(
                intl,
                date,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato',
                fromDate
            );

            expect(dato).toBe('Du må legge inn en til og med dato som er etter fra og med datoen.');
        });
    });

    describe('validateFromDateInRange', () => {
        it('skal ikke gi feilmelding når dato er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-09');
            const maxDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateFromDateInRange(
                intl,
                date,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato'
            );

            expect(dato).toBeUndefined;
        });

        it('skal gi feilmelding når dato ikke er innenfor intervall', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-07');

            const dato = dateRangeValidation.validateFromDateInRange(
                intl,
                date,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato'
            );

            expect(dato).toBe(
                'Fra og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 05. May 2021 til 07. May 2021'
            );
        });

        it('skal gi feilmelding når dato ikke er satt', () => {
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const toDate = new Date('2021-05-11');

            const dato = dateRangeValidation.validateFromDateInRange(
                intl,
                undefined,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato',
                toDate
            );

            expect(dato).toBe('Fra og med dato må være en gyldig dato på formatet dd.mm.åååå');
        });

        it('skal gi feilmelding når dato er før toDate', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2021-05-05');
            const maxDate = new Date('2021-05-11');
            const toDate = new Date('2021-05-05');

            const dato = dateRangeValidation.validateFromDateInRange(
                intl,
                date,
                minDate,
                maxDate,
                'valideringsfeil.tilOgMedDato.etterFraDato',
                toDate
            );

            expect(dato).toBe('Du må legge inn en til og med dato som er etter fra og med datoen.');
        });
    });

    it('skal returnere true når dato er før en annen dato', () => {
        const erFør = isDateABeforeDateB('2021-05-03', '2021-05-04');
        expect(erFør).toBe(true);
    });

    it('skal returnere false når dato er etter en annen dato', () => {
        const erFør = isDateABeforeDateB('2021-05-06', '2021-05-04');
        expect(erFør).toBe(false);
    });

    it('skal returnere false når dato ikke er på iso-format', () => {
        const erFør = isDateABeforeDateB('06.05.2021', '2021-05-04');
        expect(erFør).toBe(false);
    });

    it('skal returnere true når dato er fremtidig', () => {
        const erIFremtiden = isDateInTheFuture('06.05.2090');
        expect(erIFremtiden).toBe(true);
    });

    it('skal returnere false når dato er i fortiden', () => {
        const erIFremtiden = isDateInTheFuture('06.05.2020');
        expect(erIFremtiden).toBe(false);
    });

    it('skal finne det eldste barnet', () => {
        const eldsteBarn: RegistrertBarn = {
            etternavn: 'test',
            fnr: '123123',
            fornavn: 'test',
            fødselsdato: new Date('2020-01-01'),
            kjønn: 'K',
        };

        const yngsteBarn: RegistrertBarn = {
            etternavn: 'test',
            fnr: '234234',
            fornavn: 'test',
            fødselsdato: new Date('2021-01-01'),
            kjønn: 'K',
        };

        const registrerteBarn = [eldsteBarn, yngsteBarn];
        const valgteBarn = [eldsteBarn.fnr, yngsteBarn.fnr];

        const result = velgEldsteBarn(registrerteBarn, valgteBarn);

        console.log(result.fnr);
        expect(result.fnr).toBe(eldsteBarn.fnr);
    });
});
