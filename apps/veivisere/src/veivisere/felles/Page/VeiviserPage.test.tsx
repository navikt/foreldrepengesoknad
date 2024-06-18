import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './VeiviserPage.stories';

const { Default } = composeStories(stories);

describe('<VeiviserPage>', () => {
    it('skal vise steg', async () => {
        render(<Default />);

        expect(await screen.findAllByText('Hvor mye kan jeg få i foreldrepenger?')).toHaveLength(2);
        expect(screen.getByText('Steginnhold')).toBeInTheDocument();
    });
});
