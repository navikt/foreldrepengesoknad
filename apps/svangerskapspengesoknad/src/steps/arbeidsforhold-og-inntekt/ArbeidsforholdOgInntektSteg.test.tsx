import { composeStories } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContextDataType } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './ArbeidsforholdOgInntektSteg.stories';

const { Default } = composeStories(stories);

describe('<ArbeidsforholdOgInntektSteg>', () => {
    it(
        'skal gå til neste steg når informasjon er korrekt',
        mswWrapper(async ({ setHandlers }) => {
            const gåTilNesteSide = vi.fn();
            const mellomlagreSøknadOgNaviger = vi.fn();
            const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
            setHandlers(Default.parameters.msw);

            render(
                <QueryClientProvider client={queryClient}>
                    <Default gåTilNesteSide={gåTilNesteSide} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} />
                </QueryClientProvider>,
            );

            expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
            expect(await screen.findByText('Arbeid som selvstendig næringsdrivende')).toBeInTheDocument();

            await userEvent.click(screen.getAllByText('Nei')[0]!);

            await userEvent.click(screen.getAllByText('Nei')[1]!);

            await userEvent.click(screen.getAllByText('Ja')[2]!);
            expect(screen.getByText('Neste steg')).toBeInTheDocument();

            await userEvent.click(screen.getByText('Neste steg'));

            expect(gåTilNesteSide).toHaveBeenNthCalledWith(1, {
                data: {
                    harHattArbeidIUtlandet: true,
                    harJobbetSomFrilans: false,
                    harJobbetSomSelvstendigNæringsdrivende: false,
                },
                key: ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(2, {
                data: undefined,
                key: ContextDataType.FRILANS,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(3, {
                data: undefined,
                key: ContextDataType.EGEN_NÆRING,
                type: 'update',
            });
            expect(gåTilNesteSide).toHaveBeenNthCalledWith(4, {
                data: SøknadRoute.ARBEID_I_UTLANDET,
                key: ContextDataType.APP_ROUTE,
                type: 'update',
            });

            expect(mellomlagreSøknadOgNaviger).toHaveBeenCalledOnce();
        }),
    );
});
