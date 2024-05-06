import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './ShareDataInfobox.stories';

const { Default } = composeStories(stories);

describe('<ShareDataInfobox>', () => {
    it('skal vise infoboks om å kopiere url', async () => {
        render(<Default />);
        expect(await screen.findByText('Du kan ta vare på resultatet')).toBeInTheDocument();
    });
});
