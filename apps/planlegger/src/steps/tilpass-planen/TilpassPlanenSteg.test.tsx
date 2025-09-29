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

    it('skal vise "Medmors kvote" når det er morOgMor som skal endre periode med foreldrepenger', async () => {
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

    it('skal vise "Fars kvote" når det er morOgFar som skal endre periode med foreldrepenger', async () => {
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

    it('skal vise "Fedrekvote" når det er morOgFar i kvoteoppsummering', async () => {
        render(<MorOgFarBeggeHarRett />);
        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);
        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');

        expect(await screen.findByText('All tid er i planen')).toBeInTheDocument();

        const titleElement = screen.getByText('All tid er i planen');
        const expandButton = titleElement.closest('.aksel-expansioncard__header')?.querySelector('button');
        if (expandButton) {
            await userEvent.click(expandButton);
        }
        expect(screen.getAllByText('Fedrekvote - 15 uker')).toHaveLength(1);
        expect(screen.queryByText('Medmorkvote')).not.toBeInTheDocument();
    });
    it('skal vise "Medmorkvote" når det er morOgMor i kvoteoppsummering', async () => {
        render(<MorOgMedmorBeggeHarRett />);
        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);
        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');

        expect(await screen.findByText('All tid er i planen')).toBeInTheDocument();

        await userEvent.click(screen.getByText('All tid er i planen'));
        expect(await screen.findByText('All tid er i planen')).toBeInTheDocument();
        expect(screen.getAllByText('Medmorkvote - 15 uker')).toHaveLength(1);
        expect(screen.queryByText('Fedrekvote')).not.toBeInTheDocument();
    });
});
