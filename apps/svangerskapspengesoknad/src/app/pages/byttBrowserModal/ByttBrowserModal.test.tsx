import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './ByttBrowserModal.stories';

const { Default } = composeStories(stories);

describe('<ByttBrowserModal>', () => {
    it('skal vise modal for browser bytte', () => {
        render(<Default />);
        expect(screen.getByText('Du bruker en utdatert nettleser.')).toBeInTheDocument();
    });
});
