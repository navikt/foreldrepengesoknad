import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';

import * as stories from './TilpassPlanenSteg.stories';

const { MorOgFarBeggeHarRett, MorOgMedmorBeggeHarRett } = composeStories(stories);

describe('<TilpassPlanenSteg - fødsel>', () => {
    it('skal vise expansion card: Hva er mulig når man tilpasser?', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);

        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');
    });

    it('skal vise korrekt pronomen for medmor nå det er hun som skal endre periode med foreldrepenger', async () => {
        render(<MorOgMedmorBeggeHarRett />);
        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);
        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');

        const helgaElements = screen.getAllByText('Helga Utvikler har foreldrepenger');
        expect(helgaElements).toHaveLength(2);
        await userEvent.click(helgaElements[1]); // Klikker på den andre forekomsten

        const endreButton = screen.getAllByRole('button', { name: 'Endre' });
        await userEvent.click(endreButton[1]); //

        expect(screen.getAllByRole('heading', { level: 1, name: 'Endre periode' })).toHaveLength(1);

        // Finn div med klasse "aksel-radio-button" som inneholder input med tekst "Periode med foreldrepenger"
        const akselRadioButton =
            screen.getByTestId('aksel-radio-button') || document.querySelector('.aksel-radio-button');
        expect(akselRadioButton).toBeTruthy();

        const periodeInput = screen.getByRole('radio', { name: /periode med foreldrepenger/i });
        expect(periodeInput).toBeInTheDocument();
        await userEvent.click(periodeInput);

        // Sjekk at "Medmors kvote" er tilgjengelig som radioknapp
        const medmorsKvoteRadio = screen.getByRole('radio', { name: /medmors kvote/i });
        expect(medmorsKvoteRadio).toBeInTheDocument();
    });
});
