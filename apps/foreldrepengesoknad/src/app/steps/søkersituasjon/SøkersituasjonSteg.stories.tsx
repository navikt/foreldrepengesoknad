import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Kjønn } from '@navikt/fp-common';
import withRouter from 'storybook/decorators/withRouter';
import SøkersituasjonSteg from './SøkersituasjonSteg';
import { Action, FpDataContext, FpDataType } from 'app/context/FpDataContext';
import { SøkersituasjonFp } from '@navikt/fp-types';

const promiseAction =
    () =>
    (...args: any[]) => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'steps/SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    decorators: [withRouter],
};

interface Props {
    kjønn: Kjønn;
    søkersituasjon?: SøkersituasjonFp;
    mellomlagreSøknad?: () => Promise<any>;
    avbrytSøknad: () => void;
    gåTilNesteSide: (action: Action) => void;
}

const Template: StoryFn<Props> = ({
    kjønn,
    søkersituasjon,
    mellomlagreSøknad = promiseAction(),
    avbrytSøknad = action('button-click'),
    gåTilNesteSide,
}) => {
    return (
        <FpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [FpDataType.SØKERSITUASJON]: søkersituasjon,
            }}
        >
            o
            <SøkersituasjonSteg kjønn={kjønn} mellomlagreSøknad={mellomlagreSøknad} avbrytSøknad={avbrytSøknad} />
        </FpDataContext>
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
