import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { initAmplitude } from '@navikt/fp-metrics';
import { Path } from 'appData/paths';
import { Action, EsDataContext, ContextDataType } from 'appData/EsDataContext';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';
import { MemoryRouter } from 'react-router-dom';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: true,
    skalBoUtenforNorgeNeste12Mnd: false,
};

export default {
    title: 'TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => void }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = action('button-click'),
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[Path.TIDLIGERE_UTENLANDSOPPHOLD]}>
            <EsDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <TidligereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
            </EsDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
