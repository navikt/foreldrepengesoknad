import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './DinePersonopplysningerModal.stories';

const { Default } = composeStories(stories);

describe('<DinePersonopplysningerModal>', () => {
    it('skal vise modal for dine personopplysninger', () => {
        render(<Default />);
        expect(screen.getByText('Slik behandler NAV personopplysningene dine')).toBeInTheDocument();
    });
});
