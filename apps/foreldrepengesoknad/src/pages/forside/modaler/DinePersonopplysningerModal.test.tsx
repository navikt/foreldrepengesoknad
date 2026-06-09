import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist/cjs/index.js';

import * as stories from './DinePersonopplysningerModal.stories';

import messages from '../../../intl/nb_NO.json';

const { Default } = composeStories(stories);

describe('<DinePersonopplysningerModal>', () => {
    it('skal vise modal for dine personopplysninger', async () => {
        render(<Default />);
        await userEvent.click(screen.getByText(messages['velkommen.lesMerOmPersonopplysninger']));
        expect(await screen.findByText(messages['velkommen.dinePersonopplysninger.sectionheading'])).toBeInTheDocument();
    });
});
