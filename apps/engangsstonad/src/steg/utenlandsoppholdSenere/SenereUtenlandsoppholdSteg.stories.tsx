import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { initAmplitude } from '@navikt/fp-metrics';
import { Path } from 'appData/paths';
import { Action, EsDataContext, EsDataType } from 'appData/EsDataContext';
import SenereUtenlandsoppholdSteg from './SenereUtenlandsoppholdSteg';
import { MemoryRouter } from 'react-router-dom';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: true,
};

export default {
    title: 'SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => void }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = action('button-click'),
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[Path.SENERE_UTENLANDSOPPHOLD]}>
            <EsDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
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
