import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { createIntl, createIntlCache } from 'react-intl';

import { Barn, BarnType } from '@navikt/fp-common';
import { FpBarnDto_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import messages from '../intl/nb_NO.json';
import {
    førsteJuli2024ReglerGjelder,
    getEldsteRegistrerteBarn,
    getEndringstidspunktNy,
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
            //@ts-expect-error fiks
            messages,
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
        const opprinneligPlan: UttakPeriode_fpoversikt[] = [
            { fom: '2019-09-10', tom: '2019-09-30', flerbarnsdager: false, forelder: 'MOR' },
            { fom: '2019-10-01', tom: '2020-01-13', flerbarnsdager: false, forelder: 'MOR' },
            { fom: '2020-01-14', tom: '2020-05-01', flerbarnsdager: false, forelder: 'MOR' },
        ];

        const opprinneligPlanMedHull: UttakPeriode_fpoversikt[] = [
            { fom: '2022-09-21', tom: '2022-10-11', flerbarnsdager: false, forelder: 'MOR' },
            { fom: '2022-10-12', tom: '2022-12-13', flerbarnsdager: false, forelder: 'MOR' },
            { fom: '2022-12-14', tom: '2022-12-27', flerbarnsdager: false, forelder: 'MOR' },
            { fom: '2022-12-28', tom: '2023-01-30', flerbarnsdager: false, forelder: 'MOR' },
            { fom: '2023-01-31', tom: '2023-02-20', flerbarnsdager: false, forelder: 'MOR' },
            { fom: '2023-02-21', tom: '2023-02-27', flerbarnsdager: false, forelder: 'MOR' },
        ];

        it('Skal returnere undefined når planene er like og tomme', () => {
            const endringstidspunkt = getEndringstidspunktNy([], []);
            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal returnere undefined for ingen endringer', () => {
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, [...opprinneligPlan]);
            expect(endringstidspunkt).toBe(undefined);
        });

        it('Skal finne endringstidspunkt gitt at det er ny periode i slutten', () => {
            const gradertPeriode: UttakPeriode_fpoversikt = {
                fom: '2019-05-04',
                tom: '2019-05-11',
                flerbarnsdager: false,
                forelder: 'MOR',
                gradering: { arbeidstidprosent: 50 },
            };
            const endretPlan = [...opprinneligPlan, gradertPeriode];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(gradertPeriode.fom);
        });

        it('Hvis en ny periode legges til i slutten, skal starten på den første nye perioden være endringstidspunktet', () => {
            const endretPlan: UttakPeriode_fpoversikt[] = [
                ...opprinneligPlan,
                {
                    fom: '2020-05-02',
                    tom: '2020-05-09',
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
                {
                    fom: '2020-05-10',
                    tom: '2020-05-17',
                    flerbarnsdager: false,
                    forelder: 'MOR',
                },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(endretPlan[3]!.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er endret', () => {
            const endretPlan: UttakPeriode_fpoversikt[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, kontoType: 'FEDREKVOTE' },
                opprinneligPlan[2]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er slettet og erstattet med en annen periode', () => {
            const endretPlan: UttakPeriode_fpoversikt[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, oppholdÅrsak: 'MØDREKVOTE_ANNEN_FORELDER' },
                opprinneligPlan[2]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Skal finne endringstidspunkt gitt at en gammel periode er slettet og skaper hull', () => {
            const endretPlan: UttakPeriode_fpoversikt[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, oppholdÅrsak: 'FEDREKVOTE_ANNEN_FORELDER' },
                opprinneligPlan[2]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Skal finne endringstidspunkt gitt at en periode har fått senere sluttdato (blitt lenger)', () => {
            const endretPlan: UttakPeriode_fpoversikt[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, tom: '2020-01-14' },
                { ...opprinneligPlan[2]!, fom: '2020-01-15' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Skal finne endringstidspunkt gitt at en periode har fått tidligere sluttdato (blitt kortere)', () => {
            const endretPlan: UttakPeriode_fpoversikt[] = [
                opprinneligPlan[0]!,
                { ...opprinneligPlan[1]!, tom: '2020-01-12' },
                { ...opprinneligPlan[2]!, fom: '2020-01-13' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toEqual(opprinneligPlan[1]!.fom);
        });

        it('Hvis en periode får kortere sluttdato, skal endringstidspunktet være lik starten på den endrede perioden.', () => {
            const nyPeriode: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[2]!,
                tom: '2022-12-26',
            };
            const nyNestePeriode: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[3]!,
                fom: '2022-12-27',
            };
            const endretPlanMedHull: UttakPeriode_fpoversikt[] = [
                opprinneligPlanMedHull[0]!,
                opprinneligPlanMedHull[1]!,
                nyPeriode,
                nyNestePeriode,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toEqual(opprinneligPlanMedHull[2]!.fom);
        });

        it('Hvis en periode får lengre sluttdato, skal endringstidspunktet være lik starten på den endrede perioden.', () => {
            const nyPeriode: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[2]!,
                tom: '2022-12-28',
            };
            const nyNestePeriode: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[3]!,
                fom: '2022-12-29',
            };
            const endretPlanMedHull: UttakPeriode_fpoversikt[] = [
                opprinneligPlanMedHull[0]!,
                opprinneligPlanMedHull[1]!,
                nyPeriode,
                nyNestePeriode,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toEqual(nyPeriode.fom);
        });

        it('Hvis en foregående periode får lengre sluttdato, skal endringstidspunktet være lik starten på den endrede perioden.', () => {
            const nyPeriodeUttak: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[1]!,
                tom: '2022-12-14',
            };
            const nyPeriodeEtter: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[2]!,
                fom: '2022-12-15',
            };
            const endretPlanMedHull: UttakPeriode_fpoversikt[] = [
                opprinneligPlanMedHull[0]!,
                nyPeriodeUttak,
                nyPeriodeEtter,
                opprinneligPlanMedHull[3]!,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toEqual(nyPeriodeUttak.fom);
        });

        it('Hvis en periode i slutten av planen har fått tidligere sluttdato, skal starten på perioden være endringstidspunktet.', () => {
            const endretPlanMedForkortetSistePeriode: UttakPeriode_fpoversikt[] = [
                opprinneligPlan[0]!,
                opprinneligPlan[1]!,
                { ...opprinneligPlan[2]!, tom: '2020-04-30' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlanMedForkortetSistePeriode);
            expect(endringstidspunkt).toEqual(endretPlanMedForkortetSistePeriode[2]!.fom);
        });

        it('Hvis en periode i slutten av planen har fått senere sluttdato, skal starten på perioden være endringstidspunktet.', () => {
            const endretPlanMedForlengetSistePeriode: UttakPeriode_fpoversikt[] = [
                opprinneligPlan[0]!,
                opprinneligPlan[1]!,
                { ...opprinneligPlan[2]!, tom: '2020-06-02' },
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlanMedForlengetSistePeriode);
            expect(endringstidspunkt).toEqual(endretPlanMedForlengetSistePeriode[2]!.fom);
        });

        it('Hvis en foregående periode har fått kortere sluttdato, skal endringstidspunktet være lik starten på den endrede perioden.', () => {
            const nyPeriodeUttak: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[1]!,
                tom: '2022-12-12',
            };
            const nyPeriodeEtter: UttakPeriode_fpoversikt = {
                ...opprinneligPlanMedHull[2]!,
                fom: '2022-12-13',
            };
            const endretPlanMedHull: UttakPeriode_fpoversikt[] = [
                opprinneligPlanMedHull[0]!,
                nyPeriodeUttak,
                nyPeriodeEtter,
                opprinneligPlanMedHull[3]!,
                opprinneligPlanMedHull[4]!,
                opprinneligPlanMedHull[5]!,
            ];

            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedHull, endretPlanMedHull);
            expect(endringstidspunkt).toEqual(nyPeriodeUttak.fom);
        });

        it('Hvis en ny periode settes inn i starten av planen skal det telle som en endring', () => {
            const nyPeriode: UttakPeriode_fpoversikt = {
                fom: '2019-09-01',
                tom: '2019-09-09',
                flerbarnsdager: false,
                forelder: 'MOR',
            };
            const endretPlan = [nyPeriode, ...opprinneligPlan];
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toBe(nyPeriode.fom);
        });

        it('Hvis uttaksplanlogikken deler en periode skal endringstidspunkt være starten av den endrede perioden', () => {
            const deltPeriodeTidligereDel: UttakPeriode_fpoversikt = {
                fom: '2020-01-14',
                tom: '2020-04-03',
                flerbarnsdager: false,
                forelder: 'MOR',
            };
            const periodeSomDeltePeriode: UttakPeriode_fpoversikt = {
                fom: '2020-04-06',
                tom: '2020-04-17',
                flerbarnsdager: false,
                forelder: 'MOR',
                utsettelseÅrsak: 'ARBEID',
            };
            const deltPeriodeSenereDel: UttakPeriode_fpoversikt = {
                fom: '2020-04-20',
                tom: '2020-05-04',
                flerbarnsdager: false,
                forelder: 'MOR',
            };

            const endretPlan = [
                opprinneligPlan[0]!,
                opprinneligPlan[1]!,
                deltPeriodeTidligereDel,
                periodeSomDeltePeriode,
                deltPeriodeSenereDel,
            ];
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlan, endretPlan);
            expect(endringstidspunkt).toBe(deltPeriodeTidligereDel.fom);
        });

        it('Bruker legger til en ny periode på slutten, skal endringstidspunktet bli riktig.', () => {
            const opprinneligPlanMedAnnenPart: UttakPeriode_fpoversikt[] = [
                { fom: '2019-09-10', tom: '2019-09-30', flerbarnsdager: false, forelder: 'MOR' },
                { fom: '2019-10-01', tom: '2020-01-13', flerbarnsdager: false, forelder: 'MOR' },
            ];

            const endretPlanMedAnnenPart: UttakPeriode_fpoversikt[] = [
                ...opprinneligPlanMedAnnenPart,
                { fom: '2020-01-14', tom: '2020-05-04', flerbarnsdager: false, forelder: 'MOR' },
            ];
            const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedAnnenPart, endretPlanMedAnnenPart);
            expect(endringstidspunkt).toBe(endretPlanMedAnnenPart[2]!.fom);
        });

        it(
            'Bruker sletter opprinnelig plan og legger til ny periode,' +
                ' skal endringsdato være starten på den første perioden i opprinnelig plan.',
            () => {
                const opprinneligPlanMedAnnenPart: UttakPeriode_fpoversikt[] = [
                    { fom: '2019-10-01', tom: '2020-01-13', flerbarnsdager: false, forelder: 'MOR' },
                ];

                const nyPlan: UttakPeriode_fpoversikt[] = [
                    { fom: '2020-01-14', tom: '2020-05-04', flerbarnsdager: false, forelder: 'MOR' },
                ];
                const endringstidspunkt = getEndringstidspunktNy(opprinneligPlanMedAnnenPart, nyPlan);
                expect(endringstidspunkt).toBe(opprinneligPlanMedAnnenPart[0]!.fom);
            },
        );
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
        MockDate.set(dayjs('2024-06-18').toDate());
        const dateToday = dayjs();
        //Sjekk at dagens dato er riktig satt
        expect(dateToday).toEqual(dayjs('2024-06-18'));
        toggleUtils.isFeatureEnabled = vitest.fn(() => true);
        expect(førsteJuli2024ReglerGjelder(barnTermin18Juni2024)).toEqual(true);
        MockDate.reset();
    });
    it('skal returnere at 1 juli 2024 regler ikke gjelder i dev den 17. juni 2024 for barn med termin 18. juni 2024', () => {
        MockDate.set(dayjs('2024-06-17').toDate());
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-06-17'));
        toggleUtils.isFeatureEnabled = vitest.fn(() => true);
        expect(førsteJuli2024ReglerGjelder(barnTermin18Juni2024)).toEqual(false);
        MockDate.reset();
    });
    const barnTermin01Juli2024 = {
        type: BarnType.UFØDT,
        termindato: '2024-07-01',
    } as Barn;
    it('skal returnere at 1 juli 2024 regler gjelder i prod 1. juli 2024 for barn med termin 1. juli 2024', () => {
        MockDate.set(dayjs('2024-07-01').toDate());
        toggleUtils.isFeatureEnabled = vitest.fn(() => false);
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-07-01'));
        expect(førsteJuli2024ReglerGjelder(barnTermin01Juli2024)).toEqual(true);
        MockDate.reset();
    });
    it('skal returnere at 1 juli 2024 regler ikke gjelder i prod 30. juni 2024  for barn med termin 1. juli 2024', () => {
        MockDate.set(dayjs('2024-06-30').toDate());
        toggleUtils.isFeatureEnabled = vitest.fn(() => false);
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
        MockDate.set(dayjs('2024-07-01').toDate());
        const dateToday = dayjs();
        expect(dateToday).toEqual(dayjs('2024-07-01'));
        toggleUtils.isFeatureEnabled = vitest.fn(() => false);
        expect(førsteJuli2024ReglerGjelder(fødtBarn)).toEqual(false);
        MockDate.reset();
    });
});
