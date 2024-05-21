import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './PlanleggerStepPage.stories';

const { Default } = composeStories(stories);

describe('<PlanleggerStepPage>', () => {
    it('skal vise steg', async () => {
        render(<Default />);

        expect(await screen.findByText('Fordeling')).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 2')).toBeInTheDocument();
        expect(screen.getByText('Steginnhold')).toBeInTheDocument();
    });
});
