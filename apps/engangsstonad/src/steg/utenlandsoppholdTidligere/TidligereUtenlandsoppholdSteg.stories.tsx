import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import { initAmplitude } from '@navikt/fp-metrics';
import { Path } from 'appData/paths';
import { Action, EsDataContext, EsDataType } from 'appData/EsDataContext';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: true,
    skalBoUtenforNorgeNeste12Mnd: false,
};

export default {
    title: 'TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.TIDLIGERE_UTENLANDSOPPHOLD,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void; mellomlagreOgNaviger?: () => void }> = ({
    gåTilNesteSide,
    mellomlagreOgNaviger = action('button-click'),
}) => {
    initAmplitude();
    return (
        <EsDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
            }}
        >
            <TidligereUtenlandsoppholdSteg mellomlagreOgNaviger={mellomlagreOgNaviger} />
        </EsDataContext>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
