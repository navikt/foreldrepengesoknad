import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';
import { SAK_1, SAK_2, SAK_3, SAK_4 } from 'storybookData/saker/svpsaker';

import { BehandlingTilstand, Ytelse } from '@navikt/fp-types';

import { LayoutWrapper } from '../../sections/LayoutWrapper';
import { SvangerskapspengeSak } from '../../types/SvangerskapspengeSak';
import { Svangerskapspenger } from './Svangerskapspenger';

const meta = {
    title: 'SVP oversikt',
    component: Svangerskapspenger,
    render: (props) => {
        return (
            <MemoryRouter>
                <LayoutWrapper className="pt-1 pb-1 pl-4 pr-4 bg-deepblue-50">
                    <Svangerskapspenger {...props} />
                </LayoutWrapper>
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof Svangerskapspenger>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Case1: Story = {
    args: {
        svpSak: SAK_1,
    },
};
export const Case2: Story = {
    args: {
        svpSak: SAK_2,
    },
};

export const Case3: Story = {
    args: {
        svpSak: SAK_3,
    },
};

export const Case4: Story = {
    args: {
        svpSak: SAK_4,
    },
};

export const SøknadUtenVedtak: Story = {
    args: {
        svpSak: {
            ytelse: Ytelse.SVANGERSKAPSPENGER,
            saksnummer: '352022460',
            familiehendelse: {
                termindato: '2025-07-29',
                antallBarn: 0,
            },
            sakAvsluttet: false,
            åpenBehandling: {
                tilstand: BehandlingTilstand.VENTER_PÅ_INNTEKTSMELDING,
                søknad: {
                    arbeidsforhold: [
                        {
                            aktivitet: {
                                type: 'ORDINÆRT_ARBEID',
                                arbeidsgiver: {
                                    id: '311343483',
                                    type: 'ORGANISASJON',
                                },
                                arbeidsgiverNavn: 'DYNAMISK OPPSTEMT HAMSTER KF',
                            },
                            behovFrom: '2025-02-17',
                            tilrettelegginger: [
                                {
                                    fom: '2025-04-19',
                                    tom: '2025-04-25',
                                    type: 'DELVIS',
                                    arbeidstidprosent: 50.0,
                                },
                                {
                                    fom: '2025-04-26',
                                    tom: '2025-07-07',
                                    type: 'HEL',
                                },
                                {
                                    fom: '2025-03-15',
                                    tom: '2025-04-13',
                                    type: 'DELVIS',
                                    arbeidstidprosent: 50.0,
                                },
                                {
                                    fom: '2025-02-17',
                                    tom: '2025-03-14',
                                    type: 'DELVIS',
                                    arbeidstidprosent: 89.0,
                                },
                            ],
                            oppholdsperioder: [
                                {
                                    fom: '2025-04-14',
                                    tom: '2025-04-18',
                                    årsak: 'FERIE',
                                    oppholdKilde: 'SØKNAD',
                                },
                            ],
                        },
                    ],
                },
            },
            oppdatertTidspunkt: '2025-03-12T09:19:42.706',
        } satisfies SvangerskapspengeSak,
    },
};

export const SøknadMedFlereDeltidsArbeidsforhold: Story = {
    args: {
        svpSak: {
            ytelse: Ytelse.SVANGERSKAPSPENGER,
            saksnummer: '352022467',
            familiehendelse: {
                termindato: '2025-08-01',
                antallBarn: 0,
            },
            sakAvsluttet: false,
            gjeldendeVedtak: {
                arbeidsforhold: [
                    {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: {
                                id: '315786940',
                                type: 'ORGANISASJON',
                            },
                            arbeidsgiverNavn: 'HELDIG SPRUDLENDE TIGER AS',
                        },
                        behovFrom: '2025-03-18',
                        tilrettelegginger: [
                            {
                                fom: '2025-06-05',
                                tom: '2025-07-10',
                                type: 'DELVIS',
                                arbeidstidprosent: 30.0,
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 25.0,
                                },
                            },
                            {
                                fom: '2025-03-18',
                                tom: '2025-06-04',
                                type: 'DELVIS',
                                arbeidstidprosent: 40.0,
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 10.0,
                                },
                            },
                        ],
                        oppholdsperioder: [],
                        avslutningÅrsak: 'NORMAL',
                    },
                    {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: {
                                id: '311343483',
                                type: 'ORGANISASJON',
                            },
                            arbeidsgiverNavn: 'DYNAMISK OPPSTEMT HAMSTER KF',
                        },
                        behovFrom: '2025-03-18',
                        tilrettelegginger: [
                            {
                                fom: '2025-05-15',
                                tom: '2025-07-10',
                                type: 'DELVIS',
                                arbeidstidprosent: 15.0,
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 25.0,
                                },
                            },
                            {
                                fom: '2025-03-18',
                                tom: '2025-05-14',
                                type: 'DELVIS',
                                arbeidstidprosent: 10.0,
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 50.0,
                                },
                            },
                        ],
                        oppholdsperioder: [],
                        avslutningÅrsak: 'NORMAL',
                    },
                    {
                        aktivitet: {
                            type: 'ORDINÆRT_ARBEID',
                            arbeidsgiver: {
                                id: '315786940',
                                type: 'ORGANISASJON',
                            },
                            arbeidsgiverNavn: 'HELDIG SPRUDLENDE TIGER AS',
                        },
                        behovFrom: '2025-03-18',
                        tilrettelegginger: [
                            {
                                fom: '2025-06-05',
                                tom: '2025-07-10',
                                type: 'DELVIS',
                                arbeidstidprosent: 30.0,
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 50.0,
                                },
                            },
                            {
                                fom: '2025-03-18',
                                tom: '2025-06-04',
                                type: 'DELVIS',
                                arbeidstidprosent: 40.0,
                                resultat: {
                                    resultatType: 'INNVILGET',
                                    utbetalingsgrad: 33.33,
                                },
                            },
                        ],
                        oppholdsperioder: [],
                        avslutningÅrsak: 'NORMAL',
                    },
                ],
            },
            oppdatertTidspunkt: '2025-03-18T14:56:41.456',
        } satisfies SvangerskapspengeSak,
    },
};
