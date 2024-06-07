import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './Infobox.stories';

const { Default } = composeStories(stories);

describe('<Infobox>', () => {
    it('skal vise infobox', async () => {
        render(<Default />);
        expect(await screen.findByText('Dette er en header')).toBeInTheDocument();
        expect(screen.getByText('Dette er et barn')).toBeInTheDocument();
    });
});
