import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import EgenNæringSteg from './EgenNæringSteg';

const defaultExport = {
    title: 'steps/EgenNæringSteg',
    component: EgenNæringSteg,
};

export default defaultExport;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
}

const Template: StoryFn<Props> = ({ mellomlagreSøknadOgNaviger = promiseAction(), gåTilNesteSide }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.EGEN_NÆRING]}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                        harJobbetSomSelvstendigNæringsdrivende: true,
                        harHattAndreInntektskilder: false,
                        harJobbetSomFrilans: false,
                    },
                }}
            >
                <EgenNæringSteg
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={promiseAction()}
                    arbeidsforhold={[]}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};
export const Default = Template.bind({});
