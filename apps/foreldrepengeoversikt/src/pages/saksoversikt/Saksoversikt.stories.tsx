import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { annenPartVedtak } from 'storybookData/annenPartVedtak/annenPartVedtak';
import { dokumenter } from 'storybookData/dokumenter/dokumenter';
import { manglendeVedlegg } from 'storybookData/manglendeVedlegg/manglendeVedlegg';
import { saker } from 'storybookData/saker/saker';
import { SAK_1 } from 'storybookData/saker/svpsaker';
import { søkerinfo } from 'storybookData/sokerinfo/sokerinfo';
import { tidslinjeHendelser } from 'storybookData/tidslinjeHendelser/tidslinjeHendelser';

import { PersonMedArbeidsforholdDto_fpoversikt, Saker_fpoversikt } from '@navikt/fp-types';
import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { OversiktRoutes } from '../../routes/routes';
import { Saksoversikt } from './Saksoversikt';

type StoryArgs = {
    søkerinfo: PersonMedArbeidsforholdDto_fpoversikt;
    saksnummer: string;
};

const meta = {
    title: 'Saksoversikt',
    decorators: [withQueryClient],
    render: ({ saksnummer, ...props }) => {
        return (
            <div className="bg-ax-brand-blue-100">
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/${saksnummer}`]}>
                    <Routes>
                        <Route element={<Saksoversikt {...props} />} path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`} />
                    </Routes>
                </MemoryRouter>
            </div>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Foreldrepenger: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)),
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
                http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak)),
            ],
        },
    },
    args: {
        søkerinfo: søkerinfo,
        saksnummer: '1',
    },
};

export const Engangsstønad: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () =>
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
                                    tilstand: 'UNDER_BEHANDLING',
                                },
                                oppdatertTidspunkt: '2024-02-28T21:19:08.911',
                            },
                        ],
                        svangerskapspenger: [],
                    } satisfies Saker_fpoversikt),
                ),
                http.get(API_URLS.tidslinje, () =>
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
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json()),
            ],
        },
    },
    args: {
        søkerinfo: søkerinfo,
        saksnummer: '352011079',
    },
};

export const Svangerskapspenger: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.dokumenter, () => HttpResponse.json(dokumenter)),
                http.get(API_URLS.saker, () =>
                    HttpResponse.json({
                        foreldrepenger: [],
                        engangsstønad: [],
                        svangerskapspenger: [SAK_1],
                    }),
                ),
                http.get(API_URLS.tidslinje, () => HttpResponse.json(tidslinjeHendelser)),
                http.get(API_URLS.manglendeVedlegg, () => HttpResponse.json(manglendeVedlegg)),
                http.post(API_URLS.annenPartVedtak, () => HttpResponse.json(annenPartVedtak)),
            ],
        },
    },
    args: {
        saksnummer: '202',
        søkerinfo: søkerinfo,
    },
};
