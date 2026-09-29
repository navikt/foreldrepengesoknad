import { Uttaksplanperiode, erPeriodeDto } from '../../types/UttaksplanPeriode';
import { mapUttaksplanperioderTilRaderIListe } from './mapUttaksplanperioderTilRaderIListe';

const perioder1: Uttaksplanperiode[] = [
    {
        fom: '2024-04-12',
        tom: '2024-05-02',
        søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
    },
    {
        fom: '2024-05-03',
        tom: '2024-08-15',
        søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
    },
    {
        fom: '2024-08-16',
        tom: '2024-09-26',
        søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
    },
    {
        fom: '2024-09-27',
        tom: '2024-10-10',
        type: 'PERIODE_UTEN_UTTAK',
    },
    {
        fom: '2024-10-11',
        tom: '2024-10-24',
        søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
    },
];

describe('Skal gruppere perioder på søker og ikke kvote', () => {
    it('Skal gruppere mors perioder i tid hun er hjemme uavbrutt og ikke kvoter', () => {
        const uttaksplanperioderPerRadIListe = mapUttaksplanperioderTilRaderIListe(perioder1, '2024-05-03');

        expect(uttaksplanperioderPerRadIListe.length).toBe(4);

        const periode1 = erPeriodeDto(uttaksplanperioderPerRadIListe[0]![0]!)
            ? uttaksplanperioderPerRadIListe[0]![0]
            : undefined;
        expect(periode1?.søker?.forelder).toEqual('MOR');

        const periode2 = erPeriodeDto(uttaksplanperioderPerRadIListe[1]![0]!)
            ? uttaksplanperioderPerRadIListe[1]![0]
            : undefined;
        expect(periode2?.søker?.forelder).toEqual('MOR');

        const periode3 = erPeriodeDto(uttaksplanperioderPerRadIListe[2]![0]!)
            ? uttaksplanperioderPerRadIListe[2]![0]
            : undefined;
        expect(periode3?.søker?.forelder).toEqual(undefined);

        const periode4 = erPeriodeDto(uttaksplanperioderPerRadIListe[3]![0]!)
            ? uttaksplanperioderPerRadIListe[3]![0]
            : undefined;
        expect(periode4?.søker?.forelder).toEqual('MOR');
    });

    it('Skal ikke gruppere avslått og innvilget periode på samme rad', () => {
        const perioder: Uttaksplanperiode[] = [
            {
                fom: '2024-05-03',
                tom: '2024-05-16',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
            {
                fom: '2024-05-17',
                tom: '2024-05-30',
                søker: {
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                    flerbarnsdager: false,
                    resultat: { innvilget: false, trekkerMinsterett: false, trekkerDager: false, årsak: 'ANNET' },
                },
            },
            {
                fom: '2024-05-31',
                tom: '2024-06-13',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ];

        const uttaksplanperioderPerRadIListe = mapUttaksplanperioderTilRaderIListe(perioder, '2024-05-03');

        expect(uttaksplanperioderPerRadIListe).toHaveLength(3);
        expect(uttaksplanperioderPerRadIListe[0]).toHaveLength(1);
        expect(uttaksplanperioderPerRadIListe[1]).toHaveLength(1);
        expect(uttaksplanperioderPerRadIListe[2]).toHaveLength(1);
    });
});
