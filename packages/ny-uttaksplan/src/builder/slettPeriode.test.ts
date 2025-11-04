import MockDate from 'mockdate';

import { Forelder } from '@navikt/fp-constants';

import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { slettPeriode } from './slettPeriode';

const perioder: Planperiode[] = [
    {
        id: '1',
        fom: '2022-04-14',
        tom: '2022-05-04',
        forelder: Forelder.mor,
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        readOnly: false,
    },
    {
        id: '2',
        fom: '2022-05-05',
        tom: '2022-08-17',
        forelder: Forelder.mor,
        kontoType: 'MØDREKVOTE',
        readOnly: false,
    },
    {
        id: '3',
        fom: '2022-08-18',
        tom: '2022-10-12',
        forelder: Forelder.mor,
        kontoType: 'FELLESPERIODE',
        readOnly: false,
    },
];

const perioder2: Planperiode[] = [
    {
        id: '1',
        fom: '2022-05-11',
        tom: '2022-05-31',
        forelder: Forelder.mor,
        kontoType: 'FORELDREPENGER_FØR_FØDSEL',
        readOnly: false,
    },
    {
        id: '2',
        fom: '2022-06-01',
        tom: '2022-08-09',
        forelder: Forelder.mor,
        kontoType: 'MØDREKVOTE',
        readOnly: false,
    },
    {
        id: '3',
        fom: '2022-08-10',
        tom: '2022-08-23',
        forelder: Forelder.mor,
        kontoType: 'FELLESPERIODE',
        readOnly: false,
    },
    {
        id: '4',
        fom: '2022-08-24',
        tom: '2022-08-30',
        forelder: Forelder.mor,
        kontoType: 'MØDREKVOTE',
        readOnly: false,
    },
    {
        id: '5',
        fom: '2022-08-31',
        tom: '2022-10-12',
        forelder: Forelder.mor,
        kontoType: 'FELLESPERIODE',
        readOnly: false,
    },
];

describe('Test av slett periode', () => {
    it('Skal sette inn hull første seks uker og periode uten uttak etter', () => {
        const slettetPeriode = perioder[1];

        const result = slettPeriode({
            perioder,
            slettetPeriode,
            familiehendelsesdato: '2022-05-05',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(4);
        expect(result[1].fom).toEqual('2022-05-05');
        expect(result[1].tom).toEqual('2022-06-15');
        expect(result[1].periodeHullÅrsak).toEqual(PeriodeHullType.TAPTE_DAGER);
        expect(result[2].fom).toEqual('2022-06-16');
        expect(result[2].tom).toEqual('2022-08-17');
        expect(result[2].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
    });

    it('Skal sette inn periode uten uttak etter sletting', () => {
        const slettetPeriode = perioder2[3];

        const result = slettPeriode({
            perioder: perioder2,
            slettetPeriode,
            familiehendelsesdato: '2022-05-11',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: false,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[3].fom).toEqual(slettetPeriode.fom);
        expect(result[3].tom).toEqual(slettetPeriode.tom);
        expect(result[3].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
    });
});

const perioderFar: Planperiode[] = [
    {
        id: '1',
        fom: '2022-07-25',
        tom: '2022-08-01',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        readOnly: false,
    },
    {
        id: '2',
        fom: '2022-08-02',
        tom: '2022-08-08',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        readOnly: false,
    },
    {
        id: '3',
        fom: '2022-08-11',
        tom: '2022-09-11',
        periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
        readOnly: false,
    },
    {
        id: '4',
        fom: '2022-09-12',
        tom: '2022-09-19',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        readOnly: false,
    },
    {
        id: '5',
        fom: '2022-09-20',
        tom: '2022-10-25',
        forelder: 'FAR_MEDMOR',
        kontoType: 'FEDREKVOTE',
        readOnly: false,
    },
];

describe('Test av slett periode for far - etter WLB', () => {
    beforeAll(() => {
        MockDate.set('2022-08-02');
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal sette inn periode uten uttak hvis slettet periode er innenfor de første seks ukene.', () => {
        const slettetPeriode = perioderFar[1];

        const result = slettPeriode({
            perioder: perioderFar,
            slettetPeriode,
            familiehendelsesdato: '2022-08-02',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: true,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[1].fom).toEqual(slettetPeriode.fom);
        expect(result[1].tom).toEqual(slettetPeriode.tom);
        expect(result[1].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
    });

    it(
        'Skal sette inn periode uten uttak og hull (tapte dager) hvis slettet' +
            ' starter innenfor de første seks ukene men slutter etter de første seks ukene.',
        () => {
            const slettetPeriode = perioderFar[3];

            const result = slettPeriode({
                perioder: perioderFar,
                slettetPeriode,
                familiehendelsesdato: '2022-08-02',
                harAktivitetskravIPeriodeUtenUttak: false,
                erAdopsjon: false,
                bareFarHarRett: true,
                erFarEllerMedmor: true,
                førsteUttaksdagNesteBarnsSak: undefined,
            });

            expect(result.length).toEqual(6);
            expect(result[3].fom).toEqual(slettetPeriode.fom);
            expect(result[3].tom).toEqual('2022-09-12');
            expect(result[3].periodeHullÅrsak).toEqual(PeriodeHullType.PERIODE_UTEN_UTTAK);
            expect(result[4].fom).toEqual('2022-09-13');
            expect(result[4].tom).toEqual(slettetPeriode.tom);
            expect(result[4].periodeHullÅrsak).toEqual(PeriodeHullType.TAPTE_DAGER);
        },
    );
});

describe('Test av slett periode for far - før WLB', () => {
    beforeAll(() => {
        MockDate.set('2022-08-01');
    });

    afterAll(() => {
        MockDate.reset();
    });

    it('Skal sette inn hull (ubegrunnet opphold) hvis slettet periode er innenfor de første seks ukene og før WLB regler gjelder.', () => {
        const slettetPeriode = perioderFar[1];

        const result = slettPeriode({
            perioder: perioderFar,
            slettetPeriode,
            familiehendelsesdato: '2022-08-02',
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
            bareFarHarRett: false,
            erFarEllerMedmor: true,
            førsteUttaksdagNesteBarnsSak: undefined,
        });

        expect(result.length).toEqual(5);
        expect(result[1].fom).toEqual(slettetPeriode.fom);
        expect(result[1].tom).toEqual(slettetPeriode.tom);
        expect(result[1].periodeHullÅrsak).toEqual(PeriodeHullType.TAPTE_DAGER);
    });
});
