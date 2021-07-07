import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/components/InteractiveListElement.stories';

const { Default, ManglendeDokumentasjon } = composeStories(stories);

describe('<InteractiveListElement>', () => {
    it('skal rendre komponent korrekt', () => {
        render(<Default />);
        expect(screen.getByText('Dette er en tittel')).toBeInTheDocument();
        expect(screen.getByText('Rediger')).toBeInTheDocument();
        expect(screen.getByText('Dette er en tekst')).toBeInTheDocument();
        expect(screen.getByText('Slett')).toBeInTheDocument();
        expect(screen.queryByText('Mangler dokumentasjon')).not.toBeInTheDocument();
    });

    it('skal vise at en mangler dokumentasjon', () => {
        render(<ManglendeDokumentasjon />);
        expect(screen.getByText('Mangler dokumentasjon')).toBeInTheDocument();
    });
});
