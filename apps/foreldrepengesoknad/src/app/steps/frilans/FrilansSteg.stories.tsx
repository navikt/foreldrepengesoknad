import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import FrilansSteg from './FrilansSteg';

const defaultExport = {
    title: 'steps/FrilansSteg',
    component: FrilansSteg,
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

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide = action('button-click'),
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.FRILANS]}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                        harJobbetSomFrilans: true,
                        harJobbetSomSelvstendigNæringsdrivende: false,
                        harHattAndreInntektskilder: false,
                    },
                }}
            >
                <FrilansSteg
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={promiseAction()}
                    arbeidsforhold={[]}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};
export const Default = Template.bind({});
