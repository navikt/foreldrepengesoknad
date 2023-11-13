import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './DinePersonopplysningerModal.stories';

const { Default } = composeStories(stories);

describe('<DinePersonopplysningerModal>', () => {
    it('skal vise modal for dine personopplysninger', async () => {
        render(<Default />);
        expect(await screen.findByText('Slik behandler NAV personopplysningene dine')).toBeInTheDocument();
    });
});
