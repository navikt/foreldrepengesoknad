import { Forelder } from 'app/types/Forelder';
import { Periode, Periodetype, UttakAnnenPartInfoPeriode, Uttaksperiode } from 'uttaksplan/types/Periode';
import { PeriodeInfoType } from 'uttaksplan/types/PeriodeInfoType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { leggTilAnnenPartsPerioderISøkerenesUttaksplan } from 'app/steps/uttaksplan-info/utils/leggTilAnnenPartsPerioderISøkerensUttaksplan';

const familiehendelseDatoForMorsPerioderFørWLB = new Date('2021-08-04');
const familiehendelseDatoForMorsPerioderEtterWLB = new Date('2022-08-04');
const morsPerioderFørWLB: Periode[] = [
    {
        id: '1',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2021-07-19'),
            tom: new Date('2021-08-03'),
        },
        forelder: Forelder.mor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
        overskrives: true,
        visPeriodeIPlan: true,
    },
    {
        id: '2',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2021-08-04'),
            tom: new Date('2021-09-15'),
        },
        forelder: Forelder.mor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
        overskrives: true,
        visPeriodeIPlan: true,
    },
] as UttakAnnenPartInfoPeriode[];

const morsPerioderEtterWLB: UttakAnnenPartInfoPeriode[] = [
    {
        id: '1',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-07-18'),
            tom: new Date('2022-08-03'),
        },
        forelder: Forelder.mor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
        overskrives: true,
        visPeriodeIPlan: true,
    },
    {
        id: '2',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-08-04'),
            tom: new Date('2022-09-15'),
        },
        forelder: Forelder.mor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        årsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
        overskrives: true,
        visPeriodeIPlan: true,
    },
    {
        id: '3',
        type: Periodetype.Info,
        tidsperiode: {
            fom: new Date('2022-09-16'),
            tom: new Date('2022-09-20'),
        },
        forelder: Forelder.mor,
        infotype: PeriodeInfoType.uttakAnnenPart,
        årsak: OppholdÅrsakType.UttakFellesperiodeAnnenForelder,
        overskrives: true,
        visPeriodeIPlan: true,
    },
];

describe('farMedmorsFørstegangssøknadMedAnnenPartUtils - for saker før WLB', () => {
    it('skal legge til fars periode rett etter mors periode', () => {
        const farsNyePeriode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2021-09-16'),
                tom: new Date('2021-09-20'),
            },
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
        } as Periode;
        const nyPlan = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            morsPerioderFørWLB,
            [farsNyePeriode],
            familiehendelseDatoForMorsPerioderFørWLB,
            false,
            false,
            false,
            true,
            undefined
        );

        expect(nyPlan.length).toBe(3);
        expect(nyPlan[0]).toEqual(morsPerioderFørWLB[0]);
        expect(nyPlan[1]).toEqual(morsPerioderFørWLB[1]);
        expect(nyPlan[2]).toEqual(farsNyePeriode);
    });

    it('skal legge til fars periode noen dager etter mors periode riktig med tapte dager imellom', () => {
        const farsNyePeriode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2021-09-23'),
                tom: new Date('2021-09-30'),
            },
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
        } as Periode;
        const nyPlan = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            morsPerioderFørWLB,
            [farsNyePeriode],
            familiehendelseDatoForMorsPerioderFørWLB,
            false,
            false,
            false,
            true,
            undefined
        );

        expect(nyPlan.length).toBe(4);
        expect(nyPlan[0]).toEqual(morsPerioderFørWLB[0]);
        expect(nyPlan[1]).toEqual(morsPerioderFørWLB[1]);
        expect(nyPlan[2].type).toEqual(Periodetype.Hull);
        expect(nyPlan[3]).toEqual(farsNyePeriode);
    });
});

const omitId = (periode: Periode) => {
    const { id, ...rest } = periode;

    return rest;
};

describe('farMedmorsFørstegangssøknadMedAnnenPartUtils - for saker etter WLB', () => {
    it('skal legge til fars periode som overlapper med mors uttak etter fødsel', () => {
        const farsNyePeriode = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-08-04'),
                tom: new Date('2022-08-17'),
            },
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
            samtidigUttakProsent: '100',
            ønskerSamtidigUttak: true,
        } as Uttaksperiode;

        const nyPlan = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            morsPerioderEtterWLB,
            [farsNyePeriode],
            familiehendelseDatoForMorsPerioderEtterWLB,
            false,
            false,
            false,
            true,
            undefined
        );

        expect(nyPlan.length).toBe(5);
        expect(nyPlan[0]).toEqual(morsPerioderEtterWLB[0]);
        const morsPeriodeSplittetINyPlanDel1 = nyPlan[1] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeSplittetINyPlanDel1.tidsperiode.fom).toEqual(morsPerioderEtterWLB[1].tidsperiode.fom);
        expect(morsPeriodeSplittetINyPlanDel1.tidsperiode.tom).toEqual(farsNyePeriode.tidsperiode.tom);
        expect(morsPeriodeSplittetINyPlanDel1.type).toEqual(morsPerioderEtterWLB[1].type);
        expect(morsPeriodeSplittetINyPlanDel1.infotype).toEqual(morsPerioderEtterWLB[1].infotype);
        expect(morsPeriodeSplittetINyPlanDel1.forelder).toEqual(morsPerioderEtterWLB[1].forelder);
        expect(morsPeriodeSplittetINyPlanDel1.årsak).toEqual(morsPerioderEtterWLB[1].årsak);
        expect(omitId(nyPlan[2])).toEqual(omitId(farsNyePeriode));
        const morsPeriodeSplittetINyPlanDel2 = nyPlan[3] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeSplittetINyPlanDel2.tidsperiode.fom).toEqual(new Date('2022-08-18'));
        expect(morsPeriodeSplittetINyPlanDel2.tidsperiode.tom).toEqual(morsPerioderEtterWLB[1].tidsperiode.tom);
        expect(morsPeriodeSplittetINyPlanDel2.type).toEqual(morsPerioderEtterWLB[1].type);
        expect(morsPeriodeSplittetINyPlanDel2.infotype).toEqual(morsPerioderEtterWLB[1].infotype);
        expect(morsPeriodeSplittetINyPlanDel2.forelder).toEqual(morsPerioderEtterWLB[1].forelder);
        expect(morsPeriodeSplittetINyPlanDel2.årsak).toEqual(morsPerioderEtterWLB[1].årsak);
        expect(nyPlan[4]).toEqual(morsPerioderEtterWLB[2]);
    });
    it('skal legge til fars periode etter mors uttak ', () => {
        const farsNyePeriodeISluttenAvPlanen = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-09-21'),
                tom: new Date('2022-09-28'),
            },
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
        } as Uttaksperiode;

        const nyPlan = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            morsPerioderEtterWLB,
            [farsNyePeriodeISluttenAvPlanen],
            familiehendelseDatoForMorsPerioderEtterWLB,
            false,
            false,
            false,
            true,
            undefined
        );
        expect(nyPlan.length).toBe(4);
        expect(nyPlan[0]).toEqual(morsPerioderEtterWLB[0]);
        expect(nyPlan[1]).toEqual(morsPerioderEtterWLB[1]);
        expect(nyPlan[2]).toEqual(morsPerioderEtterWLB[2]);
        expect(nyPlan[3]).toEqual(farsNyePeriodeISluttenAvPlanen);
    });
    it('skal legge til fars periode som overlapper med midten av mors uttak de første 6 ukene etter fødsel', () => {
        const farNyPeriodeIMidtenAvMors6Uker = {
            id: '4',
            type: Periodetype.Uttak,
            tidsperiode: {
                fom: new Date('2022-08-29'),
                tom: new Date('2022-09-09'),
            },
            forelder: Forelder.farMedmor,
            konto: StønadskontoType.Fedrekvote,
            samtidigUttakProsent: '100',
            ønskerSamtidigUttak: true,
        } as Uttaksperiode;

        const nyPlan = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            morsPerioderEtterWLB,
            [farNyPeriodeIMidtenAvMors6Uker],
            familiehendelseDatoForMorsPerioderEtterWLB,
            false,
            false,
            false,
            true,
            undefined
        );
        expect(nyPlan.length).toBe(6);
        expect(nyPlan[0]).toEqual(morsPerioderEtterWLB[0]);
        const morsPeriodeSplittetINyPlanDel1 = nyPlan[1] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeSplittetINyPlanDel1.tidsperiode.fom).toEqual(morsPerioderEtterWLB[1].tidsperiode.fom);
        expect(morsPeriodeSplittetINyPlanDel1.tidsperiode.tom).toEqual(new Date('2022-08-26'));
        expect(morsPeriodeSplittetINyPlanDel1.type).toEqual(morsPerioderEtterWLB[1].type);
        expect(morsPeriodeSplittetINyPlanDel1.infotype).toEqual(morsPerioderEtterWLB[1].infotype);
        expect(morsPeriodeSplittetINyPlanDel1.forelder).toEqual(morsPerioderEtterWLB[1].forelder);
        expect(morsPeriodeSplittetINyPlanDel1.årsak).toEqual(morsPerioderEtterWLB[1].årsak);

        const morsPeriodeSplittetINyPlanDel2 = nyPlan[2] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeSplittetINyPlanDel2.tidsperiode.fom).toEqual(farNyPeriodeIMidtenAvMors6Uker.tidsperiode.fom);
        expect(morsPeriodeSplittetINyPlanDel2.tidsperiode.tom).toEqual(farNyPeriodeIMidtenAvMors6Uker.tidsperiode.tom);
        expect(morsPeriodeSplittetINyPlanDel2.type).toEqual(morsPerioderEtterWLB[1].type);
        expect(morsPeriodeSplittetINyPlanDel2.infotype).toEqual(morsPerioderEtterWLB[1].infotype);
        expect(morsPeriodeSplittetINyPlanDel2.forelder).toEqual(morsPerioderEtterWLB[1].forelder);
        expect(morsPeriodeSplittetINyPlanDel2.årsak).toEqual(morsPerioderEtterWLB[1].årsak);

        expect(nyPlan[3]).toEqual(farNyPeriodeIMidtenAvMors6Uker);

        const morsPeriodeSplittetINyPlanDel3 = nyPlan[4] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeSplittetINyPlanDel3.tidsperiode.fom).toEqual(new Date('2022-09-12'));
        expect(morsPeriodeSplittetINyPlanDel3.tidsperiode.tom).toEqual(morsPerioderEtterWLB[1].tidsperiode.tom);
        expect(morsPeriodeSplittetINyPlanDel3.type).toEqual(morsPerioderEtterWLB[1].type);
        expect(morsPeriodeSplittetINyPlanDel3.infotype).toEqual(morsPerioderEtterWLB[1].infotype);
        expect(morsPeriodeSplittetINyPlanDel3.forelder).toEqual(morsPerioderEtterWLB[1].forelder);
        expect(morsPeriodeSplittetINyPlanDel3.årsak).toEqual(morsPerioderEtterWLB[1].årsak);

        expect(nyPlan[5]).toEqual(morsPerioderEtterWLB[2]);
    });
    it('skal legge til fars periode som overlapper fødselsdatoen slik at de vises sammen med mors uttak', () => {
        const farsNyePerioderRundtFødsel: Uttaksperiode[] = [
            {
                id: '4',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2022-08-01'),
                    tom: new Date('2022-08-03'),
                },
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Fedrekvote,
                samtidigUttakProsent: '100',
                ønskerSamtidigUttak: true,
            },
            {
                id: '5',
                type: Periodetype.Uttak,
                tidsperiode: {
                    fom: new Date('2022-08-04'),
                    tom: new Date('2022-08-12'),
                },
                forelder: Forelder.farMedmor,
                konto: StønadskontoType.Fedrekvote,
                samtidigUttakProsent: '100',
                ønskerSamtidigUttak: true,
            },
        ];

        const nyPlan = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            morsPerioderEtterWLB,
            farsNyePerioderRundtFødsel,
            familiehendelseDatoForMorsPerioderEtterWLB,
            false,
            false,
            false,
            true,
            undefined
        );
        expect(nyPlan.length).toBe(7);
        const morsPeriodeFørFødselDel1 = nyPlan[0] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeFørFødselDel1.tidsperiode.fom).toEqual(morsPerioderEtterWLB[0].tidsperiode.fom);
        expect(morsPeriodeFørFødselDel1.tidsperiode.tom).toEqual(new Date('2022-07-29'));
        expect(morsPeriodeFørFødselDel1.type).toEqual(morsPerioderEtterWLB[0].type);
        expect(morsPeriodeFørFødselDel1.infotype).toEqual(morsPerioderEtterWLB[0].infotype);
        expect(morsPeriodeFørFødselDel1.forelder).toEqual(morsPerioderEtterWLB[0].forelder);
        expect(morsPeriodeFørFødselDel1.årsak).toEqual(morsPerioderEtterWLB[0].årsak);

        const morsPeriodeFørFødselDel2 = nyPlan[1] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeFørFødselDel2.tidsperiode.fom).toEqual(new Date('2022-08-01'));
        expect(morsPeriodeFørFødselDel2.tidsperiode.tom).toEqual(morsPerioderEtterWLB[0].tidsperiode.tom);
        expect(morsPeriodeFørFødselDel2.type).toEqual(morsPerioderEtterWLB[0].type);
        expect(morsPeriodeFørFødselDel2.infotype).toEqual(morsPerioderEtterWLB[0].infotype);
        expect(morsPeriodeFørFødselDel2.forelder).toEqual(morsPerioderEtterWLB[0].forelder);
        expect(morsPeriodeFørFødselDel2.årsak).toEqual(morsPerioderEtterWLB[0].årsak);

        expect(omitId(nyPlan[2])).toEqual(omitId(farsNyePerioderRundtFødsel[0]));

        const morsPeriodeEtterFødselDel1 = nyPlan[3] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeEtterFødselDel1.tidsperiode.fom).toEqual(morsPerioderEtterWLB[1].tidsperiode.fom);
        expect(morsPeriodeEtterFødselDel1.tidsperiode.tom).toEqual(new Date('2022-08-12'));
        expect(morsPeriodeEtterFødselDel1.type).toEqual(morsPerioderEtterWLB[1].type);
        expect(morsPeriodeEtterFødselDel1.infotype).toEqual(morsPerioderEtterWLB[1].infotype);
        expect(morsPeriodeEtterFødselDel1.forelder).toEqual(morsPerioderEtterWLB[1].forelder);
        expect(morsPeriodeEtterFødselDel1.årsak).toEqual(morsPerioderEtterWLB[1].årsak);

        expect(omitId(nyPlan[4])).toEqual(omitId(farsNyePerioderRundtFødsel[1]));

        const morsPeriodeEtterFødselDel2 = nyPlan[5] as UttakAnnenPartInfoPeriode;
        expect(morsPeriodeEtterFødselDel2.tidsperiode.fom).toEqual(new Date('2022-08-15'));
        expect(morsPeriodeEtterFødselDel2.tidsperiode.tom).toEqual(morsPerioderEtterWLB[1].tidsperiode.tom);
        expect(morsPeriodeEtterFødselDel2.type).toEqual(morsPerioderEtterWLB[1].type);
        expect(morsPeriodeEtterFødselDel2.infotype).toEqual(morsPerioderEtterWLB[1].infotype);
        expect(morsPeriodeEtterFødselDel2.forelder).toEqual(morsPerioderEtterWLB[1].forelder);
        expect(morsPeriodeEtterFødselDel2.årsak).toEqual(morsPerioderEtterWLB[1].årsak);

        expect(nyPlan[6]).toEqual(morsPerioderEtterWLB[2]);
    });
});
