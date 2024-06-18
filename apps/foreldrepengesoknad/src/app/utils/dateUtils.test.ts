import dayjs from 'dayjs';
import MockDate from 'mockdate';
import getIntlMock from 'utils-test/intl-test-helper';

import {
    Barn,
    BarnType,
    ISOStringToDate,
    Periode,
    PeriodeHull,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode,
    andreAugust2022ReglerGjelder,
    convertTidsperiodeToTidsperiodeDate,
    dateRangeValidation,
    formaterDato,
    formaterDatoKompakt,
    formaterDatoUtenDag,
    getToTetteReglerGjelder,
    getUkerOgDagerFromDager,
    getVarighetString,
    guid,
    isDateInTheFuture,
    isDateToday,
    tidperiodeOverlapperDato,
} from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-formik';
import { SøkerBarn } from '@navikt/fp-types';

import {
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    findEldsteDato,
    førsteJuli2024ReglerGjelder,
    getAlderFraDato,
    getEldsteDato,
    getEldsteRegistrerteBarn,
    getEndringstidspunkt,
    getRelevantFamiliehendelseDato,
    isDateABeforeDateB,
    sorterDatoEtterEldst,
} from './dateUtils';
import fns from './toggleUtils';

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
        const eldsteBarn: SøkerBarn = {
            etternavn: 'test',
            fnr: '123123',
            fornavn: 'test',
            fødselsdato: '2020-01-01',
            kjønn: 'K',
        };

        const yngsteBarn: SøkerBarn = {
            etternavn: 'test',
            fnr: '234234',
            fornavn: 'test',
            fødselsdato: '2021-01-01',
            kjønn: 'K',
        };

        const valgteRegistrerteBarn = [eldsteBarn, yngsteBarn];

        const result = getEldsteRegistrerteBarn(valgteRegistrerteBarn);

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
        expect(formatertDato).toBe('fredag 1. januar 2021');
    });

    it('skal formatere dato uten dag', () => {
        const formatertDato = formaterDatoUtenDag('2021-01-01');
        //TODO Engelsk?
        expect(formatertDato).toBe('1. januar 2021');
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
                id: '1',
                tidsperiode: {
                    fom: new Date('2019-09-10'),
                    tom: new Date('2019-09-30'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '2',
                tidsperiode: {
                    fom: new Date('2019-10-01'),
                    tom: new Date('2020-01-13'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '3',
                tidsperiode: {
                    fom: new Date('2020-01-14'),
                    tom: new Date('2020-05-01'),
                },
                type: Periodetype.Uttak,
            },
        ];

        const opprinneligPlanMedHull = [
            {
                id: '20',
                tidsperiode: {
                    fom: new Date('2022-09-21'),
                    tom: new Date('2022-10-11'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '21',
                tidsperiode: {
                    fom: new Date('2022-10-12'),
                    tom: new Date('2022-12-13'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '22',
                tidsperiode: {
                    fom: new Date('2022-12-14'),
                    tom: new Date('2022-12-27'),
                },
                type: Periodetype.PeriodeUtenUttak,
            },
            {
                id: '23',
                tidsperiode: {
                    fom: new Date('2022-12-28'),
                    tom: new Date('2023-01-30'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '24',
                tidsperiode: {
                    fom: new Date('2023-01-31'),
                    tom: new Date('2023-02-20'),
                },
                type: Periodetype.Uttak,
            },
            {
                id: '25',
                tidsperiode: {
                    fom: new Date('2023-02-21'),
                    tom: new Date('2023-02-27'),
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
                true,
            );

            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal finne endringstidspunkt gitt at det er ny periode i slutten', () => {
            const gradertPeriode: Partial<Uttaksperiode> = {
                id: guid(),
                tidsperiode: {
                    fom: new Date('2019-05-04'),
                    tom: new Date('2019-05-11'),
                },
                type: Periodetype.Uttak,
                gradert: true,
                stillingsprosent: '50',
            };
            const endretPlan = [...opprinneligPlan, gradertPeriode];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(gradertPeriode.tidsperiode?.fom);
        });

        it('Hvis en ny periode legges til i slutten med en periode uten uttak i mellom den opprinnelige planen, skal starten på denne perioden være endringstidspunktet', () => {
            const endretPlan = [
                ...opprinneligPlan,
                {
                    id: '23',
                    tidsperiode: {
                        fom: new Date('2020-05-02'),
                        tom: new Date('2020-05-09'),
                    },
                    type: Periodetype.PeriodeUtenUttak,
                },
                {
                    id: '24',
                    tidsperiode: {
                        fom: new Date('2020-05-10'),
                        tom: new Date('2020-05-17'),
                    },
                    type: Periodetype.Uttak,
                },
            ];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(endretPlan[4].tidsperiode?.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er endret (f.eks gradert)', () => {
            const endretPlan = [
                opprinneligPlan[0],
                { ...opprinneligPlan[1], gradert: true, stillingsprosent: '50' },
                opprinneligPlan[2],
            ];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1].tidsperiode?.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er slettet og skaper periode uten uttak', () => {
            const endretPlan = [
                opprinneligPlan[0],
                { tidsperiode: opprinneligPlan[1].tidsperiode, type: Periodetype.PeriodeUtenUttak },
                opprinneligPlan[2],
            ];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1].tidsperiode?.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er slettet og skaper hull', () => {
            const endretPlan = [
                opprinneligPlan[0],
                { tidsperiode: opprinneligPlan[1].tidsperiode, type: Periodetype.Hull },
                opprinneligPlan[2],
            ];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1].tidsperiode?.fom);
        });

        it('Skal finne endringstidspunkt gitt at en periode har fått senere sluttdato (blitt lenger)', () => {
            const endretPlan = [
                opprinneligPlan[0],
                {
                    ...opprinneligPlan[1],
                    tidsperiode: { fom: opprinneligPlan[1].tidsperiode?.fom, tom: new Date('2020-01-14') },
                },
                {
                    ...opprinneligPlan[2],
                    tidsperiode: { fom: new Date('2020-01-15'), tom: opprinneligPlan[2].tidsperiode?.tom },
                },
            ];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1].tidsperiode?.fom);
        });

        it('Skal finne endringstidspunkt gitt at en periode har fått tidligere sluttdato (blitt kortere)', () => {
            const endretPlan = [
                opprinneligPlan[0],
                {
                    ...opprinneligPlan[1],
                    tidsperiode: { fom: opprinneligPlan[1].tidsperiode?.fom, tom: new Date('2020-01-12') },
                },
                {
                    ...opprinneligPlan[2],
                    tidsperiode: { fom: new Date('2020-01-13'), tom: opprinneligPlan[2].tidsperiode?.tom },
                },
            ];

            const endringstidspunkt = getEndringstidspunkt(opprinneligPlan as Periode[], endretPlan as Periode[], true);
            expect(endringstidspunkt).toEqual(endretPlan[2].tidsperiode?.fom);
        });

        it('Hvis en periode med periode uten uttak foran får tidligere startdato, skal endringstidspunktet være lik den nye startdatoen.', () => {
            const nyPeriodeUtenUttak = {
                ...opprinneligPlanMedHull[2],
                tidsperiode: { fom: opprinneligPlanMedHull[2].tidsperiode.fom, tom: new Date('2022-12-26') },
            };
            const nyFom = new Date('2022-12-27');
            const nyUttaksperiodePeriodeMedTidligStart = {
                ...opprinneligPlanMedHull[3],
                tidsperiode: { fom: nyFom, tom: opprinneligPlanMedHull[3].tidsperiode.tom },
            };
            const endretPlanMedHull = [
                opprinneligPlanMedHull[0],
                opprinneligPlanMedHull[1],
                nyPeriodeUtenUttak,
                nyUttaksperiodePeriodeMedTidligStart,
                opprinneligPlanMedHull[4],
                opprinneligPlanMedHull[5],
            ];

            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlanMedHull as Periode[],
                endretPlanMedHull as Periode[],
                true,
            );
            expect(endringstidspunkt).toEqual(nyFom);
        });

        it('Hvis en periode med periode uten uttak foran får senere startdato, skal endringstidspunktet være lik starten på perioden uten hull siden den er blitt lenger.', () => {
            const nyPeriodeUtenUttak = {
                ...opprinneligPlanMedHull[2],
                tidsperiode: { fom: opprinneligPlanMedHull[2].tidsperiode.fom, tom: new Date('2022-12-28') },
            };
            const nyFom = new Date('2022-12-29');
            const nyUttaksperiodePeriodeMedTidligStart = {
                ...opprinneligPlanMedHull[3],
                tidsperiode: { fom: nyFom, tom: opprinneligPlanMedHull[3].tidsperiode.tom },
            };
            const endretPlanMedHull = [
                opprinneligPlanMedHull[0],
                opprinneligPlanMedHull[1],
                nyPeriodeUtenUttak,
                nyUttaksperiodePeriodeMedTidligStart,
                opprinneligPlanMedHull[4],
                opprinneligPlanMedHull[5],
            ];

            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlanMedHull as Periode[],
                endretPlanMedHull as Periode[],
                true,
            );
            expect(endringstidspunkt).toEqual(nyPeriodeUtenUttak.tidsperiode.fom);
        });

        it('Hvis en periode med periode uten uttak bak får senere sluttdato, skal endringstidspunktet være lik starten på perioden siden den er blitt lenger.', () => {
            const nyPeriodeUttak = {
                ...opprinneligPlanMedHull[1],
                tidsperiode: { fom: opprinneligPlanMedHull[1].tidsperiode.fom, tom: new Date('2022-12-14') },
            };
            const nyFom = new Date('2022-12-15');
            const nyPeriodeUtenUttak = {
                ...opprinneligPlanMedHull[2],
                tidsperiode: { fom: nyFom, tom: opprinneligPlanMedHull[2].tidsperiode.tom },
            };
            const endretPlanMedHull = [
                opprinneligPlanMedHull[0],
                nyPeriodeUttak,
                nyPeriodeUtenUttak,
                opprinneligPlanMedHull[3],
                opprinneligPlanMedHull[4],
                opprinneligPlanMedHull[5],
            ];

            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlanMedHull as Periode[],
                endretPlanMedHull as Periode[],
                true,
            );
            expect(endringstidspunkt).toEqual(nyPeriodeUttak.tidsperiode.fom);
        });

        it('Hvis en periode i slutten av planen har fått tidligere sluttdato, skal starten på perioden være endringstidspunktet.', () => {
            const endretPlanMedForkortetSistePeriode = [
                opprinneligPlan[0],
                opprinneligPlan[1],
                {
                    ...opprinneligPlan[2],
                    tidsperiode: { ...opprinneligPlan[2].tidsperiode, tom: new Date('2020-04-30') },
                },
            ];

            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlan as Periode[],
                endretPlanMedForkortetSistePeriode as Periode[],
                true,
            );
            expect(endringstidspunkt).toEqual(endretPlanMedForkortetSistePeriode[2].tidsperiode?.fom);
        });

        it('Hvis en periode i slutten av planen har fått senere sluttdato, skal starten på perioden være endringstidspunktet.', () => {
            const endretPlanMedForkortetSistePeriode = [
                opprinneligPlan[0],
                opprinneligPlan[1],
                {
                    ...opprinneligPlan[2],
                    tidsperiode: { ...opprinneligPlan[2].tidsperiode, tom: new Date('2020-0-02') },
                },
            ];

            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlan as Periode[],
                endretPlanMedForkortetSistePeriode as Periode[],
                true,
            );
            expect(endringstidspunkt).toEqual(endretPlanMedForkortetSistePeriode[2].tidsperiode?.fom);
        });

        it('Hvis en periode med periode uten uttak bak får tidligere sluttdato, skal endringstidspunktet være lik starten på perioden uten uttak siden den er blitt lenger.', () => {
            const nyPeriodeUttak = {
                ...opprinneligPlanMedHull[1],
                tidsperiode: { fom: opprinneligPlanMedHull[1].tidsperiode.fom, tom: new Date('2022-12-12') },
            };
            const nyFom = new Date('2022-12-13');
            const nyPeriodeUtenUttak = {
                ...opprinneligPlanMedHull[2],
                tidsperiode: { fom: nyFom, tom: opprinneligPlanMedHull[2].tidsperiode.tom },
            };
            const endretPlanMedHull = [
                opprinneligPlanMedHull[0],
                nyPeriodeUttak,
                nyPeriodeUtenUttak,
                opprinneligPlanMedHull[3],
                opprinneligPlanMedHull[4],
                opprinneligPlanMedHull[5],
            ];

            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlanMedHull as Periode[],
                endretPlanMedHull as Periode[],
                true,
            );
            expect(endringstidspunkt).toEqual(nyPeriodeUtenUttak.tidsperiode.fom);
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

            expect(endringstidspunkt).toBe(hullPeriode.tidsperiode?.fom);
        });

        it('Hvis uttaksplanlogikken deler en periode skal endringstidspunkt være fra delingen og fremover ikke ta med tidligere del av perioden', () => {
            const deltPeriodeTidligereDel: Partial<Uttaksperiode> = {
                id: '7',
                tidsperiode: {
                    fom: new Date('2020-01-14'),
                    tom: new Date('2020-04-03'),
                },
                type: Periodetype.Uttak,
            };
            const periodeSomDeltePeriode: Partial<Utsettelsesperiode> = {
                id: '8',
                tidsperiode: {
                    fom: new Date('2020-04-06'),
                    tom: new Date('2020-04-17'),
                },
                type: Periodetype.Utsettelse,
                årsak: UtsettelseÅrsakType.Arbeid,
            };
            const deltPeriodeSenereDel: Partial<Uttaksperiode> = {
                id: '9',
                tidsperiode: {
                    fom: new Date('2020-04-20'),
                    tom: new Date('2020-05-04'),
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

            expect(endringstidspunkt).toBe(periodeSomDeltePeriode.tidsperiode?.fom);
        });
        it('Hvis annen parts uttak finnes i planen, skal endringstidspunktet bli riktig når bruker legger til en ny periode på slutten.', () => {
            const opprinneligPlanMedAnnenPart: Array<Partial<Periode>> = [
                {
                    id: '10',
                    tidsperiode: {
                        fom: new Date('2019-09-10'),
                        tom: new Date('2019-09-30'),
                    },
                    type: Periodetype.Uttak,
                },
                {
                    id: '11',
                    tidsperiode: {
                        fom: new Date('2019-09-10'),
                        tom: new Date('2019-09-30'),
                    },
                    type: Periodetype.Info,
                    overskrives: true,
                },
                {
                    id: '12',
                    tidsperiode: {
                        fom: new Date('2019-10-01'),
                        tom: new Date('2020-01-13'),
                    },
                    type: Periodetype.Uttak,
                },
            ];

            const endretPlanMedAnnenPart = [
                ...opprinneligPlanMedAnnenPart,
                {
                    id: '13',
                    tidsperiode: {
                        fom: new Date('2020-01-14'),
                        tom: new Date('2020-05-04'),
                    },
                    type: Periodetype.Uttak,
                },
            ];
            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlanMedAnnenPart as Periode[],
                endretPlanMedAnnenPart as Periode[],
                true,
            );

            expect(endringstidspunkt).toBe(endretPlanMedAnnenPart[3].tidsperiode?.fom);
        });

        it('Hvis annen parts uttak finnes i planen, bruker sletter opprinnelig plan og legger til ny periode i slutten, skal endringsdato være starten på den første av brukerens perioder i opprinnelig plan.', () => {
            const opprinneligPlanMedAnnenPart: Array<Partial<Periode>> = [
                {
                    id: '14',
                    tidsperiode: {
                        fom: new Date('2019-09-10'),
                        tom: new Date('2019-09-30'),
                    },
                    type: Periodetype.Info,
                    overskrives: true,
                },
                {
                    id: '15',
                    tidsperiode: {
                        fom: new Date('2019-10-01'),
                        tom: new Date('2020-01-13'),
                    },
                    type: Periodetype.Uttak,
                },
            ];

            const nyPlan = [
                {
                    id: '16',
                    tidsperiode: {
                        fom: new Date('2020-01-14'),
                        tom: new Date('2020-05-04'),
                    },
                    type: Periodetype.Uttak,
                },
            ];
            const endringstidspunkt = getEndringstidspunkt(
                opprinneligPlanMedAnnenPart as Periode[],
                nyPlan as Periode[],
                true,
            );

            expect(endringstidspunkt).toBe(opprinneligPlanMedAnnenPart[1].tidsperiode?.fom);
        });
    });
});

const førsteAugust2022 = '2022-08-01T00:00:00.000Z';
const førsteAugust2022Date = new Date(førsteAugust2022);
const andreAugust2022 = '2022-08-02T00:00:00.000Z';
const andreAugust2022Date = new Date(andreAugust2022);

describe('dateUtils - skal returnere at WLB regler ikke gjelder for dagens dato 1. august 2022', () => {
    beforeAll(() => {
        MockDate.set(førsteAugust2022);
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal returnere at WLB regler i prod ikke gjelder med familiehendelsesdato før 2. august 2022', () => {
        //Sjekk at dagens dato er riktig satt
        expect(new Date()).toEqual(førsteAugust2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(førsteAugust2022Date);
        expect(gjelderWLB).toEqual(false);
    });
    it('skal returnere at WLB regler ikke gjelder med familiehendelsesdato etter 2. august 2022', () => {
        expect(new Date()).toEqual(førsteAugust2022Date);
        const gjelderWLB = andreAugust2022ReglerGjelder(andreAugust2022Date);

        expect(gjelderWLB).toEqual(false);
    });
});

describe('dateUtils - WLB regler for dagens dato fom 2. august 2022', () => {
    beforeAll(() => {
        MockDate.set(andreAugust2022);
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal returnere at WLB regler i prod ikke gjelder med familiehendelsesdato før 2. august 2022', () => {
        //Sjekk at dagens dato er riktig satt
        expect(new Date()).toEqual(andreAugust2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(førsteAugust2022Date);
        expect(gjelderWLB).toEqual(false);
    });
    it('skal returnere at WLB regler i prod gjelder med familiehendelsesdato etter 2. august 2022', () => {
        expect(new Date()).toEqual(andreAugust2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(andreAugust2022Date);
        expect(gjelderWLB).toEqual(true);
    });
});

describe('To tette - WLB i prod', () => {
    it('Skal returnere at to tette regler ikke gjelder hvis første barnet sin familihendelse dato er undefined', () => {
        const result = getToTetteReglerGjelder(undefined, '2023-01-01');
        expect(result).toEqual(false);
    });
    it('Skal returnere at to tette regler ikke gjelder hvis det andre barnet sin familihendelse dato er undefined', () => {
        const result = getToTetteReglerGjelder('2022-08-02', undefined);
        expect(result).toEqual(false);
    });
    it('Skal returnere at to tette regler ikke gjelder hvis første barnet er født før 2 august 2022', () => {
        const result = getToTetteReglerGjelder('2022-08-01', '2022-08-02');
        expect(result).toEqual(false);
    });
    it('Skal returnere at to tette regler ikke gjelder hvis andre barnet er født før 2 august 2022', () => {
        const result = getToTetteReglerGjelder('2022-08-02', '2022-08-01');
        expect(result).toEqual(false);
    });

    it('Skal returnere at to tette regler gjelder hvis begge barna er født etter 2 august 2022 og det er mindre enn 48 uker mellom barna', () => {
        const result = getToTetteReglerGjelder('2023-01-02', '2023-12-03');
        expect(result).toEqual(true);
    });
    it('Skal returnere at to tette regler ikke gjelder hvis det er mer enn 48 uker mellom barna', () => {
        const result = getToTetteReglerGjelder('2023-01-02', '2023-12-04');
        expect(result).toEqual(false);
    });
    it('Skal returnere at to tette regler ikke gjelder hvis det er akkurat 48 uker mellom barna', () => {
        const result = getToTetteReglerGjelder('2023-01-02', '2023-12-05');
        expect(result).toEqual(false);
    });
});

describe('tidperiodeOverlapperDato', () => {
    it('Skal returnere at tidsperiode overlapper dato hvis starter før dato', () => {
        const tidsperiode = { fom: new Date('2023-11-20'), tom: new Date('2023-11-30') };
        const result = tidperiodeOverlapperDato(tidsperiode, new Date('2023-11-21'));
        expect(result).toEqual(true);
    });
    it('Skal returnere at tidsperiode ikke overlapper dato hvis starter samme dag som dato', () => {
        const tidsperiode = { fom: new Date('2023-11-20'), tom: new Date('2023-11-30') };
        const result = tidperiodeOverlapperDato(tidsperiode, new Date('2023-11-20'));
        expect(result).toEqual(false);
    });
    it('Skal returnere at tidsperiode overlapper dato hvis slutter på dato', () => {
        const tidsperiode = { fom: new Date('2023-11-20'), tom: new Date('2023-11-30') };
        const result = tidperiodeOverlapperDato(tidsperiode, new Date('2023-11-30'));
        expect(result).toEqual(true);
    });
    it('Skal returnere at tidsperiode ikke overlapper dato hvis slutter før dato', () => {
        const tidsperiode = { fom: new Date('2023-11-20'), tom: new Date('2023-11-29') };
        const result = tidperiodeOverlapperDato(tidsperiode, new Date('2023-11-30'));
        expect(result).toEqual(false);
    });
});

describe('getEldsteDato', () => {
    it('Skal returnere eldste dato riktig.', () => {
        const datoListe = [
            new Date('2023-10-21'),
            new Date('2023-11-21'),
            new Date('2021-11-21'),
            new Date('2021-11-20'),
            new Date('2021-12-20'),
        ];
        const result = getEldsteDato(datoListe);
        expect(result).toEqual('2021-11-20');
    });
});

describe('sorterDatoEtterEldst', () => {
    it('Skal sortere dato riktig', () => {
        const datoListe = [
            ISOStringToDate('2021-11-21')!,
            ISOStringToDate('2021-11-19')!,
            ISOStringToDate('2021-11-20')!,
        ];
        const result = sorterDatoEtterEldst(datoListe);
        expect(result.length).toBe(3);
        expect(result[0]).toEqual('2021-11-19');
        expect(result[1]).toEqual('2021-11-20');
        expect(result[2]).toEqual('2021-11-21');
    });
});

describe('1 juli 2024 regler', () => {
    const barnTermin18Juni2024 = {
        type: BarnType.UFØDT,
        termindato: '2024-06-18',
    } as Barn;
    it('skal returnere at 1 juli 2024 regler gjelder i dev den 18. juni 2024 for barn med termin 18. juni 2024', () => {
        MockDate.set(new Date('2024-06-18'));
        fns.isFeatureEnabled = vitest.fn(() => true);
        //Sjekk at dagens dato er riktig satt
        expect(førsteJuli2024ReglerGjelder(barnTermin18Juni2024)).toEqual(true);
        MockDate.reset();
    });
    it('skal returnere at 1 juli 2024 regler ikke gjelder i dev den 17. juni 2024 for barn med termin 18. juni 2024', () => {
        MockDate.set(new Date('2024-06-17'));
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-06-17'));
        fns.isFeatureEnabled = vitest.fn(() => true);
        //Sjekk at dagens dato er riktig satt
        expect(førsteJuli2024ReglerGjelder(barnTermin18Juni2024)).toEqual(false);
        MockDate.reset();
    });
    const barnTermin01Juli2024 = {
        type: BarnType.UFØDT,
        termindato: '2024-07-01',
    } as Barn;
    it('skal returnere at 1 juli 2024 regler gjelder i prod 1. juli 2024 for barn med termin 1. juli 2024', () => {
        MockDate.set(new Date('2024-07-01'));
        fns.isFeatureEnabled = vitest.fn(() => false);
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-07-01'));
        expect(førsteJuli2024ReglerGjelder(barnTermin01Juli2024)).toEqual(true);
        MockDate.reset();
    });
    it('skal returnere at 1 juli 2024 regler ikke gjelder i prod 30. juni 2024  for barn med termin 1. juli 2024', () => {
        MockDate.set(new Date('2024-06-30'));
        fns.isFeatureEnabled = vitest.fn(() => false);
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-06-30'));
        expect(førsteJuli2024ReglerGjelder(barnTermin01Juli2024)).toEqual(false);
        MockDate.reset();
    });
    it('skal returnere at 1 juli 2024 ikke regler ikke gjelder i prod 01. juli 2024 for barn født før 1 juli 2024', () => {
        const fødtBarn = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-06-30'],
            termindato: '2024-07-01',
        } as Barn;
        MockDate.set(new Date('2024-07-01'));
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-07-01'));
        fns.isFeatureEnabled = vitest.fn(() => false);
        expect(førsteJuli2024ReglerGjelder(fødtBarn)).toEqual(false);
        MockDate.reset();
    });
});
