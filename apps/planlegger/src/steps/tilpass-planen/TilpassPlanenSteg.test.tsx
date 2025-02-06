import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './TilpassPlanenSteg.stories';

const { MorOgFarBeggeHarRett } = composeStories(stories);

describe('<TilpassPlanenSteg - fødsel>', () => {
    it('skal vise expansion card: Hva er mulig når man tilpasser?', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);
        expect(screen.getAllByText('Tilpass planen')).toHaveLength(1);

        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');
    });
});
