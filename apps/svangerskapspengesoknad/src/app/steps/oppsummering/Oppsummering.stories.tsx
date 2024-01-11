import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouterProvider from 'storybook/decorators/withRouter';
import _context from 'storybook/storydata/soknad/soknad.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import Oppsummering from './Oppsummering';

const defaultExport = {
    title: 'steps/Oppsummering',
    component: Oppsummering,
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
    sendSøknad: () => Promise<any>;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide,
    sendSøknad = () => Promise.resolve(),
}) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.TILRETTELEGGING]: context.søknad.tilrettelegging,
                [ContextDataType.INNTEKTSINFORMASJON]: {
                    harHattAnnenInntekt: false,
                    harJobbetSomFrilans: false,
                    harJobbetSomSelvstendigNæringsdrivende: false,
                },
                [ContextDataType.OM_BARNET]: context.søknad.barn,
                [ContextDataType.UTENLANDSOPPHOLD]: {
                    iNorgeNeste12Mnd: true,
                    iNorgeSiste12Mnd: true,
                },
            }}
        >
            <Oppsummering
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                søkerInfo={context.søkerinfo}
                sendSøknad={sendSøknad}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
