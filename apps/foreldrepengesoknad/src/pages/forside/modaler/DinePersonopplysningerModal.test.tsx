import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist/cjs/index.js';

import * as stories from './DinePersonopplysningerModal.stories';

const { Default } = composeStories(stories);

describe('<DinePersonopplysningerModal>', () => {
    it('skal åpne modal fra knapp og gi fokus tilbake til knappen ved lukking', async () => {
        render(<Default />);
        const trigger = screen.getByRole('button', { name: 'Les om hvordan Nav behandler personopplysningene dine' });
        await userEvent.click(trigger);
        expect(
            await screen.findByRole('dialog', { name: 'Slik behandler Nav personopplysningene dine' }),
        ).toBeInTheDocument();
        expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');

        await userEvent.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        expect(trigger).toHaveFocus();
    });
});
