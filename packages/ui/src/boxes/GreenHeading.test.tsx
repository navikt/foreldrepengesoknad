import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './GreenHeading.stories';

const { Default, DarkGreenHeader } = composeStories(stories);

describe('<GreenHeading>', () => {
    it('skal vise grøn versjon av header', async () => {
        render(<Default />);

        expect(await screen.findByText('green')).toBeInTheDocument();
    });

    it('skal vise møkregrøn versjon av header', async () => {
        render(<DarkGreenHeader />);

        expect(await screen.findByText('dark green')).toBeInTheDocument();
    });
});
