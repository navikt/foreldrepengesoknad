import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './ByttBrowserModal.stories';

const { Default } = composeStories(stories);

describe('<ByttBrowserModal>', () => {
    it('skal vise modal for browser bytte', async () => {
        render(<Default />);
        expect(await screen.findByText('Vi ser du bruker en utdatert nettleser')).toBeInTheDocument();
    });
});
