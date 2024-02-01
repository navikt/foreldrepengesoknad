import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Kjønn } from '@navikt/fp-common';
import SøkersituasjonSteg from './SøkersituasjonSteg';
import { Action, FpDataContext, ContextDataType } from 'app/context/FpDataContext';
import { SøkersituasjonFp } from '@navikt/fp-types';
import { MemoryRouter } from 'react-router-dom';
import SøknadRoutes from 'app/routes/routes';
import { initAmplitude } from '@navikt/fp-metrics';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'steps/SøkersituasjonSteg',
    component: SøkersituasjonSteg,
};

interface Props {
    kjønn: Kjønn;
    søkersituasjon?: SøkersituasjonFp;
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    avbrytSøknad: () => void;
    gåTilNesteSide: (action: Action) => void;
}

const Template: StoryFn<Props> = ({
    kjønn,
    søkersituasjon,
    mellomlagreSøknadOgNaviger = promiseAction(),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.SØKERSITUASJON]}>
            <FpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.SØKERSITUASJON]: søkersituasjon,
                }}
            >
                o
                <SøkersituasjonSteg
                    kjønn={kjønn}
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={avbrytSøknad}
                />
            </FpDataContext>
        </MemoryRouter>
    );
};

export const Mor = Template.bind({});
Mor.args = {
    kjønn: 'K',
};

export const Far = Template.bind({});
Far.args = {
    kjønn: 'M',
};

export const HarMellomlagretData = Template.bind({});
HarMellomlagretData.args = {
    kjønn: 'K',
    søkersituasjon: {
        situasjon: 'adopsjon',
        rolle: 'mor',
    },
};
