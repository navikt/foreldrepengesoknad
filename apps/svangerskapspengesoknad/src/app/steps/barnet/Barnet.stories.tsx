import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Barnet from './Barnet';
import { Action, SvpDataContext } from 'app/context/SvpDataContext';

const defaultExport = {
    title: 'steps/Barnet',
    component: Barnet,
};
export default defaultExport;

const arbeidsforhold = [
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-04-09T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2018-09-09T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-06-25T00:00:00.000Z',
        stillingsprosent: 80,
        tom: '2018-08-05T00:00:00.000Z',
    },
    {
        arbeidsgiverId: '975326209',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2019-06-01T00:00:00.000Z',
        stillingsprosent: 85.09,
    },
    {
        arbeidsgiverId: '990322244',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
    {
        arbeidsgiverId: '995090910',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Re Kommune',
        fom: '2018-06-01T00:00:00.000Z',
        stillingsprosent: 0,
    },
];

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
    return (
        <SvpDataContext onDispatch={gåTilNesteSide}>
            <Barnet
                arbeidsforhold={arbeidsforhold}
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
            />
        </SvpDataContext>
    );
};
export const Default = Template.bind({});
