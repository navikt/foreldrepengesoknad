import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './AndreVeivisereLinkPanel.stories';

const { EnLenke, FlereLenker } = composeStories(stories);

describe('<AndreVeivisereLinkPanel>', () => {
    it('skal vise en lenke', async () => {
        render(<EnLenke />);

        expect(await screen.findByText('Innhold lenke 1')).toBeInTheDocument();
        expect(screen.queryByText('Andre veivisere:')).not.toBeInTheDocument();
        expect(screen.queryByText('Innhold lenke 2')).not.toBeInTheDocument();
    });

    it('skal vise to lenke', async () => {
        render(<FlereLenker />);

        expect(await screen.findByText('Andre veivisere:')).toBeInTheDocument();
        expect(screen.getByText('Innhold lenke 1')).toBeInTheDocument();
        expect(screen.getByText('Innhold lenke 2')).toBeInTheDocument();
    });
});
