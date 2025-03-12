import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';
import { SAK_1, SAK_2, SAK_3, SAK_4 } from 'storybookData/saker/svpsaker';

import { LayoutWrapper } from '../../sections/LayoutWrapper';
import { BehandlingTilstand } from '../../types/BehandlingTilstand';
import { SvangerskapspengeSak } from '../../types/SvangerskapspengeSak';
import { Ytelse } from '../../types/Ytelse';
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
