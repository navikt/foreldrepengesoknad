import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';

import { mswWrapper } from '@navikt/fp-utils-test';

import * as stories from './BeregningPage.stories.tsx';

const { BeregningDelvisRefusjon, BeregningDirekteUtbetaling } = composeStories(stories);

describe('<BeregningPage>', () => {
    it(
        'BeregningDelvisRefusjon',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BeregningDelvisRefusjon.parameters.msw);
            render(<BeregningDelvisRefusjon />);

            expect(await screen.findByText('Beregning av din ytelse')).toBeInTheDocument();
            expect(await screen.findByText('Dagsats: 3 004 kr')).toBeInTheDocument();

            (await screen.findByText('Beregning av foreldrepenger')).click();

            expect(await screen.findByText('NAV FAMILIE- OG PENSJONSYTELSER OSLO - 992257822')).toBeInTheDocument();
            expect(await screen.findByText('Frilans')).toBeInTheDocument();

            expect(await screen.findByText('Utbetalingsplan')).toBeInTheDocument();
            const januarExpansionCard = await screen.findByTestId('expansioncard-Januar');
            expect(within(januarExpansionCard).getByText('Utbetales direkte til deg: 39 368 kr')).toBeInTheDocument();
            expect(within(januarExpansionCard).getByText('Utbetales til arbeidsgiver: 2 688 kr')).toBeInTheDocument();

            expect(await screen.findByText('Feriepenger')).toBeInTheDocument();
            expect(await screen.findByText('Opptjent i 2026')).toBeInTheDocument();
            expect(await screen.findByText('10 594 kr som vi betaler til deg')).toBeInTheDocument();
            expect(await screen.findByText('1 175 kr som vi betaler til arbeidsgiveren din')).toBeInTheDocument();
            expect(
                await screen.findByText(
                    'Vi utbetaler direkte til deg innen utgangen av mai 2027 og litt senere til arbeidsgiveren din',
                ),
            ).toBeInTheDocument();
        }),
    );

    it(
        'BeregningDirekteUtbetaling',
        mswWrapper(async ({ setHandlers }) => {
            setHandlers(BeregningDirekteUtbetaling.parameters.msw);
            render(<BeregningDirekteUtbetaling />);

            expect(await screen.findByText('Utbetalingsplan')).toBeInTheDocument();
            const januarExpansionCard = await screen.findByTestId('expansioncard-November');
            expect(within(januarExpansionCard).getByText('Utbetales direkte til deg: 39 052 kr')).toBeInTheDocument();

            expect(await screen.findByText('Feriepenger')).toBeInTheDocument();
            expect(await screen.findByText('Opptjent i 2025')).toBeInTheDocument();
            expect(await screen.findByText('11 030 kr som vi betaler til deg')).toBeInTheDocument();
            expect(
                await screen.findByText('Vi utbetaler direkte til deg innen utgangen av mai 2026.'),
            ).toBeInTheDocument();

            expect(await screen.findByText('Opptjent i 2025')).toBeInTheDocument();
            expect(await screen.findByText('7 354 kr som vi betaler til deg')).toBeInTheDocument();
            expect(
                await screen.findByText('Vi utbetaler direkte til deg innen utgangen av mai 2027.'),
            ).toBeInTheDocument();
        }),
    );
});
