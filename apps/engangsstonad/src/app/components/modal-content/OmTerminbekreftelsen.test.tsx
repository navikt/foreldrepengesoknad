import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './OmTerminbekreftelsen.stories';

const {
  VisInfo,
} = composeStories(stories);

describe('<OmTerminbekreftelsen>', () => {
  it('skal rendre komponent ok', async () => {
    render(<VisInfo />);

    expect(await screen.findByText('Om terminbekreftelsen')).toBeInTheDocument();
    expect(await screen.findByText('Du må legge ved en bekreftelse på termin. Denne må være datert og '
    + 'signert av lege eller jordmor når du er i 22. svangerskapsuke eller senere.')).toBeInTheDocument();
  });
});
