import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Forside.stories';

const { Default } = composeStories(stories);

describe('<Forside>', () => {
    it('skal ikke kunne gå videre uten å ha godkjent vilkår', async () => {
        const user = userEvent.setup();
        render(<Default />);
        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        await user.click(screen.getByText('Start søknaden'));
        expect(await screen.findByText('Du må bekrefte at du har lest og forstått dine plikter.')).toBeInTheDocument();
    });
});
