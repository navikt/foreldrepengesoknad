import MockDate from 'mockdate';
import {
    dateRangeValidation,
    isDateABeforeDateB,
    isDateInTheFuture,
    velgEldsteBarn,
    getUkerOgDagerFromDager,
    getVarighetString,
    formaterDato,
    formaterDatoUtenDag,
    dateIsSameOrBefore,
    dateIsSameOrAfter,
    formaterDatoKompakt,
    findEldsteDato,
    getAlderFraDato,
    convertTidsperiodeToTidsperiodeDate,
    getRelevantFamiliehendelseDato,
    ISOStringToDate,
    isDateToday,
    getEndringstidspunkt,
} from './dateUtils';

import getIntlMock from 'utils-test/intl-test-helper';
import { RegistrertBarn } from 'app/types/Person';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { Periode, PeriodeHull, Periodetype, Utsettelsesperiode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { guid } from 'nav-frontend-js-utils';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';

describe('dateUtils', () => {
    const intl = getIntlMock();

    beforeAll(() => {
        MockDate.set('2021-07-08');
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal konvertere string til Date', () => {
        const dato = ISOStringToDate('2021-05-05');

        expect(dato?.getTime()).toBe(new Date('2021-05-05').getTime());
    });

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

            expect(dato).toBeUndefined;
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
                'Til og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 05. May 2021 til 07. May 2021'
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

            expect(dato).toBeUndefined;
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
                'Fra og med dato er ikke innenfor gyldig tidsrom. Gyldig tidsrom er fra 05. May 2021 til 07. May 2021'
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
                toDate,
                disableWeekend: false,
            });

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

    it('skal returnere true når dato er i dag', () => {
        const erIDag = isDateToday(dateToISOString(new Date()));
        expect(erIDag).toBe(true);
    });

    it('skal returnere false når dato ikke er i dag', () => {
        const erIDag = isDateToday('17-01-2022');
        expect(erIDag).toBe(false);
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

        expect(result.fnr).toBe(eldsteBarn.fnr);
    });

    it('skal konvertere dager til uker og dager', () => {
        const ukerOgDager = getUkerOgDagerFromDager(97);
        expect(ukerOgDager.dager).toBe(2);
        expect(ukerOgDager.uker).toBe(19);
    });

    it('skal finne varighet gitt antall dager', () => {
        const varighet = getVarighetString(97, intl);
        expect(varighet).toBe('19 uker og 2 dager');
    });

    it('skal finne varighet der antall dager er mindre enn 1 uke', () => {
        const varighet = getVarighetString(2, intl);
        expect(varighet).toBe('2 dager');
    });

    it('skal formatere dato', () => {
        const formatertDato = formaterDato('2021-01-01');
        //TODO Engelsk?
        expect(formatertDato).toBe('Friday 1. January 2021');
    });

    it('skal formatere dato uten dag', () => {
        const formatertDato = formaterDatoUtenDag('2021-01-01');
        //TODO Engelsk?
        expect(formatertDato).toBe('1. January 2021');
    });

    it('skal returnere true når dato er før annen dato', () => {
        const erDatoFørAnnenDato = dateIsSameOrBefore(ISOStringToDate('2021-01-01'), ISOStringToDate('2021-01-02'));
        expect(erDatoFørAnnenDato).toBe(true);
    });

    it('skal returnere true når dato er etter annen dato', () => {
        const erDatoEtterAnnenDato = dateIsSameOrAfter(ISOStringToDate('2021-01-02'), ISOStringToDate('2021-01-01'));
        expect(erDatoEtterAnnenDato).toBe(true);
    });

    it('skal returnere kompakt datoformat', () => {
        const kompaktDato = formaterDatoKompakt(ISOStringToDate('2021-01-02')!);
        expect(kompaktDato).toBe('02.01.2021');
    });

    it('skal returnere eldste dato', () => {
        const kompaktDato = findEldsteDato([
            ISOStringToDate('2021-01-03')!,
            ISOStringToDate('2021-01-01')!,
            ISOStringToDate('2021-01-02')!,
        ]);
        expect(kompaktDato).toEqual(ISOStringToDate('2021-01-01')!);
    });

    it('skal finne alder fra dato', () => {
        const alder = getAlderFraDato(ISOStringToDate('2020-01-02')!);
        expect(alder.år).toBe(1);
        expect(alder.måneder).toBe(18);
        expect(alder.dager).toBe(553);
    });

    it('skal konvertere string-versjon av tidsperiode til date-versjon', () => {
        const tidsperiodeStreng = {
            fom: '2021-01-01',
            tom: '2021-02-02',
        };
        const tidsperiodeDato = convertTidsperiodeToTidsperiodeDate(tidsperiodeStreng);
        expect(tidsperiodeDato.fom).toEqual(ISOStringToDate('2021-01-01'));
        expect(tidsperiodeDato.tom).toEqual(ISOStringToDate('2021-02-02'));
    });

    it('skal hente fødselsdato når denne finnes', () => {
        const termindato = '2021-03-04';
        const fødselsdato = '2021-03-01';
        const omsorgsovertakelsesdato = undefined;
        const dato = getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato);
        expect(dato).toBe(fødselsdato);
    });

    it('skal hente termindato når fødselsdato ikkje finnes', () => {
        const termindato = '2021-03-04';
        const fødselsdato = undefined;
        const omsorgsovertakelsesdato = undefined;
        const dato = getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato);
        expect(dato).toBe(termindato);
    });

    it('skal hente omsorgsovertakelsesdato når dette er den eneste datoen som finnes', () => {
        const termindato = undefined;
        const fødselsdato = undefined;
        const omsorgsovertakelsesdato = '2021-03-04';
        const dato = getRelevantFamiliehendelseDato(termindato, fødselsdato, omsorgsovertakelsesdato);
        expect(dato).toBe(omsorgsovertakelsesdato);
    });

    describe('getEndringstidspunkt', () => {
        const opprinneligPlan: Array<Partial<Periode>> = [
            {
                id: '2203724966-2284-5396-14729-8277157806438',
                tidsperiode: {
                    fom: new Date('2019-09-10T00:00:00.000Z'),
                    tom: new Date('2019-09-30T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '96519825-01917-7239-1861-16148140669135',
                tidsperiode: {
                    fom: new Date('2019-10-01T00:00:00.000Z'),
                    tom: new Date('2020-01-13T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-01-14T00:00:00.000Z'),
                    tom: new Date('2020-05-04T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            },
        ];

        it('Skal returnere undefined hvis ikke endringssøknad', () => {
            const endringstidspunkt = getEndringstidspunkt(undefined, [], false);

            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal returnere undefined for ingen endringer', () => {
            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlan as Periode[],
                [...opprinneligPlan] as Periode[],
                true
            );

            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal finne endringstidspunkt gitt at det er endringer', () => {
            const gradertPeriode: Partial<Uttaksperiode> = {
                id: guid(),
                tidsperiode: {
                    fom: new Date('2019-05-05'),
                    tom: new Date('2019-05-08'),
                },
                type: Periodetype.Uttak,
                gradert: true,
                stillingsprosent: '50',
            };
            const endretPlan = [...opprinneligPlan, gradertPeriode];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(gradertPeriode.tidsperiode!.fom);
        });

        it('Hvis uttaksplanlogikken setter hull inn i planen skal det telle som en endring', () => {
            const hullPeriode: Partial<PeriodeHull> = {
                type: Periodetype.Hull,
                tidsperiode: {
                    fom: new Date('2019-09-01'),
                    tom: new Date('2019-09-09'),
                },
            };
            const endretPlan = [hullPeriode, ...opprinneligPlan];
            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(hullPeriode.tidsperiode!.fom);
        });

        it('Hvis uttaksplanlogikken deler en periode skal endringstidspunkt være fra delingen og fremover ikke ta med tidligere del av perioden', () => {
            const deltPeriodeTidligereDel: Partial<Uttaksperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-01-14T00:00:00.000Z'),
                    tom: new Date('2020-04-03T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            };
            const periodeSomDeltePeriode: Partial<Utsettelsesperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-04-06T00:00:00.000Z'),
                    tom: new Date('2020-04-17T00:00:00.000Z'),
                },
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Arbeid,
            };
            const deltPeriodeSenereDel: Partial<Uttaksperiode> = {
                id: '3105926427-6496-7446-7246-02332065872239',
                tidsperiode: {
                    fom: new Date('2020-04-20T00:00:00.000Z'),
                    tom: new Date('2020-05-04T00:00:00.000Z'),
                },
                type: Periodetype.Uttak,
            };

            const endretPlan = [
                opprinneligPlan[0],
                opprinneligPlan[1],
                deltPeriodeTidligereDel,
                periodeSomDeltePeriode,
                deltPeriodeSenereDel,
            ];
            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);

            expect(endringstidspunkt).toBe(periodeSomDeltePeriode.tidsperiode!.fom);
        });
    });
});
