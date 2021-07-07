import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/components/LenkeKnapp.stories';

const { Default } = composeStories(stories);

describe('<LenkeKnapp>', () => {
    it('skal vise korrekt tekst på knapp', () => {
        render(<Default />);
        expect(screen.getByText('Knappetekst')).toBeInTheDocument();
    });
});
