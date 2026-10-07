import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';

import { AttachmentType, BarnType, Skjemanummer } from '@navikt/fp-constants';
import { FpSak_fpoversikt, UttakPeriodeDto_fpoversikt } from '@navikt/fp-types';
import { IntlProvider } from '@navikt/fp-ui';

import nbMessages from '../intl/nb_NO.json';
import { ContextDataMap, ContextDataType, FpDataContext } from './FpDataContext';
import { SøknadRoutes } from './routes';
import { useStepConfig } from './useStepConfig';

const annenForelder = {
    kanIkkeOppgis: false,
    fornavn: 'Ola',
    etternavn: 'Nordmann',
    fnr: '12345678901',
    erAleneOmOmsorg: false,
} as const;

const grunnlag = {
    [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel', rolle: 'mor' },
    [ContextDataType.OM_BARNET]: { type: BarnType.FØDT, antallBarn: 1, fødselsdatoer: ['2024-01-01'] },
    [ContextDataType.ANNEN_FORELDER]: annenForelder,
    [ContextDataType.UTTAKSPLAN]: [],
} satisfies ContextDataMap;

const eksisterendeSak = {
    familiehendelse: { fødselsdato: '2024-01-01', antallBarn: 1 },
    forelder: 'FAR_MEDMOR',
    gjelderAdopsjon: false,
    kanSøkeOmEndring: true,
    morUføretrygd: false,
    oppdatertTidspunkt: '2024-01-01',
    rettighetType: 'BEGGE_RETT',
    sakAvsluttet: false,
    sakTilhørerMor: false,
    saksnummer: '1',
} satisfies FpSak_fpoversikt;

const periodeMedDokumentasjonskrav = {
    fom: '2024-06-01',
    tom: '2024-06-30',
    søker: {
        forelder: 'FAR_MEDMOR',
        kontoType: 'FELLESPERIODE',
        morsAktivitet: 'ARBEID',
        flerbarnsdager: false,
    },
} satisfies UttakPeriodeDto_fpoversikt;

const hentSteg = (data: ContextDataMap, erEndringssøknad: boolean, sak?: FpSak_fpoversikt) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            <IntlProvider locale="nb" messagesGroupedByLocale={{ nb: nbMessages }}>
                <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN]}>
                    <FpDataContext initialState={{ ...grunnlag, ...data }}>{children}</FpDataContext>
                </MemoryRouter>
            </IntlProvider>
        </QueryClientProvider>
    );

    const { result } = renderHook(
        () =>
            useStepConfig({
                arbeidsforhold: [],
                harRegistrertNæring: false,
                erEndringssøknad,
                eksisterendeSak: sak,
            }),
        { wrapper },
    );

    return result.current.map((steg) => steg.id);
};

describe('dokumentasjonssteg i endringssøknad', () => {
    it.each([
        ['aleneomsorg', { [ContextDataType.ANNEN_FORELDER]: { ...annenForelder, erAleneOmOmsorg: true } }],
        [
            'terminbekreftelse',
            { [ContextDataType.OM_BARNET]: { type: BarnType.UFØDT, antallBarn: 1, termindato: '2026-11-01' } },
        ],
        ['omsorgsovertakelse', { [ContextDataType.SØKERSITUASJON]: { situasjon: 'adopsjon', rolle: 'mor' } }],
        [
            'annen inntekt',
            {
                [ContextDataType.ANDRE_INNTEKTSKILDER]: [
                    { type: 'ETTERLØNN_SLUTTPAKKE', fom: '2023-01-01', tom: '2024-01-01' },
                ],
            },
        ],
    ] satisfies ReadonlyArray<readonly [string, ContextDataMap]>)(
        'skal ikke vise dokumentasjon bare på grunn av %s',
        (_årsak, data) => {
            expect(hentSteg(data, true)).toEqual([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.OPPSUMMERING]);
            expect(hentSteg(data, false)).toContain(SøknadRoutes.DOKUMENTASJON);
        },
    );

    it('skal vise dokumentasjon når en ny periode i uttaksplanen krever vedlegg', () => {
        const steg = hentSteg(
            {
                [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel', rolle: 'far' },
                [ContextDataType.UTTAKSPLAN]: [
                    {
                        ...periodeMedDokumentasjonskrav,
                        fom: '2024-05-01',
                        tom: '2024-05-31',
                        søker: {
                            ...periodeMedDokumentasjonskrav.søker,
                            resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
                        },
                    },
                    periodeMedDokumentasjonskrav,
                ],
                [ContextDataType.ANNEN_FORELDER]: { ...annenForelder, erAleneOmOmsorg: true },
            },
            true,
            eksisterendeSak,
        );

        expect(steg).toEqual([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.DOKUMENTASJON, SøknadRoutes.OPPSUMMERING]);
    });

    it('skal ikke vise dokumentasjon når ny periode ikke krever vedlegg', () => {
        const steg = hentSteg(
            {
                [ContextDataType.UTTAKSPLAN]: [
                    {
                        fom: '2024-06-01',
                        tom: '2024-06-30',
                        søker: {
                            forelder: 'MOR',
                            kontoType: 'MØDREKVOTE',
                            flerbarnsdager: false,
                        },
                    },
                ],
                [ContextDataType.ANNEN_FORELDER]: { ...annenForelder, erAleneOmOmsorg: true },
            },
            true,
            eksisterendeSak,
        );

        expect(steg).toEqual([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.OPPSUMMERING]);
    });

    it('skal ikke kreve ny dokumentasjon for en allerede innvilget periode', () => {
        const steg = hentSteg(
            {
                [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel', rolle: 'far' },
                [ContextDataType.UTTAKSPLAN]: [
                    {
                        ...periodeMedDokumentasjonskrav,
                        søker: {
                            ...periodeMedDokumentasjonskrav.søker,
                            resultat: { innvilget: true, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
                        },
                    },
                ],
                [ContextDataType.ANNEN_FORELDER]: { ...annenForelder, erAleneOmOmsorg: true },
            },
            true,
            eksisterendeSak,
        );

        expect(steg).toEqual([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.OPPSUMMERING]);
    });

    it.each(['LASTET_OPP', 'SEND_SENERE'] as const)(
        'skal beholde dokumentasjonssteget når et vedlegg har innsendingsType %s',
        (innsendingsType) => {
            const steg = hentSteg(
                {
                    [ContextDataType.VEDLEGG]: {
                        [Skjemanummer.TERMINBEKREFTELSE]: [
                            {
                                id: '1',
                                file: new File(['vedlegg'], 'vedlegg.pdf', { type: 'application/pdf' }),
                                filename: 'vedlegg.pdf',
                                innsendingsType,
                                pending: false,
                                skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                                type: AttachmentType.TERMINBEKREFTELSE,
                                uploaded: innsendingsType === 'LASTET_OPP',
                            },
                        ],
                    },
                },
                true,
            );

            expect(steg).toEqual([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.DOKUMENTASJON, SøknadRoutes.OPPSUMMERING]);
        },
    );

    it('skal ikke vise dokumentasjon bare fordi et automatisk vedlegg finnes', () => {
        const steg = hentSteg(
            {
                [ContextDataType.VEDLEGG]: {
                    [Skjemanummer.TERMINBEKREFTELSE]: [
                        {
                            id: '1',
                            file: new File(['vedlegg'], 'vedlegg.pdf', { type: 'application/pdf' }),
                            filename: 'vedlegg.pdf',
                            innsendingsType: 'AUTOMATISK',
                            pending: false,
                            skjemanummer: Skjemanummer.TERMINBEKREFTELSE,
                            type: AttachmentType.TERMINBEKREFTELSE,
                            uploaded: true,
                        },
                    ],
                },
            },
            true,
        );

        expect(steg).toEqual([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.OPPSUMMERING]);
    });
});
