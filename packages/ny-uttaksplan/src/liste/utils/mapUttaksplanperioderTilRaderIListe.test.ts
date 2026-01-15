import { Uttaksplanperiode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { mapUttaksplanperioderTilRaderIListe } from './mapUttaksplanperioderTilRaderIListe';

const perioder1: Uttaksplanperiode[] = [
    {
        forelder: 'MOR',
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        fom: '2024-04-12',
        tom: '2024-05-02',
    },
    {
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
        fom: '2024-05-03',
        tom: '2024-08-15',
    },
    {
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-08-16',
        tom: '2024-09-26',
    },
    {
        fom: '2024-09-27',
        tom: '2024-10-10',
        type: 'PERIODE_UTEN_UTTAK',
    },
    {
        forelder: 'MOR',
        kontoType: 'FELLESPERIODE',
        fom: '2024-10-11',
        tom: '2024-10-24',
    },
];

describe('Skal gruppere perioder på søker og ikke kvote', () => {
    it('Skal gruppere mors perioder i tid hun er hjemme uavbrutt og ikke kvoter', () => {
        const uttaksplanperioderPerRadIListe = mapUttaksplanperioderTilRaderIListe(perioder1, '2024-05-03');

        expect(uttaksplanperioderPerRadIListe.length).toBe(4);

        const periode1 = erVanligUttakPeriode(uttaksplanperioderPerRadIListe[0]![0]!)
            ? uttaksplanperioderPerRadIListe[0]![0]
            : undefined;
        expect(periode1?.forelder).toEqual('MOR');

        const periode2 = erVanligUttakPeriode(uttaksplanperioderPerRadIListe[1]![0]!)
            ? uttaksplanperioderPerRadIListe[1]![0]
            : undefined;
        expect(periode2?.forelder).toEqual('MOR');

        const periode3 = erVanligUttakPeriode(uttaksplanperioderPerRadIListe[2]![0]!)
            ? uttaksplanperioderPerRadIListe[2]![0]
            : undefined;
        expect(periode3?.forelder).toEqual(undefined);

        const periode4 = erVanligUttakPeriode(uttaksplanperioderPerRadIListe[3]![0]!)
            ? uttaksplanperioderPerRadIListe[3]![0]
            : undefined;
        expect(periode4?.forelder).toEqual('MOR');
    });
});
