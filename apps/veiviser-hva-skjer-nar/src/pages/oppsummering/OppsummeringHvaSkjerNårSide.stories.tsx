import { Meta, StoryObj } from '@storybook/react';
import { HvaSkjerNårRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { Situasjon } from '../situasjon/SituasjonSide';
import { OppsummeringHvaSkjerNårSide } from './OppsummeringHvaSkjerNårSide';

const meta = {
    title: 'hvaSkjerNår/OppsummeringHvaSkjerNårSide',
    component: OppsummeringHvaSkjerNårSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[HvaSkjerNårRoutes.SITUASJON]}>
                <OppsummeringHvaSkjerNårSide {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof OppsummeringHvaSkjerNårSide>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MorOgFarTermin: Story = {
    args: {
        hvaSkjerNårSituasjon: {
            termindato: '2022-12-12',
            erFødt: true,
            situasjon: Situasjon.MOR_OG_FAR,
        },
    },
};
export const MorOgMedmorFødt: Story = {
    args: {
        hvaSkjerNårSituasjon: {
            termindato: '2022-12-12',
            fødselsdato: '2022-12-12',
            erFødt: true,
            situasjon: Situasjon.MOR_OG_MEDMOR,
        },
    },
};
export const FarOgFarTermin: Story = {
    args: {
        hvaSkjerNårSituasjon: {
            termindato: '2022-12-12',
            erFødt: true,
            situasjon: Situasjon.FAR_OG_FAR,
        },
    },
};
export const KunFarEllerMedmor: Story = {
    args: {
        hvaSkjerNårSituasjon: {
            termindato: '2022-12-12',
            fødselsdato: '2022-12-12',
            erFødt: true,
            situasjon: Situasjon.KUN_FAR_ELLER_MEDMOR,
        },
    },
};
export const KunMorFødtFørOktober2021: Story = {
    args: {
        hvaSkjerNårSituasjon: {
            termindato: '2021-09-16',
            fødselsdato: '2021-09-12',
            erFødt: true,
            situasjon: Situasjon.KUN_MOR,
        },
    },
};
export const Aleneomsorg: Story = {
    args: {
        hvaSkjerNårSituasjon: {
            termindato: '2022-12-12',
            fødselsdato: '2022-12-12',
            erFødt: true,
            situasjon: Situasjon.ALENEOMSORG,
        },
    },
};
