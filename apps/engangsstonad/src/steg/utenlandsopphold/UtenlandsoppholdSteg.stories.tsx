import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { initAmplitude } from '@navikt/fp-metrics';
import { Path } from 'appData/paths';
import { Action, EsDataContext, ContextDataType } from 'appData/EsDataContext';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';
import { MemoryRouter } from 'react-router-dom';

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
