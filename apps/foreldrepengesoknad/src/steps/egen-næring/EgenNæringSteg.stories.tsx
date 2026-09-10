import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { FpPersonopplysningerDto_fpoversikt, SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

import { EgenNæringSteg } from './EgenNæringSteg';

const DEFAULT_SELVSTENDIG_NÆRING = [
    {
        organisasjonsnummer: '998877665',
        navn: 'Kari Konsulent',
        næringstype: 'JORDBRUK_SKOGBRUK',
    },
] satisfies SelvstendigNæringDto_fpoversikt[];

const promiseAction = () => () => {
    action('button-click')();
    return Promise.resolve();
};

type StoryArgs = {
    gåTilNesteSide?: (action: Action) => void;
    selvstendigNæring?: SelvstendigNæringDto_fpoversikt[];
} & ComponentProps<typeof EgenNæringSteg>;

const meta = {
    title: 'steps/EgenNæringSteg',
    component: EgenNæringSteg,
    render: ({
        gåTilNesteSide = action('button-click'),
        selvstendigNæring = DEFAULT_SELVSTENDIG_NÆRING,
        søkerInfo: _søkerInfo,
        ...rest
    }) => {
        const søkerInfo: FpPersonopplysningerDto_fpoversikt = {
            arbeidsforhold: [],
            barn: [],
            erGift: false,
            fnr: '12345678901',
            fødselsdato: '1990-01-01',
            kjønn: 'K',
            navn: { fornavn: 'Kari', etternavn: 'Nordmann' },
            frilansoppdrag: [],
            selvstendigNæring,
        };
        return (
            <MemoryRouter initialEntries={[SøknadRoutes.EGEN_NÆRING]}>
                <FpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harJobbetSomSelvstendigNæringsdrivende: true,
                            harJobbetSomFrilans: false,
                        },
                    }}
                >
                    <EgenNæringSteg søkerInfo={søkerInfo} {...rest} />
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
