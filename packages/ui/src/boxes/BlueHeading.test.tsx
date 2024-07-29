import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './BlueHeading.stories';

const { Default, DarkGreenHeader } = composeStories(stories);

describe('<BlueHeading>', () => {
    it('skal vise blå versjon av header', async () => {
        render(<Default />);

        expect(await screen.findByText('blue')).toBeInTheDocument();
    });

    it('skal vise mørkeblå versjon av header', async () => {
        render(<DarkGreenHeader />);

        expect(await screen.findByText('dark blue')).toBeInTheDocument();
    });
});
