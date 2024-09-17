import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, SvpDataContext } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '../../../../../packages/metrics';
import { FerieStep } from './FerieStep';

export default {
    title: 'steps/FerieStep',
    component: FerieStep,
};

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const arbeidsforhold = [
    {
        id: '1669400414-9409-3313-0700-3334116100409',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
];

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
}

const Template: StoryFn<Props> = ({ mellomlagreSøknadOgNaviger = promiseAction(), gåTilNesteSide }) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.FERIE]}>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{}}>
                <FerieStep
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={promiseAction()}
                    arbeidsforhold={arbeidsforhold}
                />
            </SvpDataContext>
        </MemoryRouter>
    );
};
export const Default = Template.bind({});
