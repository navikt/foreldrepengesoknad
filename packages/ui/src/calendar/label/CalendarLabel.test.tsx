import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './CalendarLabel.stories';

const { GreenLabel } = composeStories(stories);

describe('<CalendarLabel>', () => {
    it('skal vise grøn label', async () => {
        render(<GreenLabel />);
        expect(await screen.findByText('green')).toBeInTheDocument();
    });
});
