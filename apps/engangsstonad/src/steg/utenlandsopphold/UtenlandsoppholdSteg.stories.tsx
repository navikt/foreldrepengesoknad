import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => Promise<void> }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = promiseAction(),
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[Path.UTENLANDSOPPHOLD]}>
            <EsDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.SØKERSITUASJON]: { situasjon: 'fødsel' },
                }}
            >
                <UtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
