import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './BluePanel.stories';

const { Default, DarkBlueHeader } = composeStories(stories);

describe('<BluePanel>', () => {
    it('skal vise blå versjon av panel', async () => {
        render(<Default />);

        expect(await screen.findByText('blue')).toBeInTheDocument();
    });

    it('skal vise mørkeblå versjon av panel', async () => {
        render(<DarkBlueHeader />);

        expect(await screen.findByText('dark blue')).toBeInTheDocument();
    });
});
