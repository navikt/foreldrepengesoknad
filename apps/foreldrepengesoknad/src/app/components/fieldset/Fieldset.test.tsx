import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/components/Fieldset.stories';

const { Default } = composeStories(stories);

describe('<Fieldset>', () => {
    it('skal fieldset med header og innhold', () => {
        render(<Default />);
        expect(screen.getByText('Dette er header')).toBeInTheDocument();
        expect(screen.getByText('Dette er innhold')).toBeInTheDocument();
    });
});
