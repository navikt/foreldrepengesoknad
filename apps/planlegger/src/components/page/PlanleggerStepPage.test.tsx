import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import * as stories from './PlanleggerStepPage.stories';

import messages from '../../intl/messages/nb_NO.json';

const { Default } = composeStories(stories);

describe('<PlanleggerStepPage>', () => {
    it('skal vise steg', async () => {
        render(<Default />);

        expect(await screen.findByText(messages['FordelingSteg.Tittel'])).toBeInTheDocument();
        expect(screen.getByText('Steg 1 av 2')).toBeInTheDocument();
        expect(screen.getByText('Steginnhold')).toBeInTheDocument();
    });
});
