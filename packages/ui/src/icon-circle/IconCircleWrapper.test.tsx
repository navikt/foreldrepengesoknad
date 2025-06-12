import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './IconCircleWrapper.stories';

const { GreenXlSizedIcon } = composeStories(stories);

describe('<IconCircleWrapper>', () => {
    it('skal ikon med sirkel rundt', async () => {
        render(<GreenXlSizedIcon />);

        expect(await screen.findByLabelText('icon-label')).toBeInTheDocument();
    });
});
