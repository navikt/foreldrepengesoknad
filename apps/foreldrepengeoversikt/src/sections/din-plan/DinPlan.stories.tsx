import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { saker } from 'storybookData/saker/saker';
import { stønadskontoer1 } from 'storybookData/stønadskontoer/stønadskontoer1';
import { stønadskontoer2 } from 'storybookData/stønadskontoer/stønadskontoer2';

import { withQueryClient } from '@navikt/fp-utils-test';

import { API_URLS } from '../../api/queries.ts';
import { DinPlan } from './DinPlan';

const meta = {
    title: 'DinPlan',
    component: DinPlan,
    decorators: [withQueryClient],
} satisfies Meta<typeof DinPlan>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [http.post(API_URLS.konto, () => HttpResponse.json(stønadskontoer1))],
        },
    },
    args: {
        sak: { ...saker.foreldrepenger[0]!, ytelse: 'FORELDREPENGER' as const },
        annenPartsPerioder: [
            {
                fom: '2022-10-14',
                tom: '2022-12-21',
                kontoType: 'FEDREKVOTE',
                forelder: 'FAR_MEDMOR',
                samtidigUttak: 50,
                flerbarnsdager: false,
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
            handlers: [http.post(API_URLS.konto, () => HttpResponse.json(stønadskontoer2))],
        },
    },
    args: {
        sak: {
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
                        flerbarnsdager: false,
                    },
                    {
                        fom: '2025-01-01',
                        tom: '2025-02-04',
                        forelder: 'FAR_MEDMOR',
                        kontoType: 'MØDREKVOTE',
                        overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
                        flerbarnsdager: false,
                    },
                ],
            },
            barn: [
                {
                    fnr: '01472254177',
                },
            ],
            dekningsgrad: 'HUNDRE',
            ytelse: 'FORELDREPENGER' as const,
        },
        annenPartsPerioder: [
            {
                fom: '2024-09-10',
                tom: '2024-09-30',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-10-01',
                tom: '2024-10-14',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                samtidigUttak: 100,
                flerbarnsdager: false,
            },
            {
                fom: '2024-10-15',
                tom: '2024-12-09',
                kontoType: 'MØDREKVOTE',
                forelder: 'MOR',
                flerbarnsdager: false,
            },
            {
                fom: '2024-12-10',
                tom: '2024-12-31',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                flerbarnsdager: false,
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
                flerbarnsdager: false,
            },
            {
                fom: '2025-03-19',
                tom: '2025-04-22',
                kontoType: 'FELLESPERIODE',
                forelder: 'MOR',
                flerbarnsdager: false,
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
            handlers: [http.post(API_URLS.konto, () => HttpResponse.json(stønadskontoer2))],
        },
    },
    args: {
        sak: {
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
            ytelse: 'FORELDREPENGER' as const,
        },
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

