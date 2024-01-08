import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouterProvider from 'storybook/decorators/withRouter';
import _context from 'storybook/storydata/soknad/soknad.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import ArbeidIUtlandetStep from '../arbeid-i-utlandet/ArbeidIUtlandetStep';
import ArbeidIUtlandet from './ArbeidIUtlandetStep';

const defaultExport = {
    title: 'steps/ArbeidIUtlandet',
    component: ArbeidIUtlandet,
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
                    harHattAnnenInntekt: true,
                },
                [ContextDataType.OM_BARNET]: context.søknad.barn,
            }}
        >
            <ArbeidIUtlandetStep
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
