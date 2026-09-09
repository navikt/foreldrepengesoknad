import { Meta, StoryObj } from '@storybook/react-vite';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { SelvstendigNæringDto_fpoversikt, SvpPersonopplysningerDto_fpoversikt } from '@navikt/fp-types';

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
} & ComponentProps<typeof EgenNæringSteg>;

const meta = {
    title: 'steps/EgenNæringSteg',
    component: EgenNæringSteg,
    render: ({ gåTilNesteSide = action('button-click'), søkerInfo: _søkerInfo, ...rest }) => {
        const søkerInfo: SvpPersonopplysningerDto_fpoversikt = {
            arbeidsforhold: [],
            fnr: '12345678901',
            fødselsdato: '1990-01-01',
            kjønn: 'K',
            navn: { fornavn: 'Kari', etternavn: 'Nordmann' },
            frilansoppdrag: [],
            selvstendigNæring: DEFAULT_SELVSTENDIG_NÆRING,
        };
        return (
            <MemoryRouter initialEntries={[SøknadRoute.NÆRING]}>
                <SvpDataContext
                    onDispatch={gåTilNesteSide}
                    initialState={{
                        [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
                            harJobbetSomSelvstendigNæringsdrivende: true,
                            harHattArbeidIUtlandet: false,
                            harJobbetSomFrilans: false,
                        },
                        [ContextDataType.OM_BARNET]: {
                            erBarnetFødt: false,
                            termindato: '2024-02-18',
                            fødselsdato: '2024-02-18',
                        },
                    }}
                >
                    <EgenNæringSteg søkerInfo={søkerInfo} {...rest} />
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
