import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';

import { initAmplitude } from '@navikt/fp-metrics';
import { Path } from 'appData/paths';
import Velkommen from './Velkommen';

export default {
    title: 'Velkommen',
    component: Velkommen,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.VELKOMMEN,
    },
};

const Template: StoryFn<{ startSøknad: (start: boolean) => void }> = ({ startSøknad }) => {
    initAmplitude();
    return (
        <Velkommen startSøknad={startSøknad} onChangeLocale={action('button-click')} locale="nb" erVelkommen={false} />
    );
};

export const Default = Template.bind({});
Default.args = {
    startSøknad: action('button-click'),
};
