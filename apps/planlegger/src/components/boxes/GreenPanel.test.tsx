import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './GreenPanel.stories';

const { Default, DarkGreenHeader } = composeStories(stories);

describe('<GreenPanel>', () => {
    it('skal vise grøn versjon av panel', async () => {
        render(<Default />);

        expect(await screen.findByText('green')).toBeInTheDocument();
    });

    it('skal vise møkregrøn versjon av panel', async () => {
        render(<DarkGreenHeader />);

        expect(await screen.findByText('dark green')).toBeInTheDocument();
    });
});
