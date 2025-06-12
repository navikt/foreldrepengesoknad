import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, SvpDataContext } from 'appData/SvpDataContext';
import { HttpResponse, http } from 'msw';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { action } from 'storybook/actions';
import { ingenSaker, saker } from 'storybookData/saker/saker';

import { withQueryClient } from '@navikt/fp-utils-test';

import { Forside } from './Forside';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof Forside>;

const meta = {
    title: 'pages/Forside',
    component: Forside,
    decorators: [withQueryClient],
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        return (
            <MemoryRouter>
                <SvpDataContext onDispatch={gåTilNesteSide}>
                    <Forside {...rest} />
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        setHarGodkjentVilkår: action('button-click'),
        mellomlagreSøknadOgNaviger: promiseAction(),
        harGodkjentVilkår: false,
    },
    parameters: {
        msw: {
            handlers: [
                http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(ingenSaker)),
            ],
        },
    },
};

export const MedEksisterendeSøknad: Story = {
    args: {
        setHarGodkjentVilkår: action('button-click'),
        mellomlagreSøknadOgNaviger: promiseAction(),
        harGodkjentVilkår: false,
    },
    parameters: {
        msw: {
            handlers: [http.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`, () => HttpResponse.json(saker))],
        },
    },
};
