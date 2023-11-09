import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Fieldset.stories';

const { Default } = composeStories(stories);

describe('<Fieldset>', () => {
    it('skal fieldset med header og innhold', () => {
        render(<Default />);
        expect(screen.getByText('Dette er header')).toBeInTheDocument();
        expect(screen.getByText('Dette er innhold')).toBeInTheDocument();
    });
});
