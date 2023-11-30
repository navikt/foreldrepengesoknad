import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';

import { initAmplitude } from '@navikt/fp-metrics';
import { Path } from 'appData/paths';
import Velkommen from './Velkommen';
import { Action, EsDataContext } from 'appData/EsDataContext';

export default {
    title: 'Velkommen',
    component: Velkommen,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.VELKOMMEN,
    },
};

const Template: StoryFn<{
    startSøknad: (start: boolean) => void;
    mellomlagreOgNaviger?: () => void;
    gåTilNesteSide: (action: Action) => void;
}> = ({ startSøknad, mellomlagreOgNaviger = action('button-click'), gåTilNesteSide }) => {
    initAmplitude();
    return (
        <EsDataContext onDispatch={gåTilNesteSide}>
            <Velkommen
                startSøknad={startSøknad}
                onChangeLocale={action('button-click')}
                locale="nb"
                erVelkommen={false}
                mellomlagreOgNaviger={mellomlagreOgNaviger}
            />
        </EsDataContext>
    );
};

export const Default = Template.bind({});
Default.args = {
    startSøknad: action('button-click'),
};
