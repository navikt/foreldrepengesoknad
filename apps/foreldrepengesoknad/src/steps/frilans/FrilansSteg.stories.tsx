import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { EksternArbeidsforholdDto_fpoversikt, FpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

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
        const søkerInfo: FpPersonopplysningerDto_fpoversikt = {
            arbeidsforhold: [],
            barn: [],
            erGift: false,
            fnr: '12345678901',
            fødselsdato: '1990-01-01',
            kjønn: 'K',
            navn: { fornavn: 'Kari', etternavn: 'Nordmann' },
            frilansoppdrag,
            selvstendigNæring: [],
        };

        return (
            <MemoryRouter initialEntries={[SøknadRoutes.FRILANS]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harJobbetSomFrilans: true,
                            harJobbetSomSelvstendigNæringsdrivende: false,
                        },
                    }}
                >
                    <FrilansSteg søkerInfo={søkerInfo} {...rest} />
                </FpDataContext>
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
        søkerInfo: {} as FpPersonopplysningerDto_fpoversikt,
    },
};
