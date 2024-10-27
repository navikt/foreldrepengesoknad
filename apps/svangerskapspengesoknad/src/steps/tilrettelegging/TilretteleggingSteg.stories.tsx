import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute, TILRETTELEGGING_PARAM, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { EGEN_NÆRING_ID, EgenNæring, FRILANS_ID, Frilans, Næringstype } from '@navikt/fp-types';

import { TilretteleggingSteg } from './TilretteleggingSteg';

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

const VALGT_TILRETTELEGGING_ID = '990322244';
const ANNEN_TILRETTELEGGING_ID = '975326209';

const DEFAULT_ARBEIDSFORHOLD = [
    {
        arbeidsgiverId: ANNEN_TILRETTELEGGING_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2018-04-09T00:00:00.000Z',
        stillingsprosent: 0,
        tom: '2018-09-09T00:00:00.000Z',
    },

    {
        arbeidsgiverId: VALGT_TILRETTELEGGING_ID,
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
        fom: '2017-04-05T00:00:00.000Z',
        stillingsprosent: 100,
    },
];

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    frilans?: Frilans;
    egenNæring?: EgenNæring;
    valgteArbeidsforhold?: string[];
    valgtTilretteleggingId: string;
} & ComponentProps<typeof TilretteleggingSteg>;

const meta = {
    title: 'steps/TilretteleggingSteg',
    component: TilretteleggingSteg,
    render: ({
        gåTilNesteSide = action('button-click'),
        frilans,
        egenNæring,
        valgteArbeidsforhold,
        valgtTilretteleggingId,
        ...rest
    }) => {
        initAmplitude();
        return (
            <MemoryRouter
                initialEntries={[addTilretteleggingIdToRoute(SøknadRoute.TILRETTELEGGING, valgtTilretteleggingId)]}
            >
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.FRILANS]: frilans,
                        [ContextDataType.EGEN_NÆRING]: egenNæring,
                        [ContextDataType.VALGTE_ARBEIDSFORHOLD]: valgteArbeidsforhold,
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harHattArbeidIUtlandet: false,
                            harJobbetSomFrilans: !!frilans,
                            harJobbetSomSelvstendigNæringsdrivende: !!egenNæring,
                        },
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
                            fødselsdato: dayjs().add(45, 'days').format(ISO_DATE_FORMAT),
                        },
                    }}
                >
                    <Routes>
                        <Route
                            element={<TilretteleggingSteg {...rest} />}
                            path={`/${SøknadRoute.TILRETTELEGGING}/${TILRETTELEGGING_PARAM}`}
                        />
                    </Routes>
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ForArbeidsforhold: Story = {
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
        arbeidsforhold: DEFAULT_ARBEIDSFORHOLD,
        valgtTilretteleggingId: VALGT_TILRETTELEGGING_ID,
    },
};

export const ForArbeidsforholdMedFlereTilrettelegginger: Story = {
    args: {
        ...ForArbeidsforhold.args,
        valgteArbeidsforhold: [VALGT_TILRETTELEGGING_ID, ANNEN_TILRETTELEGGING_ID],
    },
};

export const Frilanser: Story = {
    args: {
        ...ForArbeidsforhold.args,
        arbeidsforhold: [],
        valgtTilretteleggingId: FRILANS_ID,
        frilans: {
            jobberFremdelesSomFrilans: true,
            oppstart: '2024-01-01',
        },
    },
};

export const FrilanserMedFlereTilrettelegginger: Story = {
    args: {
        ...Frilanser.args,
        valgteArbeidsforhold: [FRILANS_ID, VALGT_TILRETTELEGGING_ID],
    },
};

export const SelvstendigNæring: Story = {
    args: {
        ...ForArbeidsforhold.args,
        arbeidsforhold: [],
        valgtTilretteleggingId: EGEN_NÆRING_ID,
        egenNæring: {
            fom: '2024-01-01',
            tom: '2024-10-01',
            pågående: false,
            registrertINorge: true,
            næringstype: Næringstype.FISKER,
        },
    },
};

export const SelvstendigNæringMedFlereTilrettelegginger: Story = {
    args: {
        ...SelvstendigNæring.args,
        valgteArbeidsforhold: [EGEN_NÆRING_ID, VALGT_TILRETTELEGGING_ID],
    },
};
