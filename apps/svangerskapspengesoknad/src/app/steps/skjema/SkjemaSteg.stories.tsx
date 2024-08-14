import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';

import { getAxiosInstance } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';

import { Action, ContextDataType, SvpDataContext } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

import SkjemaSteg from './SkjemaSteg';

const file1 = new File(['abc'.repeat(100000)], 'Filnavn1.jpg');
const file2 = new File(['abc'.repeat(500000)], 'Filnavn2.jpg');

const defaultExport = {
    title: 'steps/SkjemaSteg',
    component: SkjemaSteg,
};

export default defaultExport;

const defaultTilrettelegging = {
    id: '990322244',
    arbeidsforhold: {
        arbeidsgiverId: '990322244',
        type: Arbeidsforholdstype.VIRKSOMHET,
        navn: 'Omsorgspartner Vestfold AS',
        stillinger: [],
        startdato: '2023-01-01',
    },
    varierendePerioder: [],
    behovForTilretteleggingFom: undefined!,
    type: undefined!,
    vedlegg: [],
} as Tilrettelegging;

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

interface TilretteleggingStepStoryProps {
    mellomlagreSøknadOgNaviger?: () => Promise<void>;
    gåTilNesteSide?: (action: Action) => void;
    skalFeileOpplasting: boolean;
    maxAntallVedlegg: number;
    tilrettelegging: Tilrettelegging[];
}

const Template: StoryFn<TilretteleggingStepStoryProps> = ({
    mellomlagreSøknadOgNaviger = promiseAction(),
    gåTilNesteSide = action('button-click'),
    skalFeileOpplasting,
    maxAntallVedlegg = 40,
    tilrettelegging,
}) => {
    initAmplitude();
    const apiMock = new MockAdapter(getAxiosInstance());
    if (!skalFeileOpplasting) {
        apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //story
        apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200); //test
    }
    return (
        <MemoryRouter initialEntries={[SøknadRoutes.SKJEMA]}>
            <SvpDataContext
                onDispatch={gåTilNesteSide}
                initialState={{
                    [ContextDataType.INNTEKTSINFORMASJON]: {
                        harHattArbeidIUtlandet: false,
                        harJobbetSomFrilans: false,
                        harJobbetSomSelvstendigNæringsdrivende: false,
                    },
                    [ContextDataType.TILRETTELEGGINGER]: tilrettelegging,
                    [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
                    [ContextDataType.OM_BARNET]: {
                        erBarnetFødt: false,
                        termindato: '2024-02-18',
                        fødselsdato: '2024-02-18',
                    },
                }}
            >
                <SkjemaSteg
                    mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger}
                    avbrytSøknad={promiseAction()}
                    arbeidsforhold={arbeidsforhold}
                    maxAntallVedlegg={maxAntallVedlegg}
                />
            </SvpDataContext>
        </MemoryRouter>
    );
};

export const SkalIkkeFeileOpplasting = Template.bind({});
SkalIkkeFeileOpplasting.args = {
    tilrettelegging: [defaultTilrettelegging],
    skalFeileOpplasting: false,
};

export const SkalFeileOpplasting = Template.bind({});
SkalFeileOpplasting.args = {
    tilrettelegging: [defaultTilrettelegging],
    skalFeileOpplasting: true,
};

export const MedVedlegg = Template.bind({});
MedVedlegg.args = {
    tilrettelegging: [
        {
            ...defaultTilrettelegging,
            vedlegg: [
                {
                    id: 'V134300149934973076055420920289127108',
                    filename: file1.name,
                    filesize: file1.size,
                    file: file1,
                    uploaded: true,
                    pending: false,
                    type: AttachmentType.TILRETTELEGGING,
                    skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                    url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                    uuid: 'Created',
                },
            ],
        },
    ],
    skalFeileOpplasting: false,
};

export const MedToTilrettelegginger = Template.bind({});
MedToTilrettelegginger.args = {
    tilrettelegging: [defaultTilrettelegging, defaultTilrettelegging],
    skalFeileOpplasting: false,
};

export const ErTypeFrilans = Template.bind({});
ErTypeFrilans.args = {
    tilrettelegging: [
        {
            ...defaultTilrettelegging,
            arbeidsforhold: {
                ...defaultTilrettelegging.arbeidsforhold,
                type: Arbeidsforholdstype.FRILANSER,
            },
        },
    ],
    skalFeileOpplasting: false,
};

export const KanMaxHaToVedlegg = Template.bind({});
KanMaxHaToVedlegg.args = {
    tilrettelegging: [
        {
            ...defaultTilrettelegging,
            vedlegg: [
                {
                    id: 'V134300149934973076055420920289127108',
                    filename: file1.name,
                    filesize: file1.size,
                    file: file1,
                    uploaded: true,
                    pending: false,
                    type: AttachmentType.TILRETTELEGGING,
                    skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                    url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                    uuid: 'Created',
                },
            ],
        },
        {
            ...defaultTilrettelegging,
            vedlegg: [
                {
                    id: 'V134300149934973076055420920289127108',
                    filename: file2.name,
                    filesize: file2.size,
                    file: file2,
                    uploaded: true,
                    pending: false,
                    type: AttachmentType.TILRETTELEGGING,
                    skjemanummer: Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING,
                    url: 'http://localhost:8080/foreldrepengesoknad/dist/vedlegg/V134300149934973076055420920289127108',
                    uuid: 'Created',
                },
            ],
        },
    ],
    skalFeileOpplasting: false,
    maxAntallVedlegg: 2,
};
