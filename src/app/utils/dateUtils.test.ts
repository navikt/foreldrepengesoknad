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
    andreAugust2022ReglerGjelder,
} from './dateUtils';

import getIntlMock from 'utils-test/intl-test-helper';
import { RegistrertBarn } from 'app/types/Person';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import { Periode, PeriodeHull, Periodetype, Utsettelsesperiode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { guid } from 'nav-frontend-js-utils';
import { UtsettelseÅrsakType } from 'uttaksplan/types/UtsettelseÅrsakType';
import fns from './toggleUtils';
import { TidsperiodeDate } from '@navikt/fp-common';

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

    const utsettelserTidsperioder = [] as TidsperiodeDate[];

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
                utsettelserTidsperioder,
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
                utsettelserTidsperioder,
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
                utsettelserTidsperioder,
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
                utsettelserTidsperioder,
            });

            expect(dato).toBe('Du må legge inn en til og med dato som er etter fra og med datoen.');
        });
        it('skal gi feilmelding når til-dato overlapper en utsettelsesperiode', () => {
            const date = new Date('2022-08-13');
            const minDate = new Date('2020-05-05');
            const maxDate = new Date('2023-05-11');
            const fromDate = new Date('2020-05-11');
            const utsettelserTidsperioder = [{ fom: new Date('2022-08-10'), tom: new Date('2022-08-15') }];

            const dato = dateRangeValidation.validateToDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                fromDate,
                disableWeekend: false,
                utsettelserTidsperioder,
            });

            expect(dato).toBe(
                'Du har en utsettelse fra 10.08.2022 til 15.08.2022 som overlapper med den valgte datoen. Du må endre på denne utsettelsen først.'
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
                utsettelserTidsperioder,
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
                utsettelserTidsperioder,
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
                utsettelserTidsperioder,
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
                utsettelserTidsperioder,
            });

            expect(dato).toBe('Du må legge inn en til og med dato som er etter fra og med datoen.');
        });
        it('skal gi feilmelding når fra-dato overlapper en utsettelsesperiode', () => {
            const date = new Date('2021-05-10');
            const minDate = new Date('2020-05-05');
            const maxDate = new Date('2023-05-11');
            const toDate = new Date('2021-05-11');
            const utsettelserTidsperioder = [
                { fom: new Date('2021-04-10'), tom: new Date('2021-04-12') },
                { fom: new Date('2021-05-01'), tom: new Date('2021-06-10') },
            ];

            const dato = dateRangeValidation.validateFromDateInRange({
                intl,
                date,
                minDate,
                maxDate,
                errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                toDate,
                disableWeekend: false,
                utsettelserTidsperioder,
            });

            expect(dato).toBe(
                'Du har en utsettelse fra 01.05.2021 til 10.06.2021 som overlapper med den valgte datoen. Du må endre på denne utsettelsen først.'
            );
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

const førsteAugust2022 = '2022-08-01T00:00:00.000Z';
const førsteAugust2022Date = new Date(førsteAugust2022);
const andreAugust2022 = '2022-08-02T00:00:00.000Z';
const andreAugust2022Date = new Date(andreAugust2022);

describe('dateUtils i prod - skal returnere at WLB regler ikke gjelder for dagens dato 1. august 2022', () => {
    beforeAll(() => {
        MockDate.set(førsteAugust2022);
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal returnere at WLB regler i prod ikke gjelder med familiehendelsesdato før 2. august 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => false);

        //Sjekk at dagens dato er riktig satt
        expect(new Date()).toEqual(førsteAugust2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(førsteAugust2022Date);
        expect(gjelderWLB).toEqual(false);
    });
    it('skal returnere at WLB regler i prod ikke gjelder med familiehendelsesdato etter 2. august 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => false);
        expect(new Date()).toEqual(førsteAugust2022Date);
        const gjelderWLB = andreAugust2022ReglerGjelder(andreAugust2022Date);

        expect(gjelderWLB).toEqual(false);
    });
});

describe('dateUtils i prod - WLB regler for dagens dato fom 2. august 2022', () => {
    beforeAll(() => {
        MockDate.set(andreAugust2022);
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal returnere at WLB regler i prod ikke gjelder med familiehendelsesdato før 2. august 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => false);

        //Sjekk at dagens dato er riktig satt
        expect(new Date()).toEqual(andreAugust2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(førsteAugust2022Date);
        expect(gjelderWLB).toEqual(false);
    });
    it('skal returnere at WLB regler i prod gjelder med familiehendelsesdato etter 2. august 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => false);
        expect(new Date()).toEqual(andreAugust2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(andreAugust2022Date);
        expect(gjelderWLB).toEqual(true);
    });
});

const trettiførsteDesember2021 = '2021-12-31T00:00:00.000Z';
const trettiførsteDesember2021Date = new Date(trettiførsteDesember2021);
const førsteJanuar2022 = '2022-01-01T00:00:00.000Z';
const førsteJanuar2022Date = new Date(førsteJanuar2022);

describe('dateUtils i dev - WLB regler i dev skal ikke sjekke på dagens dato. Test med dagens dato lik 31 desember 2021', () => {
    beforeAll(() => {
        MockDate.set(trettiførsteDesember2021);
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal returnere at WLB regler i dev ikke gjelder med familiehendelsesdato før 1. januar 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => true);

        //Sjekk at dagens dato er riktig satt
        expect(new Date()).toEqual(trettiførsteDesember2021Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(trettiførsteDesember2021Date);
        expect(gjelderWLB).toEqual(false);
    });
    it('skal returnere at WLB regler i dev gjelder med familiehendelsesdato fom. 1. januar 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => true);
        expect(new Date()).toEqual(trettiførsteDesember2021Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(førsteJanuar2022Date);
        expect(gjelderWLB).toEqual(true);
    });
});

describe('dateUtils i dev - WLB regler i dev skal ikke sjekke på dagens dato. Test med dagens dato lik 1. januar 2022', () => {
    beforeAll(() => {
        MockDate.set(førsteJanuar2022);
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('skal returnere at WLB regler i dev ikke gjelder med familiehendelsesdato før 1. januar 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => true);

        //Sjekk at dagens dato er riktig satt
        expect(new Date()).toEqual(førsteJanuar2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(trettiførsteDesember2021Date);
        expect(gjelderWLB).toEqual(false);
    });
    it('skal returnere at WLB regler i dev gjelder med familiehendelsesdato etter 1. januar 2022', () => {
        fns.isFeatureEnabled = jest.fn(() => true);
        expect(new Date()).toEqual(førsteJanuar2022Date);

        const gjelderWLB = andreAugust2022ReglerGjelder(førsteJanuar2022Date);
        expect(gjelderWLB).toEqual(true);
    });
});
