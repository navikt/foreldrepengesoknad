import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/components/InnholdMedIllustrasjon.stories';

const { Default, MedIllustrasjon, MedIllustrasjonOgInfoboks } = composeStories(stories);

describe('<InnholdMedIllustrasjon>', () => {
    it('skal innhold uten infoboks og illustrasjoner', () => {
        const { container } = render(<Default />);
        expect(screen.getByText('Dette er en tittel')).toBeInTheDocument();
        expect(screen.queryByText('Dette er en infoboks')).not.toBeInTheDocument();
        expect(container.getElementsByClassName('innholdMedIllustrasjon__illustrasjoner').length).toBe(0);
    });

    it('skal innhold uten infoboks men med illustrasjoner', () => {
        const { container } = render(<MedIllustrasjon />);
        expect(screen.getByText('Dette er en tittel')).toBeInTheDocument();
        expect(screen.queryByRole('Dette er en infoboks')).not.toBeInTheDocument();
        expect(container.getElementsByClassName('innholdMedIllustrasjon__illustrasjoner').length).toBe(1);
    });

    it('skal innhold med illustrasjoner og infoboks', () => {
        const { container } = render(<MedIllustrasjonOgInfoboks />);
        expect(screen.getByText('Dette er en tittel')).toBeInTheDocument();
        expect(screen.getByText('Dette er en infoboks')).toBeInTheDocument();
        expect(container.getElementsByClassName('innholdMedIllustrasjon__illustrasjoner').length).toBe(1);
    });
});
