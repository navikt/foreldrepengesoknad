import { MemoryRouter } from 'react-router-dom';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { initAmplitude } from '@navikt/fp-metrics';
import { Action, EsDataContext } from 'appData/EsDataContext';
import SøkersituasjonSteg from './SøkersituasjonSteg';
import { Path } from 'appData/paths';

export default {
    title: 'SøkersituasjonSteg',
    component: SøkersituasjonSteg,
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => void }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = action('button-click'),
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
