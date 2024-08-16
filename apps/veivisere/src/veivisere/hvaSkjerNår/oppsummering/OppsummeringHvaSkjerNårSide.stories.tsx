import { Meta, StoryObj } from '@storybook/react';
import { HvaSkjerNårRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Action } from 'vite-plugin-checker/dist/esm/types';

import { initAmplitude } from '@navikt/fp-metrics';

import { Situasjon } from '../situasjon/SituasjonSide';
import OppsummeringHvaSkjerNårSide from './OppsummeringHvaSkjerNårSide';

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof OppsummeringHvaSkjerNårSide>;

type Story = StoryObj<StoryArgs>;

const customRenderer = ({ hvaSkjerNårSituasjon }: StoryArgs) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[HvaSkjerNårRoutes.SITUASJON]}>
            <OppsummeringHvaSkjerNårSide hvaSkjerNårSituasjon={hvaSkjerNårSituasjon} />
        </MemoryRouter>
    );
};

const meta = {
    title: 'hvaSkjerNår/OppsummeringHvaSkjerNårSide',
    component: OppsummeringHvaSkjerNårSide,
    render: customRenderer,
} satisfies Meta<typeof OppsummeringHvaSkjerNårSide>;
export default meta;

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
