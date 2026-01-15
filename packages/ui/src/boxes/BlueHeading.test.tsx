import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './BlueHeading.stories';

const { Default } = composeStories(stories);

describe('<BlueHeading>', () => {
    it('skal vise blå versjon av header', async () => {
        render(<Default />);

        expect(await screen.findByText('blue')).toBeInTheDocument();
    });
});
