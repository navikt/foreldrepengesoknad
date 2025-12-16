import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { Uttaksplanbuilder } from './Uttaksplanbuilder';

const perioder: Planperiode[] = [
    {
        erAnnenPartEøs: false,
        fom: '2022-04-11',
        tom: '2022-04-29',
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-05-02',
        tom: '2022-08-12',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-08-15',
        tom: '2022-10-07',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
    },
];

const perioderMedToPerioderFørFødsel: Planperiode[] = [
    {
        erAnnenPartEøs: false,
        fom: '2021-12-06',
        tom: '2021-12-15',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2021-12-16',
        tom: '2022-01-05',
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-01-06',
        tom: '2022-05-18',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-05-19',
        tom: '2022-07-01',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-07-04',
        tom: '2022-07-15',
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-07-18',
        tom: '2022-09-23',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
    },
];

const perioderMedAnnenPartsUttakOgUtsettelserISlutten: Planperiode[] = [
    {
        erAnnenPartEøs: false,
        fom: '2021-08-18',
        tom: '2021-09-03',
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
    },
    {
        erAnnenPartEøs: false,
        fom: '2021-09-06',
        tom: '2021-09-10',
        forelder: 'MOR',
        utsettelseÅrsak: 'ARBEID',
    },
    {
        erAnnenPartEøs: false,
        fom: '2021-09-13',
        tom: '2021-12-10',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2021-12-13',
        tom: '2021-12-31',
        forelder: 'MOR',
        utsettelseÅrsak: 'ARBEID',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-01-03',
        tom: '2022-01-07',
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-01-10',
        tom: '2022-04-29',
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-05-02',
        tom: '2022-05-10',
        forelder: 'FAR_MEDMOR',
        utsettelseÅrsak: 'ARBEID',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-05-11',
        tom: '2022-07-08',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-07-11',
        tom: '2022-07-29',
        utsettelseÅrsak: 'ARBEID',
        forelder: 'FAR_MEDMOR',
    },
    {
        erAnnenPartEøs: false,
        fom: '2022-08-01',
        tom: '2022-09-13',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
    },
];

describe('Uttaksplanbuilder tester', () => {
    it('Å legge til en utsettelse skal ikke forskyve en annen utsettelse', () => {
        const nyPeriode: Planperiode = {
            erAnnenPartEøs: false,
            fom: '2022-08-15',
            tom: '2022-08-26',
            forelder: 'MOR',
            utsettelseÅrsak: 'ARBEID',
        };

        const result = Uttaksplanbuilder({
            perioder,
            familiehendelsedato: '2022-05-02',
            harAktivitetskravIPeriodeUtenUttak: false,
            gjelderAdopsjon: false,
            bareFarMedmorHarRett: false,
            erSøkerFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
            erDeltUttak: true,
        }).leggTilPeriode(nyPeriode);
        expect(result.length).toBe(4);
        expect(result[2]!).toEqual(nyPeriode);

        const nyPeriode2: Planperiode = {
            erAnnenPartEøs: false,
            fom: '2022-05-23',
            tom: '2022-05-27',
            forelder: 'MOR',
            utsettelseÅrsak: 'ARBEID',
        };

        const result2 = Uttaksplanbuilder({
            perioder: result,
            familiehendelsedato: '2022-05-02',
            harAktivitetskravIPeriodeUtenUttak: false,
            gjelderAdopsjon: false,
            bareFarMedmorHarRett: false,
            erSøkerFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
            erDeltUttak: true,
        }).leggTilPeriode(nyPeriode2);

        expect(result2.length).toBe(6);
        expect(result2[2]!).toEqual(nyPeriode2);
        expect(result2[4]!).toEqual(nyPeriode);
        expect(result2[4]!.fom).toEqual('2022-08-15');
        expect(result2[4]!.tom).toEqual('2022-08-26');
    });

    it('Skal fungere med to perioder før fødsel i uttaksplan når man legger til en periode på slutten', () => {
        const nyPeriodeISluttenAvPlanen: Planperiode = {
            erAnnenPartEøs: false,
            fom: '2022-10-26',
            tom: '2022-11-11',
            forelder: 'MOR',
            kontoType: 'MØDREKVOTE',
        };
        const result = Uttaksplanbuilder({
            perioder: perioderMedToPerioderFørFødsel,
            familiehendelsedato: '2022-01-06',
            harAktivitetskravIPeriodeUtenUttak: false,
            gjelderAdopsjon: false,
            bareFarMedmorHarRett: false,
            erSøkerFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
            erDeltUttak: true,
        }).leggTilPeriode(nyPeriodeISluttenAvPlanen);

        expect(result.length).toEqual(8);
        expect(result[0]!).toEqual(perioderMedToPerioderFørFødsel[0]!);
        expect(result[1]!).toEqual(perioderMedToPerioderFørFødsel[1]!);
        expect(result[2]!).toEqual(perioderMedToPerioderFørFødsel[2]!);
        expect(result[3]!).toEqual(perioderMedToPerioderFørFødsel[3]!);
        expect(result[4]!).toEqual(perioderMedToPerioderFørFødsel[4]!);
        expect(result[5]!).toEqual(perioderMedToPerioderFørFødsel[5]!);
        expect(result[6]!.fom).toEqual('2022-09-26');
        expect(result[6]!.tom).toEqual('2022-10-25');
        expect(result[7]).toEqual(nyPeriodeISluttenAvPlanen);
    });

    // eslint-disable-next-line vitest/no-focused-tests
    it.only(
        'I en endringssøknad (med opprinnelig plan), skal legge til utsettelse etter annen parts uttak når ' +
            'ingen overlap uten å påvirke de andre periodene',
        () => {
            const originaleTidsperiodePerioder = perioderMedAnnenPartsUttakOgUtsettelserISlutten.map((periode) => {
                return { fom: periode.fom, tom: periode.tom };
            });
            const nyUtsettelseISluttenAvPlanen: Planperiode = {
                erAnnenPartEøs: false,
                fom: '2022-09-14',
                tom: '2022-09-16',
                forelder: 'MOR',
                utsettelseÅrsak: 'ARBEID',
            };
            const result = Uttaksplanbuilder({
                perioder: perioderMedAnnenPartsUttakOgUtsettelserISlutten,
                familiehendelsedato: '2021-09-04',
                harAktivitetskravIPeriodeUtenUttak: false,
                gjelderAdopsjon: false,
                bareFarMedmorHarRett: false,
                erSøkerFarEllerMedmor: false,
                førsteUttaksdagNesteBarnsSak: undefined,
                erDeltUttak: true,
            }).leggTilPeriode(nyUtsettelseISluttenAvPlanen);

            expect(result.length).toEqual(11);
            perioderMedAnnenPartsUttakOgUtsettelserISlutten.forEach((p, index) => {
                const resultPeriode = result[index]!;
                const opprinneligPeriode = p;
                const opprinneligTidsperiode = originaleTidsperiodePerioder[index];
                expect({ fom: resultPeriode.fom, tom: resultPeriode.tom }).toEqual(opprinneligTidsperiode);
                expect(resultPeriode.erAnnenPartEøs).toEqual(opprinneligPeriode.erAnnenPartEøs);
                if (!resultPeriode.erAnnenPartEøs && !opprinneligPeriode.erAnnenPartEøs) {
                    // eslint-disable-next-line vitest/no-conditional-expect
                    expect(resultPeriode.forelder).toEqual(opprinneligPeriode.forelder);
                }
            });
            expect(result[10]).toEqual(nyUtsettelseISluttenAvPlanen);
        },
    );
});
