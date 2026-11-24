import dayjs from 'dayjs';
import { createIntl, createIntlCache } from 'react-intl';

import { BarnType } from '@navikt/fp-constants';
import { Barn, FpBarnDto_fpoversikt, UttakPeriodeDto } from '@navikt/fp-types';

import messages from '../intl/nb_NO.json';
import {
    førsteJuli2024ReglerGjelder,
    getEldsteRegistrerteBarn,
    getEndringstidspunktNy,
    getErDatoInnenEnDagFraAnnenDato,
    getRelevantFamiliehendelseDato,
    getUkerOgDagerFromDager,
    getVarighetString,
    sorterDatoEtterEldst,
} from './dateUtils';
import { toggleUtils } from './toggleUtils';

// Create the IntlProvider to retrieve context for wrapping around.
const cache = createIntlCache();

const getIntlMock = () => {
    return createIntl(
        {
            locale: 'nb',
            defaultLocale: 'nb',
            messages: messages as Record<string, string>,
        },
        cache,
    );
};

describe('dateUtils', () => {
    const intl = getIntlMock();

    beforeAll(() => {
        vi.setSystemTime('2021-07-08');
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    describe('getErDatoInnenEnDagFraAnnenDato', () => {
        it.each([
            ['2024-01-01', '2024-01-01', true],
            ['2024-01-01', '2024-01-02', true],
            ['2024-01-01', '2024-01-03', false],
            ['2024-07-01', '2024-07-03', false],
            ['2024-03-31', '2024-04-01', true],
            ['2024-03-30', '2024-04-01', false],
            ['2024-10-27', '2024-10-28', true],
            ['2024-10-26', '2024-10-28', false],
            ['2024-12-31', '2025-01-01', true],
            ['2024-02-28', '2024-03-01', false],
        ])('skal sammenligne %s og %s symmetrisk: %s', (dato1, dato2, forventet) => {
            expect(getErDatoInnenEnDagFraAnnenDato(dato1, dato2)).toBe(forventet);
            expect(getErDatoInnenEnDagFraAnnenDato(dato2, dato1)).toBe(forventet);
        });

        it('skal returnere false når en dato mangler', () => {
            expect(getErDatoInnenEnDagFraAnnenDato(undefined, '2024-01-01')).toBe(false);
            expect(getErDatoInnenEnDagFraAnnenDato('2024-01-01', undefined)).toBe(false);
        });
    });

    it('skal finne det eldste barnet', () => {
        const eldsteBarn: FpBarnDto_fpoversikt = {
            navn: {
                etternavn: 'test',
                fornavn: 'test',
            },
            fnr: '123123',
            fødselsdato: '2020-01-01',
            kjønn: 'K',
        };

        const yngsteBarn: FpBarnDto_fpoversikt = {
            navn: {
                etternavn: 'test',
                fornavn: 'test',
            },
            fnr: '234234',
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

    describe('getEndringstidspunktNy', () => {
        const opprinneligPlan: UttakPeriodeDto[] = [
            {
                fom: '2019-09-10',
                tom: '2019-09-30',
                søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL' },
            },
            {
                fom: '2019-10-01',
                tom: '2020-01-13',
                søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'MØDREKVOTE' },
            },
            {
                fom: '2020-01-14',
                tom: '2020-05-01',
                søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'FELLESPERIODE' },
            },
        ];

        const opprinneligPlanMedHull: UttakPeriodeDto[] = [
            { fom: '2022-09-21', tom: '2022-10-11', søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'MØDREKVOTE' } },
            { fom: '2022-10-12', tom: '2022-12-13', søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'FELLESPERIODE' } },
            { fom: '2022-12-14', tom: '2022-12-27', søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'MØDREKVOTE' } },
            { fom: '2022-12-28', tom: '2023-01-30', søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'FELLESPERIODE' } },
            { fom: '2023-01-31', tom: '2023-02-20', søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'MØDREKVOTE' } },
            { fom: '2023-02-21', tom: '2023-02-27', søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'FELLESPERIODE' } },
        ];

        it('Skal returnere undefined når planene er like og tomme', () => {
            const endringstidspunkt = getEndringstidspunktNy([], []);
            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal returnere undefined for ingen endringer', () => {
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, [...opprinneligPlan]);
            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal returnere undefined for en uendret gradert periode etter mellomlagring', () => {
            const gradertPlan: UttakPeriodeDto[] = [
                {
                    fom: '2019-09-10',
                    tom: '2019-09-30',
                    søker: {
                        flerbarnsdager: false,
                        forelder: 'MOR',
                        gradering: {
                            arbeidstidprosent: 50,
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: { id: '123456789', type: 'ORGANISASJON' },
                            },
                        },
                    },
                },
            ];
            const mellomlagretPlan = structuredClone(gradertPlan);

            expect(mellomlagretPlan[0]!.søker!.gradering).not.toBe(gradertPlan[0]!.søker!.gradering);
            expect(getEndringstidspunktNy(gradertPlan, mellomlagretPlan)).toBeUndefined();
        });

        it('Skal oppdage at arbeidsgiveren i en gradert periode er endret', () => {
            const opprinneligGradertPeriode: UttakPeriodeDto = {
                fom: '2019-09-10',
                tom: '2019-09-30',
                søker: {
                    flerbarnsdager: false,
                    forelder: 'MOR',
                    gradering: {
                        arbeidstidprosent: 50,
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: { id: '123456789', type: 'ORGANISASJON' },
                        },
                    },
                },
            };
            const endretGradertPeriode = structuredClone(opprinneligGradertPeriode);
            endretGradertPeriode.søker!.gradering!.aktivitet!.arbeidsgiver!.id = '987654321';

            expect(getEndringstidspunktNy([opprinneligGradertPeriode], [endretGradertPeriode])).toBe(
                opprinneligGradertPeriode.fom,
            );
        });

        it('Skal finne endringstidspunkt gitt at det er ny periode i slutten', () => {
            const gradertPeriode: UttakPeriodeDto = {
                fom: '2019-05-04',
                tom: '2019-05-11',
                søker: { flerbarnsdager: false, forelder: 'MOR', gradering: { arbeidstidprosent: 50 } },
            };
            const endretPlan = [...opprinneligPlan, gradertPeriode];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            // 2019-05-04 er lørdag, første ulike virkedag er mandag
            expect(endringstidspunkt).toBe('2019-05-06');
        });

        it('Hvis en ny periode legges til i slutten, skal første dag med ulikt uttak være endringstidspunktet', () => {
            const endretPlan: UttakPeriodeDto[] = [
                ...opprinneligPlan,
                { fom: '2020-05-02', tom: '2020-05-09', søker: { flerbarnsdager: false, forelder: 'MOR' } },
                { fom: '2020-05-10', tom: '2020-05-17', søker: { flerbarnsdager: false, forelder: 'MOR' } },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            // 2020-05-02 er lørdag, første ulike virkedag er mandag
            expect(endringstidspunkt).toBe('2020-05-04');
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er endret', () => {
            const endretPlan: UttakPeriodeDto[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, søker: { ...opprinneligPlan[1]!.søker!, kontoType: 'FEDREKVOTE' } },
                opprinneligPlan[2]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er slettet og erstattet med en annen periode', () => {
            const endretPlan: UttakPeriodeDto[] = [
                opprinneligPlan[0]!,
                {
                    fom: opprinneligPlan[1]!.fom,
                    tom: opprinneligPlan[1]!.tom,
                    annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
                },
                opprinneligPlan[2]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er slettet og skaper hull', () => {
            const endretPlan: UttakPeriodeDto[] = [
                opprinneligPlan[0]!,
                {
                    fom: opprinneligPlan[1]!.fom,
                    tom: opprinneligPlan[1]!.tom,
                    annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
                },
                opprinneligPlan[2]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Skal finne første dag med ulikt uttak når en periode har fått senere sluttdato (blitt lenger)', () => {
            const endretPlan: UttakPeriodeDto[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, tom: '2020-01-14' },
                { ...opprinneligPlan[2]!, fom: '2020-01-15' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toBe('2020-01-14');
        });

        it('Skal finne første dag med ulikt uttak når en periode har fått tidligere sluttdato (blitt kortere)', () => {
            const endretPlan: UttakPeriodeDto[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, tom: '2020-01-12' },
                { ...opprinneligPlan[2]!, fom: '2020-01-13' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toBe('2020-01-13');
        });

        it('Hvis en periode får kortere sluttdato, skal første dag med ulikt uttak brukes.', () => {
            const nyPeriode: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[2]!,
                tom: '2022-12-26',
            };
            const nyNestePeriode: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[3]!,
                fom: '2022-12-27',
            };
            const endretPlanMedHull: UttakPeriodeDto[] = [
                opprinneligPlanMedHull[0]!,
                opprinneligPlanMedHull[1]!,
                nyPeriode,
                nyNestePeriode,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toBe('2022-12-27');
        });

        it('Hvis en periode får lengre sluttdato, skal første dag med ulikt uttak brukes.', () => {
            const nyPeriode: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[2]!,
                tom: '2022-12-28',
            };
            const nyNestePeriode: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[3]!,
                fom: '2022-12-29',
            };
            const endretPlanMedHull: UttakPeriodeDto[] = [
                opprinneligPlanMedHull[0]!,
                opprinneligPlanMedHull[1]!,
                nyPeriode,
                nyNestePeriode,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toBe('2022-12-28');
        });

        it('Hvis en foregående periode får lengre sluttdato, skal første dag med ulikt uttak brukes.', () => {
            const nyPeriodeUttak: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[1]!,
                tom: '2022-12-14',
            };
            const nyPeriodeEtter: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[2]!,
                fom: '2022-12-15',
            };
            const endretPlanMedHull: UttakPeriodeDto[] = [
                opprinneligPlanMedHull[0]!,
                nyPeriodeUttak,
                nyPeriodeEtter,
                opprinneligPlanMedHull[3]!,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toBe('2022-12-14');
        });

        it('Hvis en periode i slutten av planen har fått tidligere sluttdato, skal første dag med ulikt uttak brukes.', () => {
            const endretPlanMedForkortetSistePeriode: UttakPeriodeDto[] = [
                opprinneligPlan[0]!,
                opprinneligPlan[1]!,
                { ...opprinneligPlan[2]!, tom: '2020-04-30' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlanMedForkortetSistePeriode);
            expect(endringstidspunkt).toBe('2020-05-01');
        });

        it('Hvis en periode i slutten av planen har fått senere sluttdato, skal første dag med ulikt uttak brukes.', () => {
            const endretPlanMedForlengetSistePeriode: UttakPeriodeDto[] = [
                opprinneligPlan[0]!,
                opprinneligPlan[1]!,
                { ...opprinneligPlan[2]!, tom: '2020-06-02' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlanMedForlengetSistePeriode);
            // 2020-05-02 er lørdag, første ulike virkedag er mandag
            expect(endringstidspunkt).toBe('2020-05-04');
        });

        it('Hvis en foregående periode har fått kortere sluttdato, skal første dag med ulikt uttak brukes.', () => {
            const nyPeriodeUttak: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[1]!,
                tom: '2022-12-12',
            };
            const nyPeriodeEtter: UttakPeriodeDto = {
                ...opprinneligPlanMedHull[2]!,
                fom: '2022-12-13',
            };
            const endretPlanMedHull: UttakPeriodeDto[] = [
                opprinneligPlanMedHull[0]!,
                nyPeriodeUttak,
                nyPeriodeEtter,
                opprinneligPlanMedHull[3]!,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toBe('2022-12-13');
        });

        it('Hvis en ny periode settes inn i starten av planen skal det telle som en endring', () => {
            const nyPeriode: UttakPeriodeDto = {
                fom: '2019-09-01',
                tom: '2019-09-09',
                søker: { flerbarnsdager: false, forelder: 'MOR' },
            };
            const endretPlan = [nyPeriode, ...opprinneligPlan];
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            // 2019-09-01 er søndag, første ulike virkedag er mandag
            expect(endringstidspunkt).toBe('2019-09-02');
        });

        it('Hvis uttaksplanlogikken deler en periode skal endringstidspunkt være første virkedag i den nye perioden', () => {
            const deltPeriodeTidligereDel: UttakPeriodeDto = {
                fom: '2020-01-14',
                tom: '2020-04-03',
                søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'FELLESPERIODE' },
            };
            const periodeSomDeltePeriode: UttakPeriodeDto = {
                fom: '2020-04-06',
                tom: '2020-04-17',
                søker: { flerbarnsdager: false, forelder: 'MOR', utsettelseÅrsak: 'ARBEID' },
            };
            const deltPeriodeSenereDel: UttakPeriodeDto = {
                fom: '2020-04-20',
                tom: '2020-05-04',
                søker: { flerbarnsdager: false, forelder: 'MOR', kontoType: 'FELLESPERIODE' },
            };

            const endretPlan = [
                opprinneligPlan[0]!,
                opprinneligPlan[1]!,
                deltPeriodeTidligereDel,
                periodeSomDeltePeriode,
                deltPeriodeSenereDel,
            ];
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toBe('2020-04-06');
        });

        const planMedSamtidigUttak: UttakPeriodeDto[] = [
            {
                fom: '2026-11-09',
                tom: '2026-11-20',
                annenPart: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'FORELDREPENGER_FØR_FØDSEL' },
            },
            {
                fom: '2026-11-23',
                tom: '2026-12-04',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    flerbarnsdager: false,
                    kontoType: 'FEDREKVOTE',
                    samtidigUttak: 100,
                },
                annenPart: {
                    forelder: 'MOR',
                    flerbarnsdager: false,
                    kontoType: 'MØDREKVOTE',
                    samtidigUttak: 100,
                },
            },
            {
                fom: '2026-12-07',
                tom: '2027-03-05',
                annenPart: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
            },
        ];

        it('fanger endret farsperiode inne i mors uttak', () => {
            const nyPlan: UttakPeriodeDto[] = [
                ...planMedSamtidigUttak.slice(0, 2),
                {
                    fom: '2026-12-07',
                    tom: '2027-02-12',
                    annenPart: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
                },
                {
                    fom: '2027-02-15',
                    tom: '2027-02-19',
                    søker: {
                        forelder: 'FAR_MEDMOR',
                        flerbarnsdager: false,
                        kontoType: 'FEDREKVOTE',
                        samtidigUttak: 50,
                    },
                    annenPart: {
                        forelder: 'MOR',
                        flerbarnsdager: false,
                        kontoType: 'MØDREKVOTE',
                        samtidigUttak: 50,
                    },
                },
                {
                    fom: '2027-02-22',
                    tom: '2027-03-05',
                    annenPart: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
                },
            ];

            expect(getEndringstidspunktNy(planMedSamtidigUttak, nyPlan)).toBe('2027-02-15');
        });

        it('ignorerer endring bare i annen parts periode', () => {
            const nyPlan: UttakPeriodeDto[] = [
                ...planMedSamtidigUttak.slice(0, 2),
                {
                    ...planMedSamtidigUttak[2]!,
                    annenPart: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'FELLESPERIODE' },
                },
            ];

            expect(getEndringstidspunktNy(planMedSamtidigUttak, nyPlan)).toBeUndefined();
        });

        it('fanger når søker fjerner sin del av samtidig uttak', () => {
            const nyPlan: UttakPeriodeDto[] = [
                planMedSamtidigUttak[0]!,
                {
                    fom: '2026-11-23',
                    tom: '2026-12-04',
                    annenPart: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
                },
                planMedSamtidigUttak[2]!,
            ];

            expect(getEndringstidspunktNy(planMedSamtidigUttak, nyPlan)).toBe('2026-11-23');
        });

        // Delte perioder dekker ikke helgen der de møtes (fredag til mandag). Helg teller ikke.
        it('ignorerer deling av lik søkerperiode, også når helgen mellom delene mangler', () => {
            const fedrekvoteMars: UttakPeriodeDto[] = [
                {
                    fom: '2027-03-01',
                    tom: '2027-03-31',
                    søker: { forelder: 'FAR_MEDMOR', flerbarnsdager: false, kontoType: 'FEDREKVOTE' },
                },
            ];
            const nyPlan: UttakPeriodeDto[] = [
                {
                    fom: '2027-03-01',
                    tom: '2027-03-12',
                    søker: { forelder: 'FAR_MEDMOR', flerbarnsdager: false, kontoType: 'FEDREKVOTE' },
                },
                {
                    fom: '2027-03-15',
                    tom: '2027-03-31',
                    søker: { forelder: 'FAR_MEDMOR', flerbarnsdager: false, kontoType: 'FEDREKVOTE' },
                },
            ];

            expect(getEndringstidspunktNy(fedrekvoteMars, nyPlan)).toBeUndefined();
        });

        it('fanger ferie lagt inn i søkerperiode', () => {
            const fedrekvoteMars: UttakPeriodeDto[] = [
                {
                    fom: '2027-03-01',
                    tom: '2027-03-31',
                    søker: { forelder: 'FAR_MEDMOR', flerbarnsdager: false, kontoType: 'FEDREKVOTE' },
                },
            ];
            const nyPlan: UttakPeriodeDto[] = [
                {
                    fom: '2027-03-01',
                    tom: '2027-03-07',
                    søker: { forelder: 'FAR_MEDMOR', flerbarnsdager: false, kontoType: 'FEDREKVOTE' },
                },
                {
                    fom: '2027-03-08',
                    tom: '2027-03-12',
                    søker: {
                        forelder: 'FAR_MEDMOR',
                        flerbarnsdager: false,
                        utsettelseÅrsak: 'FERIE',
                    },
                },
                {
                    fom: '2027-03-13',
                    tom: '2027-03-31',
                    søker: { forelder: 'FAR_MEDMOR', flerbarnsdager: false, kontoType: 'FEDREKVOTE' },
                },
            ];

            expect(getEndringstidspunktNy(fedrekvoteMars, nyPlan)).toBe('2027-03-08');
        });

        it('gir kun første endrede virkedag når vedtatt periode forlenges eller forkortes via skjema (resultat faller bort)', () => {
            const innvilgetResultat = {
                innvilget: true,
                trekkerDager: true,
                trekkerMinsterett: false,
                årsak: 'ANNET',
            } as const;
            const vedtattPlan: UttakPeriodeDto[] = [
                {
                    fom: '2026-01-05',
                    tom: '2026-04-30',
                    søker: {
                        forelder: 'MOR',
                        flerbarnsdager: false,
                        kontoType: 'FELLESPERIODE',
                        resultat: innvilgetResultat,
                    },
                },
            ];
            const forlengetISkjema: UttakPeriodeDto[] = [
                {
                    fom: '2026-01-05',
                    tom: '2026-05-29',
                    søker: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'FELLESPERIODE' },
                },
            ];
            const forkortetISkjema: UttakPeriodeDto[] = [
                {
                    fom: '2026-01-05',
                    tom: '2026-04-15',
                    søker: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'FELLESPERIODE' },
                },
            ];

            expect(getEndringstidspunktNy(vedtattPlan, forlengetISkjema)).toBe('2026-05-01');
            expect(getEndringstidspunktNy(vedtattPlan, forkortetISkjema)).toBe('2026-04-16');
        });

        it('ignorerer manglende arbeidsgiver.type og resultat når gradert vedtatt periode forlenges i skjema', () => {
            const vedtattGradertPlan: UttakPeriodeDto[] = [
                {
                    fom: '2026-03-02',
                    tom: '2026-03-27',
                    søker: {
                        forelder: 'MOR',
                        flerbarnsdager: false,
                        kontoType: 'MØDREKVOTE',
                        gradering: {
                            arbeidstidprosent: 50,
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: { id: '123456789', type: 'ORGANISASJON' },
                            },
                        },
                        resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
                    },
                },
            ];
            const forlengetGradertPlan: UttakPeriodeDto[] = [
                {
                    fom: '2026-03-02',
                    tom: '2026-04-10',
                    søker: {
                        forelder: 'MOR',
                        flerbarnsdager: false,
                        kontoType: 'MØDREKVOTE',
                        gradering: {
                            arbeidstidprosent: 50,
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: { id: '123456789' },
                            },
                        },
                    },
                },
            ];

            expect(getEndringstidspunktNy(vedtattGradertPlan, forlengetGradertPlan)).toBe('2026-03-30');
        });

        it('flytter ikke endringsdato tilbake til slettet avslått periode når bruker endrer en senere periode', () => {
            const avslåttJanuar: UttakPeriodeDto = {
                fom: '2026-01-05',
                tom: '2026-01-30',
                søker: {
                    forelder: 'MOR',
                    flerbarnsdager: false,
                    kontoType: 'FELLESPERIODE',
                    resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
                },
            };
            const opprinneligMedAvslag: UttakPeriodeDto[] = [
                avslåttJanuar,
                {
                    fom: '2026-02-02',
                    tom: '2026-02-27',
                    søker: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
                },
                {
                    fom: '2026-03-02',
                    tom: '2026-03-31',
                    søker: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
                },
            ];
            const nyUtenAvslåttJanuar: UttakPeriodeDto[] = [
                opprinneligMedAvslag[1]!,
                {
                    fom: '2026-03-02',
                    tom: '2026-03-31',
                    søker: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'FELLESPERIODE' },
                },
            ];

            expect(getEndringstidspunktNy(opprinneligMedAvslag, nyUtenAvslåttJanuar)).toBe('2026-03-02');
        });

        it('fanger opp at bruker søker på nytt om samme kontotype oppå en tidligere avslått periode', () => {
            const opprinneligMedAvslag: UttakPeriodeDto[] = [
                {
                    fom: '2026-03-02',
                    tom: '2026-03-27',
                    søker: {
                        forelder: 'MOR',
                        flerbarnsdager: false,
                        kontoType: 'MØDREKVOTE',
                        resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
                    },
                },
            ];
            const omsøktPåNytt: UttakPeriodeDto[] = [
                {
                    fom: '2026-03-02',
                    tom: '2026-03-27',
                    søker: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
                },
            ];

            expect(getEndringstidspunktNy(opprinneligMedAvslag, omsøktPåNytt)).toBe('2026-03-02');
        });

        it('Bruker legger til en ny periode på slutten, skal endringstidspunktet bli riktig.', () => {
            const opprinneligPlanMedAnnenPart: UttakPeriodeDto[] = [
                { fom: '2019-09-10', tom: '2019-09-30', søker: { flerbarnsdager: false, forelder: 'MOR' } },
                { fom: '2019-10-01', tom: '2020-01-13', søker: { flerbarnsdager: false, forelder: 'MOR' } },
            ];

            const endretPlanMedAnnenPart: UttakPeriodeDto[] = [
                ...opprinneligPlanMedAnnenPart,
                { fom: '2020-01-14', tom: '2020-05-04', søker: { flerbarnsdager: false, forelder: 'MOR' } },
            ];
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedAnnenPart, endretPlanMedAnnenPart);
            expect(endringstidspunkt).toBe(endretPlanMedAnnenPart[2]!.fom);
        });

        it(
            'Bruker sletter opprinnelig plan og legger til ny periode,' +
                ' skal endringsdato være starten på den første perioden i opprinnelig plan.',
            () => {
                const opprinneligPlanMedAnnenPart: UttakPeriodeDto[] = [
                    { fom: '2019-10-01', tom: '2020-01-13', søker: { flerbarnsdager: false, forelder: 'MOR' } },
                ];

                const nyPlan: UttakPeriodeDto[] = [
                    { fom: '2020-01-14', tom: '2020-05-04', søker: { flerbarnsdager: false, forelder: 'MOR' } },
                ];
                const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedAnnenPart, nyPlan);
                expect(endringstidspunkt).toBe(opprinneligPlanMedAnnenPart[0]!.fom);
            },
        );

        it('Skal finne endringstidspunkt når morsAktivitet endres fra undefined til en verdi (aktivitetskrav legges til)', () => {
            const opprinneligPlanUtenAktivitetskrav: UttakPeriodeDto[] = [
                {
                    fom: '2025-01-06',
                    tom: '2025-02-14',
                    søker: { flerbarnsdager: false, forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER' },
                },
                {
                    fom: '2025-02-17',
                    tom: '2025-03-10',
                    søker: { flerbarnsdager: false, forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER' },
                },
            ];

            const endretPlanMedAktivitetskrav: UttakPeriodeDto[] = [
                {
                    fom: '2025-01-06',
                    tom: '2025-02-14',
                    søker: { flerbarnsdager: false, forelder: 'FAR_MEDMOR', kontoType: 'FORELDREPENGER' },
                },
                {
                    fom: '2025-02-17',
                    tom: '2025-03-10',
                    søker: {
                        flerbarnsdager: false,
                        forelder: 'FAR_MEDMOR',
                        kontoType: 'FORELDREPENGER',
                        morsAktivitet: 'ARBEID',
                    },
                },
            ];

            const endringstidspunkt = getEndringstidspunktNy(
                opprinneligPlanUtenAktivitetskrav,
                endretPlanMedAktivitetskrav,
            );
            expect(endringstidspunkt).toBe('2025-02-17');
        });
    });
});

describe('sorterDatoEtterEldst', () => {
    it('Skal sortere dato riktig', () => {
        const datoListe = ['2021-11-21', '2021-11-19', '2021-11-20'];
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
        vi.setSystemTime(dayjs('2024-06-18').toDate());
        const dateToday = dayjs();
        //Sjekk at dagens dato er riktig satt
        expect(dateToday).toEqual(dayjs('2024-06-18'));
        toggleUtils.isFeatureEnabled = vitest.fn(() => true);
        expect(førsteJuli2024ReglerGjelder(barnTermin18Juni2024)).toEqual(true);
        vi.useRealTimers();
    });
    it('skal returnere at 1 juli 2024 regler ikke gjelder i dev den 17. juni 2024 for barn med termin 18. juni 2024', () => {
        vi.setSystemTime(dayjs('2024-06-17').toDate());
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-06-17'));
        toggleUtils.isFeatureEnabled = vitest.fn(() => true);
        expect(førsteJuli2024ReglerGjelder(barnTermin18Juni2024)).toEqual(false);
        vi.useRealTimers();
    });
    const barnTermin01Juli2024 = {
        type: BarnType.UFØDT,
        termindato: '2024-07-01',
    } as Barn;
    it('skal returnere at 1 juli 2024 regler gjelder i prod 1. juli 2024 for barn med termin 1. juli 2024', () => {
        vi.setSystemTime(dayjs('2024-07-01').toDate());
        toggleUtils.isFeatureEnabled = vitest.fn(() => false);
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-07-01'));
        expect(førsteJuli2024ReglerGjelder(barnTermin01Juli2024)).toEqual(true);
        vi.useRealTimers();
    });
    it('skal returnere at 1 juli 2024 regler ikke gjelder i prod 30. juni 2024  for barn med termin 1. juli 2024', () => {
        vi.setSystemTime(dayjs('2024-06-30').toDate());
        toggleUtils.isFeatureEnabled = vitest.fn(() => false);
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-06-30'));
        expect(førsteJuli2024ReglerGjelder(barnTermin01Juli2024)).toEqual(false);
        vi.useRealTimers();
    });
    it('skal returnere at 1 juli 2024 ikke regler ikke gjelder i prod 01. juli 2024 for barn født før 1 juli 2024', () => {
        const fødtBarn = {
            type: BarnType.FØDT,
            antallBarn: 1,
            fødselsdatoer: ['2024-06-30'],
            termindato: '2024-07-01',
        } as Barn;
        vi.setSystemTime(dayjs('2024-07-01').toDate());
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-07-01'));
        toggleUtils.isFeatureEnabled = vitest.fn(() => false);
        expect(førsteJuli2024ReglerGjelder(fødtBarn)).toEqual(false);
        vi.useRealTimers();
    });
});
