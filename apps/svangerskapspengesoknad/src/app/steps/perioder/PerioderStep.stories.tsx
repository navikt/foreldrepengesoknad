import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Action, ContextDataType, SvpDataContext } from 'app/context/SvpDataContext';
import Tilrettelegging, { Arbeidsforholdstype, TilretteleggingstypeOptions } from 'app/types/Tilrettelegging';
import PerioderStep from './PerioderStep';
import { DelivisTilretteleggingPeriodeType } from 'app/types/DelivisTilretteleggingPeriodeType';

const defaultExport = {
    title: 'steps/PerioderStep',
    component: PerioderStep,
};

export default defaultExport;

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

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

interface Props {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
    tilrettelegging: Tilrettelegging[];
}

const Template: StoryFn<Props> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide = action('button-click'),
    tilrettelegging,
}) => {
    return (
        <SvpDataContext
            onDispatch={gåTilNesteSide}
            initialState={{
                [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
                [ContextDataType.VALGT_TILRETTELEGGING_ID]: '263929546-6215-9868-5127-161910165730101',
                [ContextDataType.OM_BARNET]: {
                    erBarnetFødt: false,
                    termindato: '2024-02-18',
                    fødselsdato: '2024-02-18',
                },
            }}
        >
            <PerioderStep
                mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                avbrytSøknad={promiseAction()}
                arbeidsforhold={arbeidsforhold}
            />
        </SvpDataContext>
    );
};

export const Default = Template.bind({});
Default.args = {
    tilrettelegging: [
        {
            id: '263929546-6215-9868-5127-161910165730101',
            arbeidsforhold: {
                navn: 'Omsorgspartner Vestfold AS',
                stillinger: [{ fom: '2019-01-01', stillingsprosent: 100 }],
            },
            type: TilretteleggingstypeOptions.DELVIS,
            delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        } as Tilrettelegging,
    ],
};

export const FlereStillinger = Template.bind({});
FlereStillinger.args = {
    tilrettelegging: [
        {
            id: '263929546-6215-9868-5127-161910165730101',
            behovForTilretteleggingFom: '2023-09-01',
            arbeidsforhold: {
                navn: 'Omsorgspartner Vestfold AS',
                type: Arbeidsforholdstype.VIRKSOMHET,
                startdato: '2023-09-01',
                stillinger: [
                    { fom: '2023-09-01', stillingsprosent: 10 },
                    { fom: '2023-10-01', stillingsprosent: 20 },
                    { fom: '2023-11-01', stillingsprosent: 0 },
                ],
            },
            type: TilretteleggingstypeOptions.DELVIS,
            delvisTilretteleggingPeriodeType: DelivisTilretteleggingPeriodeType.VARIERTE_PERIODER,
        } as Tilrettelegging,
    ],
};
