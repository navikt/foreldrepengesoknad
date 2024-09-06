import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { Action, SvpDataContext } from 'app/appData/SvpDataContext';

import Forside from './Forside';

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
    component: Forside,
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        return (
            <SvpDataContext onDispatch={gåTilNesteSide}>
                <Forside {...rest} />
            </SvpDataContext>
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
        onChangeLocale: action('button-click'),
        locale: 'nb',
    },
};
