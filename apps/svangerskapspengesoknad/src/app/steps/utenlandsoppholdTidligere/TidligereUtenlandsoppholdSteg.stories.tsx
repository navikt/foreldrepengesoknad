import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybook/decorators/withRouter';
import _context from 'storybook/storydata/soknad/soknad.json';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';
import { Action, SvpDataContext, ContextDataType } from 'app/context/SvpDataContext';
import { Utenlandsopphold } from 'app/types/Utenlandsopphold';

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

const context = _context as any;

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsopphold?: Utenlandsopphold;
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
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
