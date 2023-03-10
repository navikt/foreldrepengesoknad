import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/components/Personkort.stories';

const { Default, PersonkortMedIkon } = composeStories(stories);

describe('<Personkort>', () => {
    it('skal vise korrekt tittel og innhold', () => {
        const { container } = render(<Default />);
        expect(screen.getByText('Dette er en tittel')).toBeInTheDocument();
        expect(screen.getByText('Dette er innholdet')).toBeInTheDocument();
        expect(container.getElementsByClassName('personkort__ikon').length).toBe(0);
    });

    it('skal vise personkort med ikon', () => {
        const { container } = render(<PersonkortMedIkon />);
        expect(container.getElementsByClassName('personkort__ikon').length).toBe(1);
    });
});
