import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './PlanenDeresSteg.stories';

const { MorOgFarBeggeHarRett } = composeStories(stories);

describe('<PlanenDeresSteg - fødsel>', () => {
    it('skal vise expansion card: Hva er mulig når man tilpasser?', () => {
        render(<MorOgFarBeggeHarRett />);

        expect(screen.getAllByText('Tilpass planen')).toHaveLength(2);

        expect(screen.getByText('Kalender').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('Liste').closest('button')?.getAttribute('aria-checked')).toBe('true');
    });
});
