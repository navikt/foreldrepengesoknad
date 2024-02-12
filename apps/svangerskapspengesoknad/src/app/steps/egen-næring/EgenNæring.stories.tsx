import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EgenNæringStep from './EgenNæringStep';
import _context from 'storybook/storydata/soknad/soknad.json';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import { MemoryRouter } from 'react-router-dom';

const defaultExport = {
    title: 'steps/EgenNæringStep',
    component: EgenNæringStep,
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
        <MemoryRouter>
            <SvpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.INNTEKTSINFORMASJON]: {
                        harJobbetSomSelvstendigNæringsdrivende: true,
                        harHattAnnenInntekt: false,
                        harJobbetSomFrilans: false,
                    },
                    [ContextDataType.TILRETTELEGGINGER]: context.søknad.tilrettelegging,
                    [ContextDataType.OM_BARNET]: context.søknad.barn,
                }}
            >
                <EgenNæringStep
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={promiseAction()}
                    søkerInfo={context.søkerinfo}
                />
            </SvpDataContext>
        </MemoryRouter>
    );
};
export const Default = Template.bind({});
