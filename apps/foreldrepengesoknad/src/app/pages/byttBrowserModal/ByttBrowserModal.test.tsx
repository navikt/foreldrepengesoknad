import React from 'react';
import Modal from 'react-modal';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from 'stories/pages/ByttBrowserModal.stories';

const { Default } = composeStories(stories);

//TODO (TOR) Bør ikkje ligga i test
Modal.setAppElement(document.createElement('div'));

describe('<ByttBrowserModal>', () => {
    it('skal vise modal for browser bytte', () => {
        render(<Default />);
        expect(screen.getByText('Vi ser du bruker en utdatert nettleser')).toBeInTheDocument();
    });
});
