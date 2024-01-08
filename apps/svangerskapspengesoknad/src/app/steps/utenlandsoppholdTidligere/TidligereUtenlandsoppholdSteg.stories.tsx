import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';
import { Action, SvpDataContext, ContextDataType } from 'app/context/SvpDataContext';
import { Opphold } from 'app/types/InformasjonOmUtenlandsopphold';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'steps/TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
    decorators: [withRouter],
};

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsopphold?: Opphold;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    utenlandsopphold = {
        iNorgeNeste12Mnd: true,
        iNorgeSiste12Mnd: false,
    },
}) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
            }}
        >
            <TidligereUtenlandsoppholdSteg
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={() => undefined}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
