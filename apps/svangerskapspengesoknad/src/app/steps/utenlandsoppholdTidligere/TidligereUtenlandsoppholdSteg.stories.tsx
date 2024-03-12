import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';
import { Utenlandsopphold } from '@navikt/fp-types';

import { Action, ContextDataType, SvpDataContext } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';

import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

export default {
    title: 'steps/TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
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
    {
        id: '149599873-5769-19110-21897-6184606004018',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-04-09T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2018-09-09T00:00:00.000Z',
    },
    {
        id: '86832061-1118-9701-6179-20647729409710',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-06-25T00:00:00.000Z',
        stillingsprosent: 80,
        tom: '2018-08-05T00:00:00.000Z',
    },
    {
        id: '186699244-06994-0884-1562-860234771205',
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2019-06-01T00:00:00.000Z',
        stillingsprosent: 85.09,
    },
    {
        id: '263929546-6215-9868-5127-161910165730101',
        arbeidsgiverId: '990322244',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        id: '0132715641-23932-19917-03900-809964087910',
        arbeidsgiverId: '995090910',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2018-06-01T00:00:00.000Z',
        stillingsprosent: 0,
    },
];

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide: (action: Action) => void;
    utenlandsopphold?: Utenlandsopphold;
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide = action('button-click'),
    utenlandsopphold = {
        harBoddUtenforNorgeSiste12Mnd: true,
        skalBoUtenforNorgeNeste12Mnd: false,
    },
}) => {
    initAmplitude();
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.HAR_BODD_I_UTLANDET]}>
            <SvpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <TidligereUtenlandsoppholdSteg
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={() => undefined}
                    arbeidsforhold={arbeidsforhold}
                />
            </SvpDataContext>
        </MemoryRouter>
    );
};

export const Default = Template.bind({});
