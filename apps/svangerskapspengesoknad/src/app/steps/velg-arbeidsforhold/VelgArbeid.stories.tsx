import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouterProvider from 'storybook/decorators/withRouter';
import VelgArbeid from './VelgArbeid';
import _context from 'storybook/storydata/soknad/soknad.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';

const defaultExport = {
    title: 'steps/VelgArbeid',
    component: VelgArbeid,
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
                [ContextDataType.INNTEKTSINFORMASJON]: {
                    harHattAnnenInntekt: false,
                    harJobbetSomFrilans: false,
                    harJobbetSomSelvstendigNæringsdrivende: false,
                },
                [ContextDataType.TILRETTELEGGINGER]: [],
                [ContextDataType.OM_BARNET]: context.søknad.barn,
            }}
        >
            <VelgArbeid
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={context.søkerinfo}
            />
        </SvpDataContext>
    );
};
export const Default = Template.bind({});
