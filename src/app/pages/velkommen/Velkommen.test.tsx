import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/pages/Velkommen.stories';

const { Default } = composeStories(stories);

describe('<Velkommen>', () => {
    it('skal vise velkommen-side', async () => {
        render(<Default />);
        expect(await screen.findByText('Hei, Espen!')).toBeInTheDocument();
        expect(screen.getByText('Jeg bekrefter at jeg har lest og forstått')).toBeInTheDocument();
    });
});
