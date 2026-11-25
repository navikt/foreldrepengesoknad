import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './UttaksplanLegend.stories';

const { VisAlleMedTekst, VisAlleUtenTekst } = composeStories(stories);

describe('<UttaksplanLegend>', () => {
    it('skal kunne åpne og lukke fargeforklaringen med tastatur', async () => {
        render(<VisAlleUtenTekst />);

        expect(screen.queryByText('Hva fargene betyr')).not.toBeInTheDocument();

        const åpneKnapp = screen.getByRole('button', { name: 'Åpne fargeforklaring' });
        expect(åpneKnapp).toHaveAttribute('aria-expanded', 'false');

        åpneKnapp.focus();
        await userEvent.keyboard('{Enter}');

        expect(screen.getByText('Hva fargene betyr')).toBeInTheDocument();
        const lukkKnapp = screen.getByRole('button', { name: 'Lukk fargeforklaring' });
        expect(lukkKnapp).toHaveAttribute('aria-expanded', 'true');
        expect(lukkKnapp).toHaveFocus();

        await userEvent.keyboard('{Enter}');

        expect(screen.queryByText('Hva fargene betyr')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Åpne fargeforklaring' })).toHaveFocus();
    });

    it('skal vise ikke-klikkbare fargebokser som tekst for skjermleser og ikke som deaktiverte knapper', () => {
        render(<VisAlleUtenTekst />);

        expect(screen.getAllByRole('button')).toHaveLength(1);
        expect(screen.getByText('Helg')).toBeInTheDocument();
    });

    it('skal vise valgt tilstand med aria-pressed på klikkbare forklaringer', async () => {
        render(<VisAlleMedTekst />);

        const [førsteKlikkbare] = screen.getAllByRole('button', { pressed: false });
        expect(førsteKlikkbare).toBeDefined();

        await userEvent.click(førsteKlikkbare!);
        expect(førsteKlikkbare).toHaveAttribute('aria-pressed', 'true');

        await userEvent.click(førsteKlikkbare!);
        expect(førsteKlikkbare).toHaveAttribute('aria-pressed', 'false');
    });
});
