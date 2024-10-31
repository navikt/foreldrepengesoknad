import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import annenPartsVedtak from 'storybookData/annenPartVedtak/annenPartVedtak.json';
import dokumenter from 'storybookData/dokumenter/dokumenter.json';
import satser from 'storybookData/inntektsmeldinger/satser.json';
import manglendeVedlegg from 'storybookData/manglendeVedlegg/manglendeVedlegg.json';
import saker from 'storybookData/saker/saker.json';
import søkerinfo from 'storybookData/sokerinfo/sokerinfo.json';
import tidslinjeHendelser from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.json';

import { SaksperiodeNy } from '@navikt/fp-types';

import { BehandlingTilstand } from '../../types/BehandlingTilstand';
import OversiktRoutes from './../../routes/routes';
import { SøkerinfoDTO } from './../../types/SøkerinfoDTO';
import Saksoversikt from './Saksoversikt';

const queryClient = new QueryClient();

type StoryArgs = {
    søkerinfo: SøkerinfoDTO;
};

const meta = {
    title: 'Saksoversikt',
    render: (props) => {
        const isFirstRender = useRef(false);
        return (
            <div className="bg-deepblue-50">
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                        <Routes>
                            <Route
                                element={<Saksoversikt {...props} isFirstRender={isFirstRender} />}
                                path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`}
                            />
                        </Routes>
                    </MemoryRouter>
                </QueryClientProvider>
            </div>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/dokument/alle', () => HttpResponse.json(dokumenter)),
                http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker)),
                http.get('https://oversikt/rest/innsyn/tidslinje', () => HttpResponse.json(tidslinjeHendelser)),
                http.get('https://oversikt/rest/historikk/vedlegg', () => HttpResponse.json(manglendeVedlegg)),
                http.get('https://oversikt/rest/innsyn/v2/saker/oppdatert', () => HttpResponse.json(true)),
                http.post('https://oversikt/rest/innsyn/v2/annenPartVedtak', () => HttpResponse.json(annenPartsVedtak)),
            ],
        },
    },
    args: {
        søkerinfo: søkerinfo as SøkerinfoDTO,
    },
};

export const Engangsstønad: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get('https://oversikt/rest/innsyn/v2/saker', () =>
                    HttpResponse.json({
                        foreldrepenger: [],
                        engangsstønad: [
                            {
                                saksnummer: '352011079',
                                sakAvsluttet: false,
                                gjelderAdopsjon: false,
                                familiehendelse: {
                                    fødselsdato: '2024-01-01',
                                    termindato: '2024-01-01',
                                    antallBarn: 1,
                                },
                                åpenBehandling: {
                                    tilstand: BehandlingTilstand.TIDLIG_SØKNAD,
                                    søknadsperioder: [
                                        {
                                            fom: '2024-01-01',
                                            tom: '2024-10-01',
                                        },
                                    ] as SaksperiodeNy[],
                                },
                                oppdatertTidspunkt: '2024-02-28T21:19:08.911',
                            },
                        ],
                        svangerskapspenger: [],
                    }),
                ),
                http.get('https://oversikt/rest/innsyn/tidslinje', () =>
                    HttpResponse.json([
                        {
                            type: 'søknad',
                            opprettet: '2023-01-31T09:06:46.541655',
                            aktørType: 'BRUKER',
                            tidslinjeHendelseType: 'FØRSTEGANGSSØKNAD',
                            dokumenter: [
                                {
                                    type: 'INNGÅENDE_DOKUMENT',
                                    mottatt: '2023-01-31T09:06:48',
                                    saksnummer: '352011079',
                                    tittel: 'Søknad om foreldrepenger ved fødsel',
                                    journalpostId: '598115874',
                                    dokumentId: '624862989',
                                },
                            ],
                            manglendeVedlegg: [],
                        },
                    ]),
                ),
                http.get('https://oversikt/rest/historikk/vedlegg', () => HttpResponse.json()),
                http.get('https://oversikt/rest/innsyn/v2/saker/oppdatert', () => HttpResponse.json(true)),
                http.get('https://oversikt/rest/satser', () => HttpResponse.json(satser)),
            ],
        },
    },
    args: {
        søkerinfo: søkerinfo as SøkerinfoDTO,
    },
};
