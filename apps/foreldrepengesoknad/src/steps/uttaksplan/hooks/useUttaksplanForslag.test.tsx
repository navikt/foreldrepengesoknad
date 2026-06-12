import { renderHook } from '@testing-library/react';
import { ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { ReactNode } from 'react';
import { OppstartValg } from 'types/Fordeling';

import { BarnType } from '@navikt/fp-constants';
import { KontoBeregningDto } from '@navikt/fp-types';
import { DELT_UTTAK_100 } from '@navikt/fp-utils-test';

import { useUttaksplanForslag } from './useUttaksplanForslag';

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
            expect(perioder[0]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2024-06-10',
                tom: '2024-06-28',
                flerbarnsdager: false,
            });

            // MOR og FAR: samtidig uttak fra familiehendelsesdato (10 dager)
            expect(perioder[1]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: FØDSELSDATO,
                tom: '2024-07-12',
                samtidigUttak: 100,
            });
            expect(perioder[2]).toMatchObject({
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: FØDSELSDATO,
                tom: '2024-07-12',
                samtidigUttak: 100,
            });

            // MOR: resterende MØDREKVOTE (75 - 10 = 65 dager)
            expect(perioder[3]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: '2024-07-15',
                tom: '2024-10-11',
                flerbarnsdager: false,
            });

            // MOR: FELLESPERIODE (80 dager)
            expect(perioder[4]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2024-10-14',
                tom: '2025-01-31',
                flerbarnsdager: false,
            });

            // FAR har ingen separat FEDREKVOTE utover samtidig uttak
            expect(perioder).toHaveLength(5);
            expect(perioder.filter((p) => 'forelder' in p && p.forelder === 'FAR_MEDMOR')).toHaveLength(1);
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
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2024-06-10',
                tom: '2024-06-28',
            });

            // MOR: MØDREKVOTE skal starte på familiehendelsesdato, ikke på fars dato (75 dager)
            expect(perioder[1]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: FØDSELSDATO,
                tom: '2024-10-11',
                flerbarnsdager: false,
            });
            expect(perioder[1]!.fom).not.toBe(farStartdato);

            // MOR: FELLESPERIODE følger etter MØDREKVOTE (80 dager)
            expect(perioder[2]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2024-10-14',
                tom: '2025-01-31',
                flerbarnsdager: false,
            });

            // FAR: FEDREKVOTE skal starte på fars valgte dato (75 dager)
            expect(perioder[3]).toMatchObject({
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: farStartdato,
                tom: '2025-01-13',
                flerbarnsdager: false,
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
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2024-06-10',
                tom: '2024-06-28',
            });
            expect(perioder[1]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                fom: FØDSELSDATO,
                tom: '2024-10-11',
            });
            expect(perioder[2]).toMatchObject({
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2024-10-14',
                tom: '2025-01-31',
            });
            expect(perioder[3]).toMatchObject({
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: farStartdato,
                tom: '2024-11-13',
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
            const farPeriode = perioder.find((p) => 'forelder' in p && p.forelder === 'FAR_MEDMOR');

            // Uttaksdagen.denneEllerNeste justerer lørdag til mandag
            expect(farPeriode).toMatchObject({
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2024-10-07',
                tom: '2025-01-17',
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
                            forelder: 'MOR',
                            kontoType: 'MØDREKVOTE',
                            flerbarnsdager: false,
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
});
