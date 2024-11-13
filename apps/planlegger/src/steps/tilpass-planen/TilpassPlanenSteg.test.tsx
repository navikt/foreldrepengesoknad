import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './TilpassPlanenSteg.stories';

const { MorOgFarBeggeHarRett } = composeStories(stories);

describe('<TilpassPlanenSteg - fødsel>', () => {
    it('skal vise expansion card: Hva er mulig når man tilpasser?', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Tilpass planen')).toBeInTheDocument();

        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('false');

        expect(screen.getByText('Mor')).toBeInTheDocument();
        expect(screen.getByText('Far')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();
    });
});
