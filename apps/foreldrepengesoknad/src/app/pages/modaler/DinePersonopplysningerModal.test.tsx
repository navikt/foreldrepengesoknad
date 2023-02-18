import React from 'react';
import Modal from 'react-modal';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/pages/DinePersonopplysningerModal.stories';

const { Default } = composeStories(stories);

//TODO (TOR) Bør ikkje ligga i test
Modal.setAppElement(document.createElement('div'));

describe('<DinePersonopplysningerModal>', () => {
    it('skal vise modal for dine personopplysninger', () => {
        render(<Default />);
        expect(screen.getByText('Slik behandler NAV personopplysningene dine')).toBeInTheDocument();
    });
});
