import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute, TILRETTELEGGING_PARAM, addTilretteleggingIdToRoute } from 'appData/routes';
import dayjs from 'dayjs';
import { ComponentProps } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TilOgMedDatoType, Tilretteleggingstype } from 'types/Tilrettelegging';

import { initAmplitude } from '@navikt/fp-metrics';

import { FerieSteg } from './FerieSteg';

const arbeidsforhold = [
    {
        id: '896929119',
        arbeidsgiverId: '896929119',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
];

const meta = {
    title: 'steps/FerieSteg',
    component: FerieSteg,
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[addTilretteleggingIdToRoute(SøknadRoute.FERIE, '896929119')]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: dayjs(new Date()).add(2, 'month').toISOString(),
                            fødselsdato: undefined,
                        },
                        [ContextDataType.VALGTE_ARBEIDSFORHOLD]: ['896929119'],
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harJobbetSomFrilans: false,
                            harJobbetSomSelvstendigNæringsdrivende: false,
                            harHattArbeidIUtlandet: false,
                        },
                        [ContextDataType.TILRETTELEGGINGER]: {
                            '896929119': {
                                behovForTilretteleggingFom: dayjs(new Date()).subtract(2, 'day').toISOString(),
                                type: Tilretteleggingstype.INGEN,
                                enPeriodeMedTilretteleggingFom: dayjs(new Date()).subtract(2, 'day').toISOString(),
                                enPeriodeMedTilretteleggingTomType: TilOgMedDatoType.SISTE_DAG_MED_SVP,
                            },
                        },
                    }}
                >
                    <Routes>
                        <Route
                            element={<FerieSteg {...rest} />}
                            path={`/${SøknadRoute.FERIE}/${TILRETTELEGGING_PARAM}`}
                        />
                    </Routes>
                </SvpDataContext>
            </MemoryRouter>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

const promiseAction =
    () =>
    (...args: any): Promise<any> => {
        action('button-click')(...args);
        return Promise.resolve();
    };

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
} & ComponentProps<typeof FerieSteg>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        arbeidsforhold,
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: promiseAction(),
    },
};
