import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, EsDataContext } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import Velkommen from './Velkommen';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'Velkommen',
    component: Velkommen,
};

const Template: StoryFn<{
    startSøknad: (start: boolean) => void;
    mellomlagreOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
}> = ({ startSøknad, mellomlagreOgNaviger = promiseAction(), gåTilNesteSide }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[Path.VELKOMMEN]}>
            <EsDataContext onDispatch={gåTilNesteSide}>
                <Velkommen
                    startSøknad={startSøknad}
                    onChangeLocale={action('button-click')}
                    locale="nb"
                    erVelkommen={false}
                    mellomlagreOgNaviger={mellomlagreOgNaviger}
                />
            </EsDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
Default.args = {
    startSøknad: action('button-click'),
};
