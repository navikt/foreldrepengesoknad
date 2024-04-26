import { Meta, StoryObj } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import MockAdapter from 'axios-mock-adapter';
import { StrictMode } from 'react';

import { initAmplitude } from '@navikt/fp-metrics';

import AppContainer from './AppContainer';
import { planleggerApi } from './Planlegger';

const kontoer = {
    '100': {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 80,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 90,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
};

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
            const apiMock = new MockAdapter(planleggerApi);
            apiMock.onPost('https://foreldrepengesoknad-api.intern.dev.nav.no/rest/konto').reply(() => {
                return [200, kontoer];
            });
        }

        return (
            <StrictMode>
                <PlanleggerDataContext onDispatch={args.gåTilNesteSide}>
                    <AppContainer />
                </PlanleggerDataContext>
            </StrictMode>
        );
    },
};
