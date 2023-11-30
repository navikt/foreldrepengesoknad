import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { initAmplitude } from '@navikt/fp-metrics';
import withRouter from 'storybook/decorators/withRouter';
import { Path } from 'appData/paths';
import { Action, EsDataContext } from 'appData/EsDataContext';
import SøkersituasjonSteg from './SøkersituasjonSteg';

export default {
    title: 'SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.SØKERSITUASJON,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => void }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = action('button-click'),
}) => {
    initAmplitude();
    return (
        <EsDataContext onDispatch={gåTilNesteSide}>
            <SøkersituasjonSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
        </EsDataContext>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
