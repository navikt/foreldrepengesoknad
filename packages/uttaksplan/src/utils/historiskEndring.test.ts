import { UttakDto, UttakPeriodeDto } from '@navikt/fp-types';

import { harHistoriskFerieEllerGraderingsendring, harHistoriskSletting } from './historiskEndring';

const uttak = (forelder: 'MOR' | 'FAR_MEDMOR', ekstra: Partial<UttakDto> = {}): UttakDto => ({
    forelder,
    flerbarnsdager: false,
    ...ekstra,
});
const ferie = { utsettelseÅrsak: 'FERIE' } as const;
const gradert = (arbeidstidprosent: number, aktivitet?: NonNullable<UttakDto['gradering']>['aktivitet']) => ({
    gradering: { arbeidstidprosent, aktivitet },
});
const periode = (fom: string, tom: string, søker?: UttakDto, annenPart?: UttakDto): UttakPeriodeDto => ({
    fom,
    tom,
    ...(søker && { søker }),
    ...(annenPart && { annenPart }),
});

type Tilfelle = {
    navn: string;
    før: UttakPeriodeDto[];
    etter: UttakPeriodeDto[];
    forventet: boolean;
    kanVelgeArbeidsgiver?: boolean;
    førsteDagIMåneden?: string;
};

describe('harHistoriskFerieEllerGraderingsendring', () => {
    it.each<Tilfelle>([
        {
            navn: 'ferie lagt til siste dag i forrige måned',
            før: [],
            etter: [periode('2026-09-30', '2026-09-30', uttak('MOR', ferie))],
            forventet: true,
        },
        {
            navn: 'ferie lagt til første dag i måneden',
            før: [],
            etter: [periode('2026-10-01', '2026-10-01', uttak('MOR', ferie))],
            forventet: false,
        },
        {
            navn: 'historisk ferie fjernet',
            før: [periode('2026-09-07', '2026-09-11', uttak('MOR', ferie))],
            etter: [],
            forventet: true,
        },
        {
            navn: 'uendret historisk ferie',
            før: [periode('2026-09-21', '2026-10-02', uttak('MOR', ferie))],
            etter: [periode('2026-09-21', '2026-10-02', uttak('MOR', ferie))],
            forventet: false,
        },
        {
            navn: 'historisk ferie forskjøvet utenfor direkte utvalg',
            før: [
                periode('2026-09-07', '2026-09-11', uttak('MOR')),
                periode('2026-09-14', '2026-09-18', uttak('MOR', ferie)),
            ],
            etter: [
                periode('2026-09-07', '2026-09-18', uttak('MOR')),
                periode('2026-09-21', '2026-09-25', uttak('MOR', ferie)),
            ],
            forventet: true,
        },
        {
            navn: 'gradering lagt til i hull',
            før: [periode('2026-09-07', '2026-09-11', uttak('MOR')), periode('2026-10-05', '2026-10-09', uttak('MOR'))],
            etter: [
                periode('2026-09-07', '2026-09-11', uttak('MOR')),
                periode('2026-09-14', '2026-09-18', uttak('MOR', gradert(50))),
                periode('2026-10-05', '2026-10-09', uttak('MOR')),
            ],
            forventet: true,
        },
        {
            navn: 'historisk gradering fjernet',
            før: [periode('2026-09-07', '2026-09-11', uttak('MOR', gradert(50)))],
            etter: [periode('2026-09-07', '2026-09-11', uttak('MOR'))],
            forventet: true,
        },
        {
            navn: 'historisk arbeidstidprosent endret',
            før: [periode('2026-09-07', '2026-10-02', uttak('MOR', gradert(50)))],
            etter: [periode('2026-09-07', '2026-10-02', uttak('MOR', gradert(60)))],
            forventet: true,
        },
        {
            navn: 'historisk gradering forskjøvet utenfor direkte utvalg',
            før: [
                periode('2026-09-07', '2026-09-11', uttak('MOR', gradert(50))),
                periode('2026-09-14', '2026-09-18', uttak('MOR')),
            ],
            etter: [
                periode('2026-09-07', '2026-09-11', uttak('MOR')),
                periode('2026-09-14', '2026-09-18', uttak('MOR', gradert(50))),
            ],
            forventet: true,
        },
        {
            navn: 'uendret historisk gradering forlenget inn i inneværende måned',
            før: [periode('2026-09-07', '2026-09-30', uttak('MOR', gradert(50)))],
            etter: [periode('2026-09-07', '2026-10-30', uttak('MOR', gradert(50)))],
            forventet: false,
        },
        {
            navn: 'gradering endret bare i inneværende måned',
            før: [periode('2026-10-05', '2026-10-30', uttak('MOR', gradert(50)))],
            etter: [periode('2026-10-05', '2026-10-30', uttak('MOR', gradert(60)))],
            forventet: false,
        },
        {
            navn: 'ugradert uttak lagt til i hull',
            før: [],
            etter: [periode('2026-09-14', '2026-09-18', uttak('MOR', { kontoType: 'MØDREKVOTE' }))],
            forventet: false,
        },
        {
            navn: 'rent kvotetypebytte',
            før: [periode('2026-09-07', '2026-10-02', uttak('MOR', { ...gradert(50), kontoType: 'MØDREKVOTE' }))],
            etter: [periode('2026-09-07', '2026-10-02', uttak('MOR', { ...gradert(50), kontoType: 'FELLESPERIODE' }))],
            forventet: false,
        },
        {
            navn: 'endret EØS-data',
            før: [{ fom: '2026-09-07', tom: '2026-10-02', annenPartEøs: { kontoType: 'FEDREKVOTE', trekkdager: 20 } }],
            etter: [
                { fom: '2026-09-07', tom: '2026-10-02', annenPartEøs: { kontoType: 'MØDREKVOTE', trekkdager: 10 } },
            ],
            forventet: false,
        },
        {
            navn: 'begge foreldre med uendret gradering i bytta felt',
            før: [periode('2026-09-07', '2026-10-02', uttak('MOR', gradert(50)), uttak('FAR_MEDMOR', gradert(40)))],
            etter: [periode('2026-09-07', '2026-10-02', uttak('FAR_MEDMOR', gradert(40)), uttak('MOR', gradert(50)))],
            forventet: false,
        },
        {
            navn: 'annen parts arbeidstidprosent endret',
            før: [periode('2026-09-07', '2026-10-02', uttak('MOR', gradert(50)), uttak('FAR_MEDMOR', gradert(40)))],
            etter: [periode('2026-09-07', '2026-10-02', uttak('MOR', gradert(50)), uttak('FAR_MEDMOR', gradert(60)))],
            forventet: true,
        },
        {
            navn: 'annen parts graderte uttak fjernet',
            før: [periode('2026-09-07', '2026-09-11', uttak('MOR', gradert(50)), uttak('FAR_MEDMOR', gradert(40)))],
            etter: [periode('2026-09-07', '2026-09-11', uttak('MOR', gradert(50)))],
            forventet: true,
        },
        {
            navn: 'annen parts aktivitet endret',
            før: [periode('2026-09-07', '2026-10-02', uttak('MOR'), uttak('FAR_MEDMOR', gradert(40)))],
            etter: [
                periode(
                    '2026-09-07',
                    '2026-10-02',
                    uttak('MOR'),
                    uttak('FAR_MEDMOR', gradert(40, { type: 'FRILANS' })),
                ),
            ],
            forventet: false,
        },
        {
            navn: 'manglende aktivitetstype endret til ANNET',
            før: [periode('2026-09-07', '2026-10-02', uttak('MOR', gradert(50)))],
            etter: [periode('2026-09-07', '2026-10-02', uttak('MOR', gradert(50, { type: 'ANNET' })))],
            forventet: false,
        },
        ...[true, false].map((kanVelgeArbeidsgiver) => ({
            navn: `arbeidsgiver endret når kanVelgeArbeidsgiver er ${kanVelgeArbeidsgiver}`,
            før: [
                periode(
                    '2026-09-07',
                    '2026-10-02',
                    uttak('MOR', gradert(50, { type: 'ORDINÆRT_ARBEID', arbeidsgiver: { id: '123' } })),
                ),
            ],
            etter: [
                periode(
                    '2026-09-07',
                    '2026-10-02',
                    uttak('MOR', gradert(50, { type: 'ORDINÆRT_ARBEID', arbeidsgiver: { id: '456' } })),
                ),
            ],
            forventet: kanVelgeArbeidsgiver,
            kanVelgeArbeidsgiver,
        })),
        ...[ferie, gradert(50)].flatMap((innhold) => [
            {
                navn: `lik ${JSON.stringify(innhold)} forlenget over helg fra fredag 30.10 til mandag 2.11`,
                før: [periode('2026-10-30', '2026-10-30', uttak('MOR', innhold))],
                etter: [periode('2026-10-30', '2026-11-02', uttak('MOR', innhold))],
                forventet: false,
                førsteDagIMåneden: '2026-11-01',
            },
            {
                navn: `${JSON.stringify(innhold)} fjernet fredag 30.10`,
                før: [periode('2026-10-30', '2026-10-30', uttak('MOR', innhold))],
                etter: [periode('2026-10-30', '2026-10-30', uttak('MOR'))],
                forventet: true,
                førsteDagIMåneden: '2026-11-01',
            },
        ]),
    ])(
        '$navn gir $forventet',
        ({ før, etter, forventet, kanVelgeArbeidsgiver = true, førsteDagIMåneden = '2026-10-01' }) => {
            expect(
                harHistoriskFerieEllerGraderingsendring(før, etter, 'MOR', kanVelgeArbeidsgiver, førsteDagIMåneden),
            ).toBe(forventet);
        },
    );
});

describe('harHistoriskSletting', () => {
    const avslått = uttak('MOR', {
        resultat: { innvilget: false, trekkerDager: false, trekkerMinsterett: false, årsak: 'ANNET' },
    });

    it.each([
        {
            navn: 'avslått historisk uttak',
            perioder: [periode('2026-09-07', '2026-09-30', avslått)],
            fom: '2026-09-14',
            tom: '2026-09-30',
            forventet: true,
        },
        {
            navn: 'utvalg i inneværende måned',
            perioder: [periode('2026-09-07', '2026-10-09', avslått)],
            fom: '2026-10-01',
            tom: '2026-10-09',
            forventet: false,
        },
        {
            navn: 'utvalg som slutter siste dag i forrige måned',
            perioder: [periode('2026-09-07', '2026-10-09', uttak('MOR'))],
            fom: '2026-09-30',
            tom: '2026-10-02',
            forventet: true,
        },
        {
            navn: 'utvalg utenfor perioden',
            perioder: [periode('2026-09-07', '2026-09-30', avslått)],
            fom: '2026-09-01',
            tom: '2026-09-04',
            forventet: false,
        },
        {
            navn: 'bare utvalget utenfor perioden er historisk',
            perioder: [periode('2026-10-01', '2026-10-16', uttak('MOR'))],
            fom: '2026-09-07',
            tom: '2026-10-16',
            forventet: false,
        },
        {
            navn: 'periode uten uttak',
            perioder: [
                {
                    fom: '2026-09-07',
                    tom: '2026-09-11',
                    annenPartEøs: { kontoType: 'FEDREKVOTE' as const, trekkdager: 5 },
                },
            ],
            fom: '2026-09-07',
            tom: '2026-09-11',
            forventet: false,
        },
    ])('$navn gir $forventet', ({ perioder, fom, tom, forventet }) => {
        expect(harHistoriskSletting(perioder, [{ fom, tom }], '2026-10-01')).toBe(forventet);
    });
});
