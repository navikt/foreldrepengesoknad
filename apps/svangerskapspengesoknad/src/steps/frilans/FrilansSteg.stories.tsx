import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { EksternArbeidsforholdDto_fpoversikt, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

import { FrilansSteg } from './FrilansSteg';

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    frilansoppdrag?: EksternArbeidsforholdDto_fpoversikt[];
} & ComponentProps<typeof FrilansSteg>;

const meta = {
    title: 'steps/FrilansSteg',
    component: FrilansSteg,
    render: ({ gåTilNesteSide = action('button-click'), frilansoppdrag = [], søkerInfo: _søkerInfo, ...rest }) => {
        const søkerInfo: SvpPersonopplysningerDto_fpoversikt = {
            arbeidsforhold: [],
            fnr: '12345678901',
            fødselsdato: '1990-01-01',
            kjønn: 'K',
            navn: { fornavn: 'Kari', etternavn: 'Nordmann' },
            frilansoppdrag,
            selvstendigNæring: [],
        };

        return (
            <MemoryRouter initialEntries={[SøknadRoute.FRILANS]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harJobbetSomFrilans: true,
                            harHattArbeidIUtlandet: false,
                            harJobbetSomSelvstendigNæringsdrivende: false,
                        },

                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: '2024-02-18',
                            fødselsdato: '2024-02-18',
                        },
                    }}
                >
                    <FrilansSteg søkerInfo={søkerInfo} {...rest} />
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
        avbrytSøknad: () => action('button-click'),
        søkerInfo: {} as SvpPersonopplysningerDto_fpoversikt,
    },
};
