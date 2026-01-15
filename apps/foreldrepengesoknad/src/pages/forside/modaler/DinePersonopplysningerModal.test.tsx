import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist/cjs/index.js';

import * as stories from './DinePersonopplysningerModal.stories';

const { Default } = composeStories(stories);

describe('<DinePersonopplysningerModal>', () => {
    it('skal vise modal for dine personopplysninger', async () => {
        render(<Default />);
        await userEvent.click(screen.getByText('Les om hvordan Nav behandler personopplysningene dine'));
        expect(await screen.findByText('Slik behandler Nav personopplysningene dine')).toBeInTheDocument();
    });
});
