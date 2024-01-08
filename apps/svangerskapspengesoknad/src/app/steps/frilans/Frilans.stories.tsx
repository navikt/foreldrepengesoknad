import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouterProvider from 'storybook/decorators/withRouter';
import FrilansStep from './FrilansStep';
import _context from 'storybook/storydata/soknad/soknad.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';

const defaultExport = {
    title: 'steps/FrilansStep',
    component: FrilansStep,
    decorators: [withRouterProvider],
};

export default defaultExport;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const context = _context as any;

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
}

const Template: StoryFn<Props> = ({ mellomlagreSøknadOgNaviger = promiseAction(), gåTilNesteSide }) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.SØKER]: {
                    ...context.søknad.søker,
                    harJobbetSomFrilans: true,
                },
                [ContextDataType.TILRETTELEGGING]: context.søknad.tilrettelegging,
                [ContextDataType.OM_BARNET]: context.søknad.barn,
            }}
        >
            <FrilansStep
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};
export const Default = Template.bind({});
