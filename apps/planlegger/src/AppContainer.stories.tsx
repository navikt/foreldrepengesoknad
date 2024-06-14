import { Meta, StoryObj } from '@storybook/react';
import { Action } from 'appData/PlanleggerDataContext';
import MockAdapter from 'axios-mock-adapter';
import { StrictMode } from 'react';

import { getAxiosInstance } from '@navikt/fp-api';
import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import AppContainer from './AppContainer';

const kontoer = {
    '100': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 80,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 90,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
} as TilgjengeligeStønadskontoer;

const meta = {
    title: 'AppContainer',
    component: AppContainer,
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<{
    gåTilNesteSide: (action: Action) => void;
    brukStønadskontoMock?: boolean;
}>;

export const Default: Story = {
    render: (args) => {
        initAmplitude();
        if (args.brukStønadskontoMock) {
            const apiMock = new MockAdapter(getAxiosInstance());
            apiMock.onPost('/rest/konto').reply(() => {
                return [200, kontoer];
            });
        }

        return (
            <StrictMode>
                <AppContainer />
            </StrictMode>
        );
    },
};
