import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Arbeidsforholdstype } from 'types/Tilrettelegging';

import { AttachmentType, ISO_DATE_FORMAT, Skjemanummer } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';

import TilretteleggingStep from './TilretteleggingStep';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const DEFAULT_ARBEIDSFORHOLD = [
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

type StoryArgs = {
    type: Arbeidsforholdstype;
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof TilretteleggingStep>;

const meta = {
    title: 'steps/TilretteleggingStep',
    component: TilretteleggingStep,
    render: ({ gåTilNesteSide = action('button-click'), type, ...rest }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.TILRETTELEGGING]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.TILRETTELEGGINGER]: [
                            {
                                id: '990322244',
                                arbeidsforhold: {
                                    arbeidsgiverId: '990322244',
                                    type: type,
                                    navn: 'Omsorgspartner Vestfold AS',
                                    stillinger: [],
                                    startdato: '2023-01-01',
                                },
                                varierendePerioder: [],
                                behovForTilretteleggingFom: undefined!,
                                type: undefined!,
                                vedlegg: [
                                    {
                                        id: 'V134300149934973076055420920289127108',
                                        file: {} as any,
                                        filename: 'vedlegg – Kopi (7).png',
                                        filesize: 7477,
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
                        [ContextDataType.VALGT_TILRETTELEGGING_ID]: '990322244',
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
                            fødselsdato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
                        },
                    }}
                >
                    <TilretteleggingStep {...rest} />
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
        arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        type: Arbeidsforholdstype.VIRKSOMHET,
    },
};

export const Frilanser: Story = {
    args: {
        ...Default.args,
        type: Arbeidsforholdstype.FRILANSER,
    },
};
