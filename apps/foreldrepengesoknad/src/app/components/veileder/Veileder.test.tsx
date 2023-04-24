import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Veileder.stories';

const { Default } = composeStories(stories);

describe('<Veileder>', () => {
    it('skal rendre komponent korrekt', () => {
        render(<Default />);
        expect(screen.getByText('NAV veileder')).toBeInTheDocument();
    });
});
