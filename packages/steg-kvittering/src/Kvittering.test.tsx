import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Kvittering.stories';

const { Endelig } = composeStories(stories);

describe('<MedSaksnummer>', () => {
    it('TODO', async () => {
        render(<Endelig />);

        await userEvent.click(screen.getByText('Se saken din'));

        //TODO: lag test
        expect(await screen.findByText('Når startet du som frilanser?')).toBeInTheDocument();
    });
});
