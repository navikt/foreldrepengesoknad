import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import { Action, ContextDataType, FpDataContext } from 'app/context/FpDataContext';
import SøknadRoutes from 'app/routes/routes';

import AndreInntektskilderSteg from './AndreInntektskilderSteg';

const defaultExport = {
    title: 'steps/AndreInntektskilderSteg',
    component: AndreInntektskilderSteg,
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
    arbeidsforhold?: Arbeidsforhold[];
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide = action('button-click'),
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.ANDRE_INNTEKTER]}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                        harJobbetSomFrilans: false,
                        harJobbetSomSelvstendigNæringsdrivende: false,
                        harHattAndreInntektskilder: true,
                    },
                }}
            >
                <AndreInntektskilderSteg
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={promiseAction()}
                    arbeidsforhold={[]}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
