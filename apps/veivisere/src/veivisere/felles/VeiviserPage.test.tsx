import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './VeiviserPage.stories';

const { Default } = composeStories(stories);

describe('<VeiviserPage>', () => {
    it('skal vise steg', async () => {
        render(<Default />);

        expect(await screen.findByText('Hvor mye kan jeg få i foreldrepenger?')).toBeInTheDocument();
        expect(screen.getByText('Steginnhold')).toBeInTheDocument();
    });
});
