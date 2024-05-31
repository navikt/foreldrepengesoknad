import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './IconCircleWrapper.stories';

const { Default } = composeStories(stories);

describe('<IconCircleWrapper>', () => {
    it('skal ikon med sirkel rundt', async () => {
        render(<Default />);

        expect(await screen.findByLabelText('icon-label')).toBeInTheDocument();
    });
});
