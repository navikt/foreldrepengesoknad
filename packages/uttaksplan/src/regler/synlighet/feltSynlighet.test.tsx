import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { describe, expect, it } from 'vitest';

import { BarnType } from '@navikt/fp-constants';

import { UttaksplanDataProvider } from '../../context/UttaksplanDataContext';
import { VIS_FLERBARNSDAGER_SPØRSMÅL, VIS_INFO_FEDREKVOTE_RUNDT_FØDSEL, useFeltSynlighet } from './feltSynlighet';

type Kontekst = Parameters<typeof VIS_FLERBARNSDAGER_SPØRSMÅL.skalVises>[0];

const lagKontekst = (overstyringer: Partial<Kontekst> = {}): Kontekst => ({
    forelder: 'FAR_MEDMOR',
    søker: 'FAR_MEDMOR',
    rettighetType: 'BEGGE_RETT',
    kontoTypeMor: 'MØDREKVOTE',
    kontoTypeFarMedmor: 'FEDREKVOTE',
    ønskerFlerbarnsdager: undefined,
    antallBarn: 2,
    samtidigUttaksprosentMor: undefined,
    stillingsprosentMor: undefined,
    familiesituasjon: 'fødsel',
    valgtePerioder: [{ fom: '2024-06-17', tom: '2024-06-18' }],
    familiehendelsedato: '2024-06-17',
    ...overstyringer,
});

describe.each([
    {
        navn: 'barn født etter termin',
        familiehendelsedato: '2024-06-24',
        termindato: '2024-06-17',
        sisteDag: '2024-08-02',
        førsteDagEtter: '2024-08-05',
    },
    {
        navn: 'barn født før termin',
        familiehendelsedato: '2024-06-17',
        termindato: '2024-06-24',
        sisteDag: '2024-07-26',
        førsteDagEtter: '2024-07-29',
    },
    {
        navn: 'ukjent termindato',
        familiehendelsedato: '2024-06-17',
        termindato: undefined,
        sisteDag: '2024-07-26',
        førsteDagEtter: '2024-07-29',
    },
])('info om fedrekvote rundt fødsel: $navn', ({ familiehendelsedato, termindato, sisteDag, førsteDagEtter }) => {
    it.each([
        { dato: '2024-05-31', forventet: false },
        { dato: '2024-06-03', forventet: true },
        { dato: sisteDag, forventet: true },
        { dato: førsteDagEtter, forventet: false },
    ])('gir synlighet $forventet på $dato', ({ dato, forventet }) => {
        expect(
            VIS_INFO_FEDREKVOTE_RUNDT_FØDSEL.skalVises(
                lagKontekst({
                    familiehendelsedato,
                    termindato,
                    valgtePerioder: [{ fom: dato, tom: dato }],
                }),
            ),
        ).toBe(forventet);
    });

    it('henter termindatoen fra konteksten når infoteksten vurderes', () => {
        const wrapper = ({ children }: PropsWithChildren) => (
            <UttaksplanDataProvider
                barn={{
                    type: BarnType.FØDT,
                    antallBarn: 1,
                    fødselsdatoer: [familiehendelsedato],
                    termindato,
                }}
                foreldreInfo={{
                    søker: 'FAR_MEDMOR',
                    rettighetType: 'BEGGE_RETT',
                    erMedmorDelAvSøknaden: false,
                    navnPåForeldre: { mor: 'Mor', farMedmor: 'Far' },
                }}
                valgtStønadskvote={{ kontoer: [], minsteretter: { farRundtFødsel: 10, toTette: 14 } }}
                harAktivitetskravIPeriodeUtenUttak={false}
                erPeriodeneTilAnnenPartLåst={false}
                erEndringssøknad={false}
                uttakPerioder={[]}
            >
                {children}
            </UttaksplanDataProvider>
        );
        const { result } = renderHook(
            () =>
                useFeltSynlighet([{ fom: '2024-06-03', tom: '2024-06-03' }], {
                    forelder: 'FAR_MEDMOR',
                    kontoTypeMor: undefined,
                    kontoTypeFarMedmor: 'FEDREKVOTE',
                    ønskerFlerbarnsdager: false,
                    samtidigUttaksprosentMor: undefined,
                    stillingsprosentMor: undefined,
                }),
            { wrapper },
        );

        expect(result.current.visInfoFedrekvoteRundtFødsel).toBe(true);
    });
});

describe('spørsmålet om flerbarnsdager', () => {
    describe.each(['FAR_MEDMOR', 'BEGGE'] as const)('med %s valgt', (forelder) => {
        it.each([
            {
                navn: 'helt før fødsel',
                valgtePerioder: [{ fom: '2024-06-13', tom: '2024-06-14' }],
                forventet: false,
            },
            {
                navn: 'én periode som krysser fødsel',
                valgtePerioder: [{ fom: '2024-06-14', tom: '2024-06-18' }],
                forventet: false,
            },
            {
                navn: 'flere perioder der den siste starter før fødsel',
                valgtePerioder: [
                    { fom: '2024-06-18', tom: '2024-06-19' },
                    { fom: '2024-06-14', tom: '2024-06-14' },
                ],
                forventet: false,
            },
            {
                navn: 'på fødselsdatoen',
                valgtePerioder: [{ fom: '2024-06-17', tom: '2024-06-17' }],
                forventet: true,
            },
            {
                navn: 'etter fødsel',
                valgtePerioder: [{ fom: '2024-06-18', tom: '2024-06-19' }],
                forventet: true,
            },
        ])('$navn gir synlighet $forventet', ({ valgtePerioder, forventet }) => {
            expect(VIS_FLERBARNSDAGER_SPØRSMÅL.skalVises(lagKontekst({ forelder, valgtePerioder }))).toBe(forventet);
        });

        it('skjuler spørsmålet selv om flerbarnsdager allerede er valgt', () => {
            expect(
                VIS_FLERBARNSDAGER_SPØRSMÅL.skalVises(
                    lagKontekst({
                        forelder,
                        ønskerFlerbarnsdager: true,
                        valgtePerioder: [{ fom: '2024-06-14', tom: '2024-06-14' }],
                    }),
                ),
            ).toBe(false);
        });

        it('endrer ikke synligheten ved adopsjon', () => {
            expect(
                VIS_FLERBARNSDAGER_SPØRSMÅL.skalVises(
                    lagKontekst({
                        forelder,
                        familiesituasjon: 'adopsjon',
                        valgtePerioder: [{ fom: '2024-06-14', tom: '2024-06-14' }],
                    }),
                ),
            ).toBe(true);
        });
    });

    it.each(['2024-06-14', '2024-06-17', '2024-06-18'])('viser ikke spørsmålet for mor på %s', (dato) => {
        expect(
            VIS_FLERBARNSDAGER_SPØRSMÅL.skalVises(
                lagKontekst({ forelder: 'MOR', valgtePerioder: [{ fom: dato, tom: dato }] }),
            ),
        ).toBe(false);
    });

    it.each([
        { antallBarn: 1 },
        { kontoTypeFarMedmor: 'MØDREKVOTE' },
        { kontoTypeFarMedmor: 'AKTIVITETSFRI_KVOTE' },
    ] satisfies Array<Partial<Kontekst>>)('beholder eksisterende avgrensning %j', (overstyringer) => {
        expect(VIS_FLERBARNSDAGER_SPØRSMÅL.skalVises(lagKontekst(overstyringer))).toBe(false);
    });
});
