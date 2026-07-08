import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './KvoteProgresjonRing.stories';

const {
    Modrekvote_Delvis,
    Modrekvote_Ferdig,
    Fellesperiode_Splitta,
    Mini_Mor,
    AlleFireRingar,
} = composeStories(stories);

describe('<KvoteProgresjonRing>', () => {
    it('viser etikett for mødrekvote', async () => {
        render(<Modrekvote_Delvis />);
        expect(await screen.findByText('Mødrekvote')).toBeInTheDocument();
    });

    it('viser ferdig-tilstand med riktig etikett', async () => {
        render(<Modrekvote_Ferdig />);
        expect(await screen.findByText('Mødrekvote')).toBeInTheDocument();
    });

    it('viser split-info for fellesperiode', async () => {
        render(<Fellesperiode_Splitta />);
        expect(await screen.findByText(/10u Ada/)).toBeInTheDocument();
        expect(await screen.findByText(/10u 1d Erlend/)).toBeInTheDocument();
    });

    it('mini-ring får role=img og aria-label', async () => {
        render(<Mini_Mor />);
        const ring = await screen.findByRole('img');
        expect(ring).toHaveAttribute('aria-label', 'Mødrekvote: 80 % planlagd');
    });

    it('knapp-variant i AlleFireRingar har aria-label', async () => {
        render(<AlleFireRingar />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons.length).toBeGreaterThanOrEqual(4);
        expect(buttons[0]).toHaveAttribute('aria-label', 'Foreldrepengar før fødsel');
    });
});
