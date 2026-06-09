import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import { BrowserInfo, detect } from 'detect-browser';
import { vi } from 'vitest';

import * as stories from './ByttBrowserModal.stories';

import messages from '../intl/messages/nb_NO.json';

vi.mock('detect-browser', () => ({
    detect: vi.fn(),
}));

const { Default } = composeStories(stories);

describe('<ByttBrowserModal>', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('skal vise modal for browser bytte', async () => {
        vi.mocked(detect).mockReturnValue({ name: 'ie' } as BrowserInfo);

        render(<Default />);
        expect(await screen.findByText(messages['ByttBrowserModal.Utdatert'])).toBeInTheDocument();
    });

    it('skal ikke vise modal når ikke IE', () => {
        vi.mocked(detect).mockReturnValue({ name: 'chrome' } as BrowserInfo);

        render(<Default />);
        expect(screen.queryByText(messages['ByttBrowserModal.Utdatert'])).not.toBeInTheDocument();
    });
});
