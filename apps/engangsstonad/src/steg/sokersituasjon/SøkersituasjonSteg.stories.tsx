import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import SøkersituasjonSteg from './SøkersituasjonSteg';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'SøkersituasjonSteg',
    component: SøkersituasjonSteg,
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => Promise<void> }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = promiseAction(),
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[Path.SØKERSITUASJON]}>
            <EsDataContext onDispatch={gåTilNesteSide}>
                <SøkersituasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
