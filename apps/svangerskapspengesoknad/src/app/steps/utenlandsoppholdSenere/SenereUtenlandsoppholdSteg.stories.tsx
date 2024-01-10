import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import _context from 'storybook/storydata/soknad/soknad.json';
import SenereUtenlandsoppholdSteg from './SenereUtenlandsoppholdSteg';
import { Action, SvpDataContext, ContextDataType } from 'app/context/SvpDataContext';
import { Opphold } from 'app/types/InformasjonOmUtenlandsopphold';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const context = _context as any;

const defaultUtenlandsopphold = {
    iNorgeNeste12Mnd: false,
    iNorgeSiste12Mnd: true,
};

export default {
    title: 'steps/SenereUtenlandsoppholdSteg',
    component: SenereUtenlandsoppholdSteg,
    decorators: [withRouter],
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsforhold: Opphold;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    utenlandsforhold = defaultUtenlandsopphold,
}) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold,
            }}
        >
            <SenereUtenlandsoppholdSteg
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={action('button-click')}
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
