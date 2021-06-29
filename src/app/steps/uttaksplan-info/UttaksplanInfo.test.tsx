import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from '../../../storybook/stories/steps/uttaksplan-info/mor-fødsel/MorFødsel.stories';

const { UttaksplanMedAleneomsorg } = composeStories(stories);

describe('<UttaksplanInfo>', () => {
    it('skal returnere spinner når data blir hentet', () => {
        render(<UttaksplanMedAleneomsorg />);

        expect(screen.findByText('Vente...dfdfg')).toBeInTheDocument();
    });
});
