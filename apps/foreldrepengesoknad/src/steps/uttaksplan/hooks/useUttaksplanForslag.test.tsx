import { renderHook } from '@testing-library/react';
import { ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { ReactNode } from 'react';
import { FellesperiodeFordelingValg, Fordeling, OppstartValg } from 'types/Fordeling';

import { BarnType } from '@navikt/fp-constants';
import { Barn, KontoBeregningDto, UttakPeriodeDto } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';
import { DELT_UTTAK_100, IKKE_DELT_UTTAK_100_MOR } from '@navikt/fp-utils-test';

import { kanGenerereUttaksplanForslag, useUttaksplanForslag } from './useUttaksplanForslag';

const FØDSELSDATO = '2024-07-01';

const STØNADSKVOTE: KontoBeregningDto = {
    kontoer: DELT_UTTAK_100,
    minsteretter: { farRundtFødsel: 10, toTette: 0 },
};

const getWrapper =
    (initialState: ConstructorParameters<typeof Object>[0]) =>
    ({ children }: { children: ReactNode }) => <FpDataContext initialState={initialState}>{children}</FpDataContext>;

const baseFarDeltUttakContext = {
    [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel' as const, rolle: 'far' as const },
    [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [FØDSELSDATO],
        antallBarn: 1,
        termindato: FØDSELSDATO,
    },
    [ContextDataType.ANNEN_FORELDER]: {
        fnr: '31430574828',
        fornavn: 'Trude',
        etternavn: 'Utvikler',
        kanIkkeOppgis: false,
        erAleneOmOmsorg: false,
        harRettPåForeldrepengerINorge: true,
    },
};

describe('useUttaksplanForslag – far med delt uttak', () => {
    describe('når far starter på familiehendelsesdato (harFødselspermisjon)', () => {
        it('genererer plan med samtidig uttak på familiehendelsesdato', () => {
            const { result } = renderHook(() => useUttaksplanForslag(STØNADSKVOTE), {
                wrapper: getWrapper({
                    ...baseFarDeltUttakContext,
                    [ContextDataType.FORDELING]: {
                        oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
                    },
                }),
            });

            const perioder = result.current;

            // MOR: FORELDREPENGER_FØR_FØDSEL 15 dager før fødsel
            expect(perioder[0]).toEqual({
                fom: '2024-06-10',
                tom: '2024-06-28',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                    flerbarnsdager: false,
                },
            });

            // MOR og FAR: samtidig uttak fra familiehendelsesdato (10 dager)
            expect(perioder[1]).toMatchObject({
                fom: FØDSELSDATO,
                tom: '2024-07-12',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    samtidigUttak: 100,
                },
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                    samtidigUttak: 100,
                },
            });

            // MOR: resterende MØDREKVOTE (75 - 10 = 65 dager)
            expect(perioder[2]).toEqual({
                fom: '2024-07-15',
                tom: '2024-10-11',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                    flerbarnsdager: false,
                },
            });

            // MOR: FELLESPERIODE (80 dager)
            expect(perioder[3]).toEqual({
                fom: '2024-10-14',
                tom: '2025-01-31',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                    flerbarnsdager: false,
                },
            });

            // FAR har ingen separat FEDREKVOTE utover samtidig uttak
            expect(perioder).toHaveLength(4);
            expect(perioder.filter((p) => p.søker?.forelder === 'FAR_MEDMOR')).toHaveLength(1);
        });
    });

    describe('når far velger en annen dato (ANNEN_DATO)', () => {
        it('starter mors MØDREKVOTE på familiehendelsesdato, ikke på fars valgte dato', () => {
            const farStartdato = '2024-10-01'; // tirsdag, lenge etter fødsel

            const { result } = renderHook(() => useUttaksplanForslag(STØNADSKVOTE), {
                wrapper: getWrapper({
                    ...baseFarDeltUttakContext,
                    [ContextDataType.FORDELING]: {
                        oppstartAvForeldrepengerValg: OppstartValg.ANNEN_DATO,
                        oppstartDato: farStartdato,
                    },
                }),
            });

            const perioder = result.current;

            expect(perioder).toHaveLength(4);

            // MOR: FORELDREPENGER_FØR_FØDSEL skal fortsatt være ankret til familiehendelsesdato,
            // ikke til fars valgte dato
            expect(perioder[0]).toMatchObject({
                fom: '2024-06-10',
                tom: '2024-06-28',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                },
            });

            // MOR: MØDREKVOTE skal starte på familiehendelsesdato, ikke på fars dato (75 dager)
            expect(perioder[1]).toMatchObject({
                fom: FØDSELSDATO,
                tom: '2024-10-11',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                    flerbarnsdager: false,
                },
            });
            expect(perioder[1]!.fom).not.toBe(farStartdato);

            // MOR: FELLESPERIODE følger etter MØDREKVOTE (80 dager)
            expect(perioder[2]).toMatchObject({
                fom: '2024-10-14',
                tom: '2025-01-31',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                    flerbarnsdager: false,
                },
            });

            // FAR: FEDREKVOTE skal starte på fars valgte dato (75 dager)
            expect(perioder[3]).toMatchObject({
                fom: farStartdato,
                tom: '2025-01-13',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                    flerbarnsdager: false,
                },
            });
        });

        it('starter fars FEDREKVOTE på valgt dato selv om det er midt i mors periode', () => {
            // FAR velger en dato som faller midt i mors mødrekvote
            const farStartdato = '2024-08-01';

            const { result } = renderHook(() => useUttaksplanForslag(STØNADSKVOTE), {
                wrapper: getWrapper({
                    ...baseFarDeltUttakContext,
                    [ContextDataType.FORDELING]: {
                        oppstartAvForeldrepengerValg: OppstartValg.ANNEN_DATO,
                        oppstartDato: farStartdato,
                    },
                }),
            });

            const perioder = result.current;

            expect(perioder).toHaveLength(4);

            expect(perioder[0]).toMatchObject({
                fom: '2024-06-10',
                tom: '2024-06-28',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                },
            });
            expect(perioder[1]).toMatchObject({
                fom: FØDSELSDATO,
                tom: '2024-10-11',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'MØDREKVOTE',
                },
            });
            expect(perioder[2]).toMatchObject({
                fom: '2024-10-14',
                tom: '2025-01-31',
                annenPart: {
                    forelder: 'MOR',
                    kontoType: 'FELLESPERIODE',
                },
            });
            expect(perioder[3]).toMatchObject({
                fom: farStartdato,
                tom: '2024-11-13',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                },
            });
        });

        it('respekterer helgejustering av oppstartsdato', () => {
            // Lørdag → skal justeres til nærmeste mandag
            const { result } = renderHook(() => useUttaksplanForslag(STØNADSKVOTE), {
                wrapper: getWrapper({
                    ...baseFarDeltUttakContext,
                    [ContextDataType.FORDELING]: {
                        oppstartAvForeldrepengerValg: OppstartValg.ANNEN_DATO,
                        oppstartDato: '2024-10-05', // lørdag
                    },
                }),
            });

            const perioder = result.current;
            const farPeriode = perioder.find((p) => p.søker?.forelder === 'FAR_MEDMOR');

            // Uttaksdagen.denneEllerNeste justerer lørdag til mandag
            expect(farPeriode).toMatchObject({
                fom: '2024-10-07',
                tom: '2025-01-17',
                søker: {
                    forelder: 'FAR_MEDMOR',
                    kontoType: 'FEDREKVOTE',
                },
            });
        });
    });

    describe('når far velger dagen etter annen forelder', () => {
        it('returnerer tom liste når annen parts perioder er oppgitt (ikke-støttet case)', () => {
            // useUttaksplanForslag returnerer [] når annenPartsPerioder er ikke-tom
            const { result } = renderHook(
                () =>
                    useUttaksplanForslag(STØNADSKVOTE, [
                        {
                            fom: '2024-07-01',
                            tom: '2024-09-01',
                            annenPart: {
                                forelder: 'MOR',
                                kontoType: 'MØDREKVOTE',
                                flerbarnsdager: false,
                            },
                        },
                    ]),
                {
                    wrapper: getWrapper({
                        ...baseFarDeltUttakContext,
                        [ContextDataType.FORDELING]: {
                            oppstartAvForeldrepengerValg: OppstartValg.FAMILIEHENDELSESDATO,
                        },
                    }),
                },
            );

            expect(result.current).toEqual([]);
        });
    });

    describe('når annenPartsPerioder framleis lastar', () => {
        it('returnerer tom liste i staden for å kaste feil, sjølv om fordeling manglar oppstartsvalg', () => {
            // Reproduserer race-condition: annen part har periodar (oppstartsvalg vart difor
            // skjult og aldri lagra på Fordeling-steget), men spørringa på Uttaksplan-steget
            // har ikkje levert data enno (annenPartsPerioder er undefined mens den lastar).
            const { result } = renderHook(() => useUttaksplanForslag(STØNADSKVOTE, undefined, true), {
                wrapper: getWrapper({
                    ...baseFarDeltUttakContext,
                    [ContextDataType.FORDELING]: {},
                }),
            });

            expect(result.current).toEqual([]);
        });
    });
});

describe('kanGenerereUttaksplanForslag', () => {
    it('returnerer true når annen part ikke har noen perioder', () => {
        expect(kanGenerereUttaksplanForslag(undefined)).toBe(true);
        expect(kanGenerereUttaksplanForslag([])).toBe(true);
    });

    it('returnerer false når annen part allerede har perioder', () => {
        expect(
            kanGenerereUttaksplanForslag([
                {
                    fom: '2024-07-01',
                    tom: '2024-09-01',
                    annenPart: {
                        forelder: 'MOR',
                        kontoType: 'MØDREKVOTE',
                        flerbarnsdager: false,
                    },
                },
            ]),
        ).toBe(false);
    });
});

describe('forslag i førstegangssøknad når fødselsdato avviker fra termin', () => {
    const lagForslag = ({
        termindato = '2024-06-17',
        fødselsdato = FØDSELSDATO,
        rolle = 'mor',
        fordeling = {},
        erEndringssøknad = false,
        barn,
        stønadskvote = STØNADSKVOTE,
        annenForelderHarRett = true,
    }: {
        termindato?: string;
        fødselsdato?: string;
        rolle?: 'mor' | 'far' | 'medmor';
        fordeling?: Fordeling;
        erEndringssøknad?: boolean;
        barn?: Barn;
        stønadskvote?: KontoBeregningDto;
        annenForelderHarRett?: boolean;
    } = {}) =>
        renderHook(() => useUttaksplanForslag(stønadskvote, undefined, false, erEndringssøknad), {
            wrapper: getWrapper({
                ...baseFarDeltUttakContext,
                [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel', rolle },
                [ContextDataType.OM_BARNET]: barn ?? {
                    ...baseFarDeltUttakContext[ContextDataType.OM_BARNET],
                    fødselsdatoer: [fødselsdato],
                    termindato,
                },
                [ContextDataType.ANNEN_FORELDER]: {
                    ...baseFarDeltUttakContext[ContextDataType.ANNEN_FORELDER],
                    harRettPåForeldrepengerINorge: annenForelderHarRett,
                },
                [ContextDataType.FORDELING]: {
                    oppstartAvForeldrepengerValg:
                        rolle === 'mor' ? OppstartValg.TRE_UKER_FØR_FØDSEL : OppstartValg.FAMILIEHENDELSESDATO,
                    fordelingValg: FellesperiodeFordelingValg.ALT,
                    ...fordeling,
                },
            }),
        }).result.current;

    const antallDager = (perioder: UttakPeriodeDto[]) =>
        perioder.reduce(
            (sum, periode) => sum + Uttaksdagen.denne(periode.fom).getUttaksdagerFremTilOgMedDato(periode.tom),
            0,
        );

    it.each([
        FellesperiodeFordelingValg.ALT,
        FellesperiodeFordelingValg.HOPP_OVER_FORDELING,
        FellesperiodeFordelingValg.VIL_VELGE,
    ])('bruker fellesperiode fra termin til fødsel også med fordelingsvalget %s', (fordelingValg) => {
        const perioder = lagForslag({ fordeling: { fordelingValg } });
        expect(perioder.slice(0, 3)).toEqual([
            {
                fom: '2024-05-27',
                tom: '2024-06-14',
                søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
            },
            {
                fom: '2024-06-17',
                tom: '2024-06-28',
                søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
            },
            {
                fom: FØDSELSDATO,
                tom: '2024-10-11',
                søker: { forelder: 'MOR', kontoType: 'MØDREKVOTE', flerbarnsdager: false },
            },
        ]);
        expect(antallDager(perioder.filter((p) => (p.søker ?? p.annenPart)?.kontoType === 'FELLESPERIODE'))).toBe(80);
        expect(perioder.filter((p) => p.søker?.kontoType === 'FELLESPERIODE')).toHaveLength(
            fordelingValg === FellesperiodeFordelingValg.ALT ? 2 : 1,
        );
    });

    it('legger resten av mors fellesperiode etter mødrekvoten uten å bruke dagene før fødsel to ganger', () => {
        const perioder = lagForslag();
        expect(perioder.find((p) => p.søker?.kontoType === 'FELLESPERIODE' && p.fom > FØDSELSDATO)).toEqual({
            fom: '2024-10-14',
            tom: '2025-01-17',
            søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false },
        });
        expect(STØNADSKVOTE.kontoer.find((k) => k.konto === 'FELLESPERIODE')?.dager).toBe(80);
    });

    it.each(['2', '16'])('fordeler resterende fellesperiode uten overforbruk når mor velger %s uker', (uker) => {
        const perioder = lagForslag({
            fordeling: {
                fordelingValg: FellesperiodeFordelingValg.VIL_VELGE,
                antallUkerFellesperiodeTilSøker: uker,
            },
        });
        const fellesperioder = perioder.filter((p) => (p.søker ?? p.annenPart)?.kontoType === 'FELLESPERIODE');
        expect(antallDager(fellesperioder)).toBe(80);
        expect(antallDager(fellesperioder.filter((p) => p.søker && p.fom > FØDSELSDATO))).toBe(
            Math.min(Number(uker) * 5, 70),
        );
    });

    it.each([
        ['2024-07-02', '2024-06-11', 14],
        ['2024-07-15', '2024-06-24', 5],
        ['2024-07-22', undefined, 0],
        ['2024-07-29', undefined, 0],
    ])('reduserer foreldrepenger før fødsel når termindato er %s', (termindato, forventetStart, dager) => {
        const perioder = lagForslag({ termindato });
        const førFødsel = perioder.filter((p) => p.søker?.kontoType === 'FORELDREPENGER_FØR_FØDSEL');
        expect(antallDager(førFødsel)).toBe(dager);
        expect(førFødsel).toEqual(
            forventetStart
                ? [
                      {
                          fom: forventetStart,
                          tom: '2024-06-28',
                          søker: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL', flerbarnsdager: false },
                      },
                  ]
                : [],
        );
        expect(perioder.find((p) => p.søker?.kontoType === 'MØDREKVOTE')?.fom).toBe(FØDSELSDATO);
        expect(antallDager(perioder.filter((p) => p.søker?.kontoType === 'FELLESPERIODE'))).toBe(80);
    });

    it('håndterer termin og fødsel i helgen uten overlapp eller ugyldige perioder', () => {
        const perioder = lagForslag({ termindato: '2024-06-15', fødselsdato: '2024-06-29' });
        expect(perioder[0]).toMatchObject({ fom: '2024-05-27', tom: '2024-06-14' });
        expect(perioder[1]).toMatchObject({
            fom: '2024-06-17',
            tom: '2024-06-28',
            søker: { kontoType: 'FELLESPERIODE' },
        });
        expect(perioder[2]).toMatchObject({ fom: '2024-07-01', søker: { kontoType: 'MØDREKVOTE' } });
        expect(perioder.every((p) => p.fom <= p.tom)).toBe(true);
    });

    it('reduserer perioden før fødsel også når barnet blir født i helgen før termin', () => {
        const perioder = lagForslag({ termindato: '2024-07-13', fødselsdato: '2024-06-29' });
        expect(perioder[0]).toMatchObject({
            fom: '2024-06-24',
            tom: '2024-06-28',
            søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL' },
        });
        expect(perioder[1]).toMatchObject({ fom: '2024-07-01', søker: { kontoType: 'MØDREKVOTE' } });
    });

    it('beholder fellesperiode ved tidlig valgt oppstart og trekker fra begge periodene før fødsel', () => {
        const perioder = lagForslag({
            fordeling: { oppstartAvForeldrepengerValg: OppstartValg.ANNEN_DATO, oppstartDato: '2024-05-20' },
        });
        expect(perioder.slice(0, 3).map((p) => ({ fom: p.fom, tom: p.tom, konto: p.søker?.kontoType }))).toEqual([
            { fom: '2024-05-20', tom: '2024-05-24', konto: 'FELLESPERIODE' },
            { fom: '2024-05-27', tom: '2024-06-14', konto: 'FORELDREPENGER_FØR_FØDSEL' },
            { fom: '2024-06-17', tom: '2024-06-28', konto: 'FELLESPERIODE' },
        ]);
        expect(antallDager(perioder.filter((p) => p.søker?.kontoType === 'FELLESPERIODE'))).toBe(80);
    });

    it.each(['mor', 'far'] as const)(
        'lager ingen ekstra fellesperiode når %s har brukt hele kvoten før fødsel',
        (rolle) => {
            const perioder = lagForslag({
                rolle,
                stønadskvote: {
                    ...STØNADSKVOTE,
                    kontoer: STØNADSKVOTE.kontoer.map((k) => (k.konto === 'FELLESPERIODE' ? { ...k, dager: 10 } : k)),
                },
            });
            expect(perioder.filter((p) => (p.søker ?? p.annenPart)?.kontoType === 'FELLESPERIODE')).toHaveLength(1);
            expect(
                perioder.find((p) => p.søker?.kontoType === 'MØDREKVOTE' || p.annenPart?.kontoType === 'MØDREKVOTE')
                    ?.fom,
            ).toBe(FØDSELSDATO);
        },
    );

    it('beholder en senere oppstart som mor har valgt ved fødsel før termin', () => {
        const perioder = lagForslag({
            termindato: '2024-07-15',
            fordeling: { oppstartAvForeldrepengerValg: OppstartValg.ANNEN_DATO, oppstartDato: '2024-06-26' },
        });
        expect(perioder[0]).toMatchObject({
            fom: '2024-06-26',
            tom: '2024-06-28',
            søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL' },
        });
    });

    it.each(['far', 'medmor'] as const)('tilpasser mors perioder uten å endre %ss uttak ved fødselen', (rolle) => {
        const perioder = lagForslag({ rolle });
        expect(perioder[0]).toMatchObject({
            fom: '2024-05-27',
            tom: '2024-06-14',
            annenPart: { forelder: 'MOR', kontoType: 'FORELDREPENGER_FØR_FØDSEL' },
        });
        expect(perioder[1]).toMatchObject({
            fom: '2024-06-17',
            tom: '2024-06-28',
            annenPart: { forelder: 'MOR', kontoType: 'FELLESPERIODE' },
        });
        expect(perioder[2]).toMatchObject({
            fom: FØDSELSDATO,
            tom: '2024-07-12',
            søker: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', samtidigUttak: 100 },
            annenPart: { forelder: 'MOR', kontoType: 'MØDREKVOTE', samtidigUttak: 100 },
        });
        expect(antallDager(perioder.filter((p) => p.annenPart?.kontoType === 'FELLESPERIODE'))).toBe(80);
    });

    it.each(['2024-07-15', '2024-07-22', '2024-07-29'])(
        'reduserer også mors periode før fødsel i fars forslag når termin er %s',
        (termindato) => {
            const perioder = lagForslag({ rolle: 'far', termindato });
            expect(antallDager(perioder.filter((p) => p.annenPart?.kontoType === 'FORELDREPENGER_FØR_FØDSEL'))).toBe(
                termindato === '2024-07-15' ? 5 : 0,
            );
            expect(perioder.find((p) => p.søker)?.fom).toBe(FØDSELSDATO);
        },
    );

    it('reduserer foreldrepenger før fødsel også når bare mor har rett', () => {
        const perioder = lagForslag({
            termindato: '2024-07-15',
            annenForelderHarRett: false,
            stønadskvote: { ...STØNADSKVOTE, kontoer: IKKE_DELT_UTTAK_100_MOR },
        });
        expect(antallDager(perioder.filter((p) => p.søker?.kontoType === 'FORELDREPENGER_FØR_FØDSEL'))).toBe(5);
        expect(perioder.find((p) => p.søker?.kontoType === 'FORELDREPENGER')?.fom).toBe(FØDSELSDATO);
    });

    it('trekker dagene etter termin fra foreldrepengene når bare mor har rett', () => {
        const perioder = lagForslag({
            annenForelderHarRett: false,
            stønadskvote: { ...STØNADSKVOTE, kontoer: IKKE_DELT_UTTAK_100_MOR },
        });
        const foreldrepenger = perioder.filter((p) => p.søker?.kontoType === 'FORELDREPENGER');
        expect(foreldrepenger[0]).toMatchObject({ fom: '2024-06-17', tom: '2024-06-28' });
        expect(foreldrepenger[1]?.fom).toBe(FØDSELSDATO);
        expect(antallDager(foreldrepenger)).toBe(
            IKKE_DELT_UTTAK_100_MOR.find((k) => k.konto === 'FORELDREPENGER')?.dager,
        );
    });

    it('endrer ikke forslag i endringssøknader', () => {
        const perioder = lagForslag({ erEndringssøknad: true });
        expect(perioder[0]).toMatchObject({
            fom: '2024-06-10',
            tom: '2024-06-28',
            søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL' },
        });
        expect(perioder.some((p) => p.søker?.kontoType === 'FELLESPERIODE' && p.fom < FØDSELSDATO)).toBe(false);
    });

    it('beholder 15 dager før fødsel i endringssøknad selv om barnet ble født tidlig', () => {
        const perioder = lagForslag({ termindato: '2024-07-29', erEndringssøknad: true });
        expect(antallDager(perioder.filter((p) => p.søker?.kontoType === 'FORELDREPENGER_FØR_FØDSEL'))).toBe(15);
    });

    it('beholder eksisterende forslag når barnet ikke er født', () => {
        const perioder = lagForslag({
            barn: { type: BarnType.UFØDT, termindato: FØDSELSDATO, antallBarn: 1 },
            fordeling: { oppstartAvForeldrepengerValg: OppstartValg.TRE_UKER_FØR_TERMIN },
        });
        expect(perioder[0]).toMatchObject({
            fom: '2024-06-10',
            tom: '2024-06-28',
            søker: { kontoType: 'FORELDREPENGER_FØR_FØDSEL' },
        });
        expect(perioder.find((p) => p.søker?.kontoType === 'MØDREKVOTE')?.fom).toBe(FØDSELSDATO);
    });

    it('beholder eksisterende forslag når termindato ikke er oppgitt', () => {
        const perioder = lagForslag({
            barn: { type: BarnType.FØDT, fødselsdatoer: [FØDSELSDATO], antallBarn: 1 },
        });
        expect(antallDager(perioder.filter((p) => p.søker?.kontoType === 'FORELDREPENGER_FØR_FØDSEL'))).toBe(15);
    });
});
