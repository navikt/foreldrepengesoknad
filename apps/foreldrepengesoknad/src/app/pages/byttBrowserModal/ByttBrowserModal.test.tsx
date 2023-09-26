import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './ByttBrowserModal.stories';

const { Default } = composeStories(stories);

describe('<ByttBrowserModal>', () => {
    it('skal vise modal for browser bytte', () => {
        render(<Default />);
        // expect(await screen.findByText(('Vi ser du bruker en utdatert nettleser')).toBeInTheDocument();
    });
});
