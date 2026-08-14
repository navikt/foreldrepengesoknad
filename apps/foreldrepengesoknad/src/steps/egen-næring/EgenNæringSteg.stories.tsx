import { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { selvstendigNæringOptions } from 'api/queries';
import { Action, ContextDataType, FpDataContext } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';

import { EgenNæringSteg } from './EgenNæringSteg';

const DEFAULT_SELVSTENDIG_NÆRING = [
    {
        organisasjonsnummer: '998877665',
        navn: 'Kari Konsulent',
        næringstype: 'JORDBRUK_SKOGBRUK',
        underAvvikling: false,
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
    render: ({ gåTilNesteSide = action('button-click'), ...rest }) => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });
        queryClient.setQueryData(selvstendigNæringOptions().queryKey, DEFAULT_SELVSTENDIG_NÆRING);
        return (
            <QueryClientProvider client={queryClient}>
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
                        <EgenNæringSteg {...rest} />
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: () => action('button-click'),
        arbeidsforhold: [],
    },
};
