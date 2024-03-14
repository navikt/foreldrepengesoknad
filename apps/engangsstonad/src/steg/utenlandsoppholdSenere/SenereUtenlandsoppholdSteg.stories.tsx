import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, ContextDataType, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import SenereUtenlandsoppholdSteg from './SenereUtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: true,
};

export default {
    title: 'SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => Promise<void> }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = promiseAction(),
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[Path.SENERE_UTENLANDSOPPHOLD]}>
            <EsDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <SenereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
