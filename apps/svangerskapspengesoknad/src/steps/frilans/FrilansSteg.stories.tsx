import { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Action, ContextDataType, SvpDataContext } from 'appData/SvpDataContext';
import { mineFrilansoppdragOptions, selvstendigNæringOptions } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import { ComponentProps } from 'react';
import { MemoryRouter } from 'react-router';
import { action } from 'storybook/actions';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';

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
    render: ({ gåTilNesteSide = action('button-click'), frilansoppdrag = [], ...rest }) => {
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        queryClient.setQueryData(mineFrilansoppdragOptions().queryKey, frilansoppdrag);
        queryClient.setQueryData(selvstendigNæringOptions().queryKey, []);

        return (
            <QueryClientProvider client={queryClient}>
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
                        <FrilansSteg {...rest} />
                    </SvpDataContext>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        arbeidsforhold: [],
        mellomlagreSøknadOgNaviger: promiseAction(),
        avbrytSøknad: () => action('button-click'),
    },
};
