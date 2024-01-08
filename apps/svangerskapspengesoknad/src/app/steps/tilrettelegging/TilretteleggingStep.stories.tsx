import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouterProvider from 'storybook/decorators/withRouter';
import TilretteleggingStep from './TilretteleggingStep';
import _context from 'storybook/storydata/soknad/soknad.json';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';

const defaultExport = {
    title: 'steps/TilretteleggingStep',
    component: TilretteleggingStep,
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
                [ContextDataType.TILRETTELEGGING]: context.søknad.tilrettelegging,
                [ContextDataType.TILRETTELEGGING_ID]: context.currentTilretteleggingId,
                [ContextDataType.OM_BARNET]: context.søknad.barn,
            }}
        >
            <TilretteleggingStep
                id={'263929546-6215-9868-5127-161910165730101'}
                typeArbeid={Arbeidsforholdstype.VIRKSOMHET}
                navn={'Omsorgspartner Vestfold AS'}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
            />
        </SvpDataContext>
    );
};
export const Default = Template.bind({});
