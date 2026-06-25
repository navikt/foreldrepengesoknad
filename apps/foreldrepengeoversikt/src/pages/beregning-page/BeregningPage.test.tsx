import { composeStories } from '@storybook/react-vite';
import { screen, within } from '@testing-library/react';

import * as stories from './BeregningPage.stories.tsx';

const {
    BeregningDelvisRefusjon,
    BeregningDirekteUtbetaling,
    BeregningSvpDirekteUtbetaling,
    BeregningDagpenger,
    BeregningAAP,
    BeregningKunYtelse,
    BeregningMedNaturalytelser,
    BeregningCrossYear,
} = composeStories(stories);

describe('<BeregningPage>', () => {
    it('BeregningDelvisRefusjon', async () => {
        await BeregningDelvisRefusjon.run();

        expect(await screen.findByText('Beregning av foreldrepenger')).toBeInTheDocument();
        expect(await screen.findByText('Dagsats: 3 004 kr')).toBeInTheDocument();

        const merOmBeregningen = await screen.findByText('Mer om beregningen');
        merOmBeregningen.click();

        const beregningCard = within(merOmBeregningen.closest('section')!);
        expect(await beregningCard.findByText('NAV FAMILIE- OG PENSJONSYTELSER OSLO - 992257822')).toBeInTheDocument();
        expect(await beregningCard.findByText('Frilans')).toBeInTheDocument();

        expect(await screen.findByText('Utbetalingsplan')).toBeInTheDocument();
        const januarExpansionCard = await screen.findByTestId('expansioncard-Januar');
        expect(within(januarExpansionCard).getByText('Vi skal betale til deg: 39 368 kr')).toBeInTheDocument();
        expect(within(januarExpansionCard).getByText('Vi skal betale til arbeidsgiver: 2 688 kr')).toBeInTheDocument();

        expect(await screen.findByText('Feriepenger')).toBeInTheDocument();
        expect(await screen.findByText('Opptjent i 2026')).toBeInTheDocument();
        expect(await screen.findByText('10 594 kr som vi betaler til deg.')).toBeInTheDocument();
        expect(await screen.findByText('1 175 kr som vi betaler til arbeidsgiveren din.')).toBeInTheDocument();
        expect(
            await screen.findByText(
                'De utbetales til deg innen utgangen av mai 2027 og litt senere til arbeidsgiveren din',
            ),
        ).toBeInTheDocument();
    });

    it('BeregningDirekteUtbetaling', async () => {
        await BeregningDirekteUtbetaling.run();

        expect(await screen.findByText('Nav har fastsatt årsinntekten din til:', { exact: false })).toBeInTheDocument();
        expect(await screen.findByText('960 000 kr', { exact: false })).toBeInTheDocument();

        expect(await screen.findByText('Du får dekket foreldrepenger opptil 780 960 kr (6 G)')).toBeInTheDocument();

        expect(await screen.findByText('Utbetalingsplan')).toBeInTheDocument();
        const januarExpansionCard = await screen.findByTestId('expansioncard-November');
        expect(within(januarExpansionCard).getByText('Vi skal betale til deg: 39 052 kr')).toBeInTheDocument();

        expect(await screen.findByText('Feriepenger')).toBeInTheDocument();
        expect(await screen.findByText('Opptjent i 2025')).toBeInTheDocument();
        expect(await screen.findByText('11 030 kr som vi betaler til deg.')).toBeInTheDocument();
        expect(await screen.findByText('De utbetales innen utgangen av mai 2026.')).toBeInTheDocument();

        expect(await screen.findByText('Opptjent i 2026')).toBeInTheDocument();
        expect(await screen.findByText('7 354 kr som vi betaler til deg.')).toBeInTheDocument();
        expect(await screen.findByText('De utbetales innen utgangen av mai 2027.')).toBeInTheDocument();
    });

    it('BeregningSvpDirekteUtbetaling', async () => {
        await BeregningSvpDirekteUtbetaling.run();

        // SVP-specific heading
        expect(await screen.findByText('Beregning av svangerskapspenger')).toBeInTheDocument();

        // Dagsats ExpansionCard should NOT be shown for SVP
        expect(screen.queryByText('Dagsats: 2 077 kr')).not.toBeInTheDocument();

        // Annual income shown
        expect(await screen.findByText('Nav har fastsatt årsinntekten din til:', { exact: false })).toBeInTheDocument();

        // 80% reduction should NOT be shown (FP-only with ÅTTI dekningsgrad)
        expect(screen.queryByText('Siden du har', { exact: false })).not.toBeInTheDocument();

        // Utbetalingsplan renders
        expect(await screen.findByText('Utbetalingsplan')).toBeInTheDocument();
        const marsExpansionCard = await screen.findByTestId('expansioncard-Mars');
        expect(within(marsExpansionCard).getByText('Vi skal betale til deg:', { exact: false })).toBeInTheDocument();

        // Feriepenger section renders
        expect(await screen.findByText('Feriepenger')).toBeInTheDocument();
        expect(await screen.findByText('Opptjent i 2026')).toBeInTheDocument();
        expect(await screen.findByText('7 893 kr som vi betaler til deg.')).toBeInTheDocument();
    });

    it('BeregningDagpenger - viser forenklet visning med vedtakslenke', async () => {
        await BeregningDagpenger.run();

        expect(await screen.findByText('Beregning')).toBeInTheDocument();
        expect(await screen.findByRole('link', { name: 'I vedtaksbrevet ditt' })).toBeInTheDocument();
        expect(screen.queryByText('Nav har fastsatt årsinntekten din til:', { exact: false })).not.toBeInTheDocument();
    });

    it('BeregningAAP - viser forenklet visning med vedtakslenke', async () => {
        await BeregningAAP.run();

        expect(await screen.findByText('Beregning')).toBeInTheDocument();
        expect(await screen.findByRole('link', { name: 'I vedtaksbrevet ditt' })).toBeInTheDocument();
        expect(screen.queryByText('Nav har fastsatt årsinntekten din til:', { exact: false })).not.toBeInTheDocument();
    });

    it('BeregningKunYtelse - viser forenklet visning med vedtakslenke', async () => {
        await BeregningKunYtelse.run();

        expect(await screen.findByText('Beregning')).toBeInTheDocument();
        expect(await screen.findByRole('link', { name: 'I vedtaksbrevet ditt' })).toBeInTheDocument();
        expect(screen.queryByText('Nav har fastsatt årsinntekten din til:', { exact: false })).not.toBeInTheDocument();
    });

    it('BeregningMedNaturalytelser - viser kulepunkt om naturalytelser', async () => {
        await BeregningMedNaturalytelser.run();

        expect(await screen.findByText('Beregning av foreldrepenger')).toBeInTheDocument();
        expect(await screen.findByRole('link', { name: 'inntektsmeldingen' })).toBeInTheDocument();
    });

    it('BeregningCrossYear - months spanning two years are not merged', async () => {
        await BeregningCrossYear.run();

        const utbetalingsplanHeading = await screen.findByText('Utbetalingsplan');
        expect(utbetalingsplanHeading).toBeInTheDocument();

        const utbetalingsplanContainer =
            utbetalingsplanHeading.closest('section') ?? utbetalingsplanHeading.parentElement;
        expect(utbetalingsplanContainer).not.toBeNull();

        const utbetalingsplan = within(utbetalingsplanContainer as HTMLElement);

        // Both year headings should be visible in the payment plan section
        expect(await utbetalingsplan.findByText('2026')).toBeInTheDocument();
        expect(await utbetalingsplan.findByText('2027')).toBeInTheDocument();

        // Months that exist in both years should appear as separate expansion cards
        const juniCards = await screen.findAllByTestId('expansioncard-Juni');
        expect(juniCards).toHaveLength(2);
    });
});
