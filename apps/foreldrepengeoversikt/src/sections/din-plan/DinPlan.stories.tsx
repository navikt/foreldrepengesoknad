import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { OversiktRoutes } from '../../routes/routes';
import { DinPlanWrapper as DinPlan } from './DinPlan';

const STØNADSKONTOER = {
    '80': {
        kontoer: [
            {
                konto: 'FELLESPERIODE',
                dager: 90,
            },
            {
                konto: 'MØDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 95,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
        tillegg: {
            flerbarn: 0,
            prematur: 0,
        },
    },
    '100': {
        kontoer: [
            {
                konto: 'FELLESPERIODE',
                dager: 80,
            },
            {
                konto: 'MØDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FEDREKVOTE',
                dager: 75,
            },
            {
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
        tillegg: {
            flerbarn: 0,
            prematur: 0,
        },
    },
};

const meta = {
    title: 'DinPlan',
    component: DinPlan,
    decorators: [withQueryClient],
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/1`]}>
                <Routes>
                    <Route element={<DinPlan {...props} />} path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`} />
                </Routes>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof DinPlan>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(API_URLS.saker, () => HttpResponse.json(saker)),
                http.post(API_URLS.konto, () => HttpResponse.json(STØNADSKONTOER)),
            ],
        },
    },
    args: {
        annenPartsPerioder: [
            {
                fom: '2022-10-14',
                tom: '2022-12-21',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 50,
            },
        ],
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};

export const FarSøker: Story = {
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.konto, async ({ request }) => {
                    const body = await request.json();
                    const response = await fetch('https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto', {
                        body: JSON.stringify(body),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
                http.get(API_URLS.saker, () =>
                    HttpResponse.json({
                        foreldrepenger: [
                            {
                                oppdatertTidspunkt: '2024-02-28T21:19:08.911',
                                saksnummer: '1',
                                sakAvsluttet: false,
                                kanSøkeOmEndring: true,
                                sakTilhørerMor: false,
                                gjelderAdopsjon: false,
                                morUføretrygd: false,
                                harAnnenForelderTilsvarendeRettEØS: false,
                                ønskerJustertUttakVedFødsel: false,
                                rettighetType: 'BEGGE_RETT',
                                annenPart: {
                                    fnr: '03506715317',
                                },
                                familiehendelse: {
                                    fødselsdato: '2024-10-01',
                                    termindato: '2024-10-01',
                                    antallBarn: 1,
                                },
                                gjeldendeVedtak: {
                                    perioder: [
                                        {
                                            fom: '2024-10-01',
                                            tom: '2024-10-14',
                                            kontoType: 'FEDREKVOTE',
                                            forelder: 'FAR_MEDMOR',
                                            samtidigUttak: 100,
                                        },
                                        {
                                            fom: '2025-01-01',
                                            tom: '2025-02-04',
                                            forelder: 'FAR_MEDMOR',
                                            kontoType: 'MØDREKVOTE',
                                            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
                                        },
                                    ],
                                },
                                barn: [
                                    {
                                        fnr: '01472254177',
                                    },
                                ],
                                dekningsgrad: 'HUNDRE',
                            },
                        ],
                        engangsstønad: [],
                        svangerskapspenger: [],
                    }),
                ),
            ],
        },
    },
    args: {
        annenPartsPerioder: [
            {
                fom: '2024-09-10',
                tom: '2024-09-30',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
            },
            {
                fom: '2024-10-01',
                tom: '2024-10-14',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                samtidigUttak: 100,
            },
            {
                fom: '2024-10-15',
                tom: '2024-12-09',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
            },
            {
                fom: '2024-12-10',
                tom: '2024-12-31',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
            },
            {
                fom: '2025-02-05',
                tom: '2025-03-11',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                gradering: {
                    arbeidstidprosent: 50,
                    aktivitet: {
                        type: 'FRILANS',
                    },
                },
            },
            {
                fom: '2025-03-19',
                tom: '2025-04-22',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
            },
        ],
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};

export const MorOgFarOgFarGraderer: Story = {
    name: 'Mor og far søker - far graderer',
    parameters: {
        msw: {
            handlers: [
                http.post(API_URLS.konto, async ({ request }) => {
                    const body = await request.json();
                    const response = await fetch('https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api/konto', {
                        body: JSON.stringify(body),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
                http.get(API_URLS.saker, () =>
                    HttpResponse.json({
                        foreldrepenger: [
                            {
                                saksnummer: '1',
                                sakAvsluttet: false,
                                kanSøkeOmEndring: true,
                                sakTilhørerMor: true,
                                gjelderAdopsjon: false,
                                morUføretrygd: false,
                                harAnnenForelderTilsvarendeRettEØS: false,
                                ønskerJustertUttakVedFødsel: false,
                                rettighetType: 'BEGGE_RETT',
                                annenPart: {
                                    fnr: '29459848930',
                                },
                                familiehendelse: {
                                    fødselsdato: '2025-03-25',
                                    termindato: '2025-03-25',
                                    antallBarn: 1,
                                },
                                gjeldendeVedtak: {
                                    perioder: [
                                        {
                                            fom: '2025-03-04',
                                            tom: '2025-03-24',
                                            kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                                            resultat: {
                                                innvilget: true,
                                                trekkerMinsterett: true,
                                                trekkerDager: true,
                                                årsak: 'ANNET',
                                            },
                                            flerbarnsdager: false,
                                            forelder: 'MOR',
                                        },
                                        {
                                            fom: '2025-03-25',
                                            tom: '2025-07-07',
                                            kontoType: 'MØDREKVOTE',
                                            resultat: {
                                                innvilget: true,
                                                trekkerMinsterett: true,
                                                trekkerDager: true,
                                                årsak: 'ANNET',
                                            },
                                            flerbarnsdager: false,
                                            forelder: 'MOR',
                                        },
                                        {
                                            fom: '2025-07-08',
                                            tom: '2025-09-01',
                                            kontoType: 'FELLESPERIODE',
                                            resultat: {
                                                innvilget: true,
                                                trekkerMinsterett: true,
                                                trekkerDager: true,
                                                årsak: 'ANNET',
                                            },
                                            flerbarnsdager: false,
                                            forelder: 'MOR',
                                        },
                                    ],
                                    perioderAnnenpartEøs: [],
                                },
                                barn: [
                                    {
                                        fnr: '22442356029',
                                    },
                                ],
                                dekningsgrad: 'HUNDRE',
                                oppdatertTidspunkt: '2025-09-16T14:09:43.208',
                                forelder: 'MOR',
                            },
                        ],
                        engangsstønad: [],
                        svangerskapspenger: [],
                    }),
                ),
            ],
        },
    },
    args: {
        annenPartsPerioder: [
            {
                fom: '2025-09-23',
                tom: '2025-11-17',
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: false,
                    trekkerMinsterett: false,
                    trekkerDager: false,
                    årsak: 'ANNET',
                },
                gradering: {
                    arbeidstidprosent: 50,
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                    },
                },
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2025-11-18',
                tom: '2026-01-12',
                kontoType: 'FELLESPERIODE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                gradering: {
                    arbeidstidprosent: 50,
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                    },
                },
                morsAktivitet: 'ARBEID',
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
            {
                fom: '2026-03-17',
                tom: '2026-10-12',
                kontoType: 'FEDREKVOTE',
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: true,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                gradering: {
                    arbeidstidprosent: 50,
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                    },
                },
                flerbarnsdager: false,
                forelder: 'FAR_MEDMOR',
            },
        ],
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};
