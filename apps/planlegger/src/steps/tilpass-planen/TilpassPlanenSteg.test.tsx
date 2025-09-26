import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
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

    it('skal vise korrekt genitiv for medmors kvote nå det er hun som skal endre periode med foreldrepenger', async () => {
        render(<MorOgMedmorBeggeHarRett />);
        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);
        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');

        expect(await screen.findByText('12. des. - 26. mars')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. - 26. mars'));

        await userEvent.click(screen.getAllByText('Endre')[2]);

        expect(await screen.findByText('Hvilken del av foreldrepengene vil du bruke?')).toBeInTheDocument();
        within(screen.getByText('Velg kontotype').closest('fieldset') as HTMLElement);
        within(screen.getByText('Medmors kvote').closest('div') as HTMLElement);
    });

    it('skal vise korrekt genitiv for fars kvote nå det er han som skal endre periode med foreldrepenger', async () => {
        render(<MorOgFarBeggeHarRett />);
        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);
        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');

        expect(await screen.findByText('12. des. - 26. mars')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. - 26. mars'));

        await userEvent.click(screen.getAllByText('Endre')[2]);

        expect(await screen.findByText('Hvilken del av foreldrepengene vil du bruke?')).toBeInTheDocument();
        within(screen.getByText('Velg kontotype').closest('fieldset') as HTMLElement);
        within(screen.getByText('Fars kvote').closest('div') as HTMLElement);
    });
});
