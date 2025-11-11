import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute, TILRETTELEGGING_PARAM, addTilretteleggingIdToRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { action } from 'storybook/actions';
import { TilOgMedDatoType } from 'types/Tilrettelegging';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

import { FerieSteg } from './FerieSteg';

const arbeidsforhold = [
    {
        arbeidsgiverId: '896929119',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Sykehuset i Vestfold',
        fom: '2014-05-22T00:00:00.000Z',
        stillingsprosent: 32.63,
        tom: '2019-05-31T00:00:00.000Z',
    },
] satisfies EksternArbeidsforholdDto_fpoversikt[];

const meta = {
    title: 'steps/FerieSteg',
    component: FerieSteg,
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        return (
            <MemoryRouter initialEntries={[addTilretteleggingIdToRoute(SøknadRoute.FERIE, '896929119')]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: '2024-12-01',
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
                                behovForTilretteleggingFom: '2024-10-01',
                                type: 'ingen',
                                enPeriodeMedTilretteleggingFom: '2024-10-01',
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

const promiseAction = () => (): Promise<void> => {
    action('button-click')();
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
