import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './CalendarLabel.stories';

const { GreenLabel, DarkBlueLabelVisesIkke } = composeStories(stories);

describe('<CalendarLabel>', () => {
    it('skal vise GREEN label', () => {
        const { container } = render(<GreenLabel />);
        expect(container.querySelector('[data-periode-color="GREEN"]')).toBeInTheDocument();
        expect(screen.getByText('green')).toBeInTheDocument();
    });

    it('skal ikke vise DARKBLUE label', () => {
        render(<DarkBlueLabelVisesIkke />);
        expect(screen.queryByText('mørkeblå')).not.toBeInTheDocument();
    });
});
