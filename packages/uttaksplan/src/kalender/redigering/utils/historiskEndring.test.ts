import { UttakPeriodeDto } from '@navikt/fp-types';

import {
    finnPerioderMedEndretGradering,
    harHistoriskFerieendring,
    harHistoriskGraderingsendring,
    harHistoriskSletting,
    harHistoriskeDatoer,
} from './historiskEndring';

const lagUttak = (
    forelder: 'MOR' | 'FAR_MEDMOR',
    arbeidstidprosent?: number,
    aktivitet?: { type?: 'ANNET' | 'FRILANS' | 'ORDINÆRT_ARBEID'; arbeidsgiverId?: string },
) => ({
    forelder,
    flerbarnsdager: false,
    gradering:
        arbeidstidprosent === undefined
            ? undefined
            : {
                  arbeidstidprosent,
                  aktivitet: aktivitet?.type
                      ? {
                            type: aktivitet.type,
                            arbeidsgiver: aktivitet.arbeidsgiverId ? { id: aktivitet.arbeidsgiverId } : undefined,
                        }
                      : undefined,
              },
});

const sammenligning = {
    søker: 'MOR',
    kanVelgeArbeidsgiver: true,
    erPeriodeneTilAnnenPartLåst: false,
    førsteDagIMåneden: '2026-10-01',
} as const;

describe('historiske kalenderendringer', () => {
    it('regner siste dato i forrige måned som historisk, men ikke første dag i måneden', () => {
        expect(harHistoriskeDatoer([{ fom: '2026-09-30', tom: '2026-09-30' }], '2026-10-01')).toBe(true);
        expect(harHistoriskeDatoer([{ fom: '2026-10-01', tom: '2026-10-30' }], '2026-10-01')).toBe(false);
    });

    it('behandler 30. september som historisk, men ikke 1.–15. oktober ved oktobergrense', () => {
        expect(harHistoriskeDatoer([{ fom: '2026-09-30', tom: '2026-09-30' }], '2026-10-01')).toBe(true);
        expect(harHistoriskeDatoer([{ fom: '2026-10-01', tom: '2026-10-01' }], '2026-10-01')).toBe(false);
        expect(harHistoriskeDatoer([{ fom: '2026-10-05', tom: '2026-10-15' }], '2026-10-01')).toBe(false);
    });

    it('varsler ved sletting av en avslått periode bare når markeringen overlapper historiske uttaksdatoer', () => {
        const perioder: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-09-30',
                søker: {
                    ...lagUttak('MOR'),
                    resultat: {
                        innvilget: false,
                        trekkerDager: false,
                        trekkerMinsterett: false,
                        årsak: 'ANNET',
                    },
                },
            },
        ];

        expect(harHistoriskSletting(perioder, [{ fom: '2026-09-14', tom: '2026-09-30' }], '2026-10-01')).toBe(true);
        expect(harHistoriskSletting(perioder, [{ fom: '2026-10-01', tom: '2026-10-09' }], '2026-10-01')).toBe(false);
        expect(harHistoriskSletting(perioder, [{ fom: '2026-09-01', tom: '2026-09-04' }], '2026-10-01')).toBe(false);
    });

    it('varsler ikke ved sletting når bare utvalget utenfor perioden er historisk', () => {
        expect(
            harHistoriskSletting(
                [{ fom: '2026-10-01', tom: '2026-10-16', søker: lagUttak('MOR') }],
                [{ fom: '2026-09-07', tom: '2026-10-16' }],
                '2026-10-01',
            ),
        ).toBe(false);
    });

    it('varsler for ny ferie i et historisk intervall selv når uttaksplanen er tom der', () => {
        expect(
            harHistoriskFerieendring(
                [],
                [
                    {
                        fom: '2026-09-21',
                        tom: '2026-10-02',
                        søker: { ...lagUttak('MOR'), utsettelseÅrsak: 'FERIE' },
                    },
                ],
                'MOR',
                '2026-10-01',
            ),
        ).toBe(true);
    });

    it('varsler ikke når ferieintervallet allerede er ferie', () => {
        const perioder: UttakPeriodeDto[] = [
            {
                fom: '2026-09-21',
                tom: '2026-10-02',
                søker: { ...lagUttak('MOR'), utsettelseÅrsak: 'FERIE' },
            },
        ];

        expect(harHistoriskFerieendring(perioder, perioder, 'MOR', '2026-10-01')).toBe(false);
    });

    it('sammenligner hele planen for å oppdage historisk ferie som er flyttet ut av datoene sine', () => {
        const eksisterende: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-09-11',
                søker: { ...lagUttak('MOR'), utsettelseÅrsak: 'FERIE' },
            },
        ];

        expect(harHistoriskFerieendring(eksisterende, [], 'MOR', '2026-10-01', true)).toBe(true);
    });

    it('sammenligner hele planen for å oppdage ferie lagt til på historiske datoer', () => {
        const nye: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-09-11',
                søker: { ...lagUttak('MOR'), utsettelseÅrsak: 'FERIE' },
            },
        ];

        expect(harHistoriskFerieendring([], nye, 'MOR', '2026-10-01', true)).toBe(true);
    });

    it('ignorerer uendret historisk gradering når bare datoer i inneværende måned endres', () => {
        const eksisterende: UttakPeriodeDto[] = [{ fom: '2026-09-07', tom: '2026-09-30', søker: lagUttak('MOR', 50) }];
        const nye: UttakPeriodeDto[] = [{ fom: '2026-09-07', tom: '2026-10-30', søker: lagUttak('MOR', 50) }];

        expect(harHistoriskGraderingsendring(eksisterende, nye, sammenligning)).toBe(false);
        expect(finnPerioderMedEndretGradering(eksisterende, nye, sammenligning)).toEqual([
            { fom: '2026-10-01', tom: '2026-10-02' },
            { fom: '2026-10-05', tom: '2026-10-09' },
            { fom: '2026-10-12', tom: '2026-10-16' },
            { fom: '2026-10-19', tom: '2026-10-23' },
            { fom: '2026-10-26', tom: '2026-10-30' },
        ]);
    });

    it('sammenligner hele planen over unionen av datoer og oppdager graderte datoer som er fjernet', () => {
        const eksisterende: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-09-11',
                søker: lagUttak('MOR', 50),
            },
        ];

        expect(
            harHistoriskGraderingsendring(eksisterende, [], {
                ...sammenligning,
                førsteDagIMåneden: '2026-10-01',
                sammenlignHelePlanen: true,
            }),
        ).toBe(true);
    });

    it('beholder delvis sammenligningssemantikk for utelatt låst uttak fra annen part', () => {
        const eksisterende: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-09-11',
                søker: lagUttak('MOR', 50),
                annenPart: lagUttak('FAR_MEDMOR', 40),
            },
        ];

        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [{ fom: '2026-09-07', tom: '2026-09-11', søker: lagUttak('MOR', 50) }],
                { ...sammenligning, førsteDagIMåneden: '2026-10-01', erPeriodeneTilAnnenPartLåst: true },
            ),
        ).toBe(false);
        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [{ fom: '2026-09-07', tom: '2026-09-11', søker: lagUttak('MOR', 50) }],
                {
                    ...sammenligning,
                    førsteDagIMåneden: '2026-10-01',
                    erPeriodeneTilAnnenPartLåst: true,
                    sammenlignHelePlanen: true,
                },
            ),
        ).toBe(true);
    });

    it.each([
        { fom: '2026-09-14', tom: '2026-09-18' },
        { fom: '2026-09-21', tom: '2026-09-25' },
        { fom: '2026-09-28', tom: '2026-10-02' },
    ])('finner nye graderte datoer i hull $fom til $tom', (intervall) => {
        const eksisterende: UttakPeriodeDto[] = [
            { fom: '2026-09-07', tom: '2026-09-11', søker: lagUttak('MOR', 50) },
            { fom: '2026-10-05', tom: '2026-10-09', søker: lagUttak('MOR', 50) },
        ];

        expect(
            finnPerioderMedEndretGradering(eksisterende, [{ ...intervall, søker: lagUttak('MOR', 50) }], sammenligning),
        ).toEqual([intervall]);
    });

    it('finner ny gradering i et tomrom mellom eksisterende uttaksperioder', () => {
        const eksisterende: UttakPeriodeDto[] = [
            { fom: '2026-09-07', tom: '2026-09-11', søker: lagUttak('MOR') },
            { fom: '2026-10-05', tom: '2026-10-09', søker: lagUttak('MOR') },
        ];
        const nye: UttakPeriodeDto[] = [{ fom: '2026-09-14', tom: '2026-09-18', søker: lagUttak('MOR', 50) }];

        expect(harHistoriskGraderingsendring(eksisterende, nye, sammenligning)).toBe(true);
    });

    it('finner endring fra gradert til ugradert og endret arbeidsprosent', () => {
        const eksisterende: UttakPeriodeDto[] = [{ fom: '2026-09-07', tom: '2026-10-02', søker: lagUttak('MOR', 50) }];

        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [{ fom: '2026-09-07', tom: '2026-10-02', søker: lagUttak('MOR') }],
                sammenligning,
            ),
        ).toBe(true);
        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [{ fom: '2026-09-07', tom: '2026-10-02', søker: lagUttak('MOR', 60) }],
                sammenligning,
            ),
        ).toBe(true);
    });

    it('returnerer bare intervallene med endret gradering mellom uendrede intervaller', () => {
        const eksisterende: UttakPeriodeDto[] = [
            { fom: '2026-09-07', tom: '2026-09-11', søker: lagUttak('MOR', 50) },
            { fom: '2026-09-14', tom: '2026-09-18', søker: lagUttak('MOR', 60) },
            { fom: '2026-09-21', tom: '2026-09-25', søker: lagUttak('MOR', 50) },
            { fom: '2026-09-28', tom: '2026-10-02', søker: lagUttak('MOR') },
        ];

        expect(
            finnPerioderMedEndretGradering(
                eksisterende,
                [{ fom: '2026-09-07', tom: '2026-10-02', søker: lagUttak('MOR', 50) }],
                sammenligning,
            ),
        ).toEqual([
            { fom: '2026-09-14', tom: '2026-09-18' },
            { fom: '2026-09-28', tom: '2026-10-02' },
        ]);
    });

    it.each(['ferie', 'gradering'] as const)(
        'ignorerer helgen når lik %s forlenges fra fredag 30. oktober til mandag 2. november',
        (type) => {
            const uttak =
                type === 'ferie' ? { ...lagUttak('MOR'), utsettelseÅrsak: 'FERIE' as const } : lagUttak('MOR', 50);
            const eksisterende = [{ fom: '2026-10-30', tom: '2026-10-30', søker: uttak }];
            const nye = [{ fom: '2026-10-30', tom: '2026-11-02', søker: uttak }];

            expect(harHistoriskFerieendring(eksisterende, nye, 'MOR', '2026-11-01', true)).toBe(false);
            expect(
                harHistoriskGraderingsendring(eksisterende, nye, {
                    ...sammenligning,
                    førsteDagIMåneden: '2026-11-01',
                    sammenlignHelePlanen: true,
                }),
            ).toBe(false);
        },
    );

    it('beholder endret gradering i et hull på en ukedag, men utelater helgedager', () => {
        expect(
            finnPerioderMedEndretGradering(
                [
                    { fom: '2026-10-29', tom: '2026-10-29', søker: lagUttak('MOR', 50) },
                    { fom: '2026-11-02', tom: '2026-11-02', søker: lagUttak('MOR', 50) },
                ],
                [{ fom: '2026-10-29', tom: '2026-11-02', søker: lagUttak('MOR', 50) }],
                sammenligning,
            ),
        ).toEqual([{ fom: '2026-10-30', tom: '2026-10-30' }]);
    });

    it('sammenligner graderingen for samme forelder ved samtidige uttak', () => {
        const eksisterende: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-10-02',
                søker: lagUttak('MOR', 50),
                annenPart: lagUttak('FAR_MEDMOR', 40),
            },
        ];

        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [
                    {
                        fom: '2026-09-07',
                        tom: '2026-10-02',
                        søker: lagUttak('FAR_MEDMOR', 40),
                        annenPart: lagUttak('MOR', 50),
                    },
                ],
                sammenligning,
            ),
        ).toBe(false);
        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [
                    {
                        fom: '2026-09-07',
                        tom: '2026-10-02',
                        søker: lagUttak('MOR', 50),
                        annenPart: lagUttak('FAR_MEDMOR', 60),
                    },
                ],
                sammenligning,
            ),
        ).toBe(true);
    });

    it('behandler utelatt låst uttak for annen part som uendret', () => {
        const eksisterende: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-10-02',
                søker: lagUttak('MOR', 50),
                annenPart: lagUttak('FAR_MEDMOR', 40),
            },
        ];

        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [{ fom: '2026-09-07', tom: '2026-10-02', søker: lagUttak('MOR', 50) }],
                { ...sammenligning, erPeriodeneTilAnnenPartLåst: true },
            ),
        ).toBe(false);
    });

    it('varsler ikke ved rent kvotetypebytte eller ulik aktivitet hos annen part', () => {
        const eksisterende: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-10-02',
                søker: { ...lagUttak('MOR', 50), kontoType: 'MØDREKVOTE' },
                annenPart: { ...lagUttak('FAR_MEDMOR', 40), kontoType: 'FEDREKVOTE' },
            },
        ];
        const nye: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-10-02',
                søker: { ...lagUttak('MOR', 50), kontoType: 'FELLESPERIODE' },
                annenPart: {
                    ...lagUttak('FAR_MEDMOR', 40, { type: 'FRILANS' }),
                    kontoType: 'FEDREKVOTE',
                },
            },
        ];

        expect(harHistoriskGraderingsendring(eksisterende, nye, sammenligning)).toBe(false);
        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [{ ...nye[0]!, søker: { ...lagUttak('MOR', 60), kontoType: 'FELLESPERIODE' } }],
                sammenligning,
            ),
        ).toBe(true);
    });

    it.each([true, false])(
        'sammenligner arbeidsgiver-ID bare når arbeidsgivervalg er tilgjengelig (%s)',
        (kanVelgeArbeidsgiver) => {
            const intervall = { fom: '2026-09-07', tom: '2026-10-02' };
            const eksisterende: UttakPeriodeDto[] = [
                {
                    ...intervall,
                    søker: lagUttak('MOR', 50, { type: 'ORDINÆRT_ARBEID', arbeidsgiverId: '123' }),
                },
            ];
            const nye: UttakPeriodeDto[] = [
                {
                    ...intervall,
                    søker: lagUttak('MOR', 50, { type: 'ORDINÆRT_ARBEID', arbeidsgiverId: '456' }),
                },
            ];

            expect(harHistoriskGraderingsendring(eksisterende, nye, { ...sammenligning, kanVelgeArbeidsgiver })).toBe(
                kanVelgeArbeidsgiver,
            );
        },
    );

    it('behandler manglende aktivitetstype og ANNET som like, men oppdager relevant arbeidsgiverendring', () => {
        const eksisterende: UttakPeriodeDto[] = [
            {
                fom: '2026-09-07',
                tom: '2026-10-02',
                søker: lagUttak('MOR', 50),
            },
        ];

        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [
                    {
                        fom: '2026-09-07',
                        tom: '2026-10-02',
                        søker: lagUttak('MOR', 50, { type: 'ANNET' }),
                    },
                ],
                sammenligning,
            ),
        ).toBe(false);
        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [
                    {
                        fom: '2026-09-07',
                        tom: '2026-10-02',
                        søker: lagUttak('MOR', 50, {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiverId: '123',
                        }),
                    },
                ],
                sammenligning,
            ),
        ).toBe(true);
    });

    it('ignorerer endring som bare berører inneværende måned', () => {
        expect(
            harHistoriskGraderingsendring(
                [{ fom: '2026-10-05', tom: '2026-10-30', søker: lagUttak('MOR', 50) }],
                [{ fom: '2026-10-05', tom: '2026-10-30', søker: lagUttak('MOR', 60) }],
                sammenligning,
            ),
        ).toBe(false);
    });

    it('ignorerer rene endringer i EØS-data i graderingssammenligningen', () => {
        const eksisterende: UttakPeriodeDto[] = [
            { fom: '2026-09-07', tom: '2026-10-02', annenPartEøs: { kontoType: 'FEDREKVOTE', trekkdager: 20 } },
        ];

        expect(
            harHistoriskGraderingsendring(
                eksisterende,
                [
                    {
                        fom: '2026-09-07',
                        tom: '2026-10-02',
                        annenPartEøs: { kontoType: 'MØDREKVOTE', trekkdager: 10 },
                    },
                ],
                sammenligning,
            ),
        ).toBe(false);
    });
});
