import { Meta, StoryObj } from '@storybook/react-vite';
import { HttpResponse, http } from 'msw';
import { saker } from 'storybookData/saker/saker';
import { stønadskvoter1 } from 'storybookData/stønadskvoter/stønadskvoter1';
import { stønadskvoter2 } from 'storybookData/stønadskvoter/stønadskvoter2';

import { FellesUttaksplanDto_fpoversikt } from '@navikt/fp-types';
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

const innvilget = {
    innvilget: true,
    trekkerMinsterett: true,
    trekkerDager: true,
    årsak: 'ANNET',
} as const;

export const Default: Story = {
    beforeEach({ msw }) {
        msw.use(
            http.post(API_URLS.konto, () => HttpResponse.json(stønadskvoter1)),
            http.post(API_URLS.uttaksplan, () =>
                HttpResponse.json({
                    antallBarn: 1,
                    dekningsgrad: 'HUNDRE',
                    termindato: '2022-07-01',
                    perioder: [
                        {
                            fom: '2022-06-10',
                            tom: '2022-06-30',
                            søker: {
                                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                                resultat: innvilget,
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                        },
                        {
                            fom: '2022-07-01',
                            tom: '2022-08-11',
                            søker: {
                                kontoType: 'MØDREKVOTE',
                                resultat: innvilget,
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                        },
                        {
                            fom: '2022-08-12',
                            tom: '2022-10-13',
                            søker: {
                                kontoType: 'MØDREKVOTE',
                                resultat: innvilget,
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                        },
                        {
                            fom: '2022-10-14',
                            tom: '2022-12-21',
                            søker: {
                                kontoType: 'FELLESPERIODE',
                                resultat: innvilget,
                                flerbarnsdager: false,
                                forelder: 'MOR',
                                samtidigUttak: 50,
                            },
                            annenPart: {
                                kontoType: 'FEDREKVOTE',
                                forelder: 'FAR_MEDMOR',
                                samtidigUttak: 50,
                                flerbarnsdager: false,
                            },
                        },
                    ],
                } satisfies FellesUttaksplanDto_fpoversikt),
            ),
        );
    },

    args: {
        sak: { ...saker.foreldrepenger[0]!, ytelse: 'FORELDREPENGER' as const },
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};

export const FarSøker: Story = {
    beforeEach({ msw }) {
        msw.use(
            http.post(API_URLS.konto, () => HttpResponse.json(stønadskvoter2)),
            http.post(API_URLS.uttaksplan, () =>
                HttpResponse.json({
                    antallBarn: 1,
                    dekningsgrad: 'HUNDRE',
                    termindato: '2024-10-01',
                    perioder: [
                        {
                            fom: '2024-09-10',
                            tom: '2024-09-30',
                            annenPart: {
                                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                                forelder: 'MOR',
                                flerbarnsdager: false,
                            },
                        },
                        {
                            fom: '2024-10-01',
                            tom: '2024-10-14',
                            søker: {
                                kontoType: 'FEDREKVOTE',
                                forelder: 'FAR_MEDMOR',
                                samtidigUttak: 100,
                                flerbarnsdager: false,
                            },
                            annenPart: {
                                kontoType: 'MØDREKVOTE',
                                forelder: 'MOR',
                                samtidigUttak: 100,
                                flerbarnsdager: false,
                            },
                        },
                        {
                            fom: '2024-10-15',
                            tom: '2024-12-09',
                            annenPart: {
                                kontoType: 'MØDREKVOTE',
                                forelder: 'MOR',
                                flerbarnsdager: false,
                            },
                        },
                        {
                            fom: '2024-12-10',
                            tom: '2024-12-31',
                            annenPart: {
                                kontoType: 'FELLESPERIODE',
                                forelder: 'MOR',
                                flerbarnsdager: false,
                            },
                        },
                        {
                            fom: '2025-01-01',
                            tom: '2025-02-04',
                            søker: {
                                forelder: 'FAR_MEDMOR',
                                kontoType: 'MØDREKVOTE',
                                overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
                                flerbarnsdager: false,
                            },
                        },
                        {
                            fom: '2025-02-05',
                            tom: '2025-03-11',
                            annenPart: {
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
                        },
                        {
                            fom: '2025-03-19',
                            tom: '2025-04-22',
                            annenPart: {
                                kontoType: 'FELLESPERIODE',
                                forelder: 'MOR',
                                flerbarnsdager: false,
                            },
                        },
                    ],
                } satisfies FellesUttaksplanDto_fpoversikt),
            ),
        );
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
            barn: [
                {
                    fnr: '01472254177',
                },
            ],
            dekningsgrad: 'HUNDRE',
            forelder: 'FAR_MEDMOR',
            ytelse: 'FORELDREPENGER' as const,
        },
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};

export const MorOgFarOgFarGraderer: Story = {
    name: 'Mor og far søker - far graderer',

    beforeEach({ msw }) {
        msw.use(
            http.post(API_URLS.konto, () => HttpResponse.json(stønadskvoter2)),
            http.post(API_URLS.uttaksplan, () =>
                HttpResponse.json({
                    antallBarn: 1,
                    dekningsgrad: 'HUNDRE',
                    termindato: '2025-03-25',
                    perioder: [
                        {
                            fom: '2025-03-04',
                            tom: '2025-03-24',
                            søker: {
                                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                                resultat: innvilget,
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                        },
                        {
                            fom: '2025-03-25',
                            tom: '2025-07-07',
                            søker: {
                                kontoType: 'MØDREKVOTE',
                                resultat: innvilget,
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                        },
                        {
                            fom: '2025-07-08',
                            tom: '2025-09-01',
                            søker: {
                                kontoType: 'FELLESPERIODE',
                                resultat: innvilget,
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                        },
                        {
                            fom: '2025-09-23',
                            tom: '2025-11-17',
                            annenPart: {
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
                        },
                        {
                            fom: '2025-11-18',
                            tom: '2026-01-12',
                            annenPart: {
                                kontoType: 'FELLESPERIODE',
                                resultat: innvilget,
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
                        },
                        {
                            fom: '2026-03-17',
                            tom: '2026-10-12',
                            annenPart: {
                                kontoType: 'FEDREKVOTE',
                                resultat: innvilget,
                                gradering: {
                                    arbeidstidprosent: 50,
                                    aktivitet: {
                                        type: 'ORDINÆRT_ARBEID',
                                    },
                                },
                                flerbarnsdager: false,
                                forelder: 'FAR_MEDMOR',
                            },
                        },
                    ],
                } satisfies FellesUttaksplanDto_fpoversikt),
            ),
        );
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
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};

export const MorMedFarSomHarTattOverMødrekvote: Story = {
    name: 'Mor - far har tatt over mødrekvote de første seks ukene',

    beforeEach({ msw }) {
        msw.use(
            http.post(API_URLS.konto, () => HttpResponse.json(stønadskvoter2)),
            http.post(API_URLS.uttaksplan, () =>
                HttpResponse.json({
                    antallBarn: 1,
                    dekningsgrad: 'HUNDRE',
                    termindato: '2025-03-25',
                    perioder: [
                        {
                            fom: '2025-03-25',
                            tom: '2025-05-06',
                            søker: {
                                kontoType: 'MØDREKVOTE',
                                resultat: {
                                    innvilget: false,
                                    trekkerDager: false,
                                    trekkerMinsterett: false,
                                    årsak: 'ANNET',
                                },
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                            annenPart: {
                                kontoType: 'MØDREKVOTE',
                                overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
                                resultat: {
                                    innvilget: true,
                                    trekkerDager: true,
                                    trekkerMinsterett: false,
                                    årsak: 'ANNET',
                                },
                                flerbarnsdager: false,
                                forelder: 'FAR_MEDMOR',
                            },
                        },
                        {
                            fom: '2025-05-07',
                            tom: '2025-06-30',
                            søker: {
                                kontoType: 'FELLESPERIODE',
                                flerbarnsdager: false,
                                forelder: 'MOR',
                            },
                        },
                    ],
                } satisfies FellesUttaksplanDto_fpoversikt),
            ),
        );
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
            annenPart: { fnr: '29459848930' },
            familiehendelse: { fødselsdato: '2025-03-25', termindato: '2025-03-25', antallBarn: 1 },
            barn: [{ fnr: '22442356029' }],
            dekningsgrad: 'HUNDRE',
            oppdatertTidspunkt: '2025-09-16T14:09:43.208',
            forelder: 'MOR',
            ytelse: 'FORELDREPENGER' as const,
        },
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};
