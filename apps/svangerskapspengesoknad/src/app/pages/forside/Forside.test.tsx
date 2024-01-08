import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Forside.stories';

const { Default } = composeStories(stories);

describe('<Forside>', () => {
    it('skal ikke kunne gå videre uten å ha godkjent vilkår', async () => {
        const setHarGodkjentVilkår = vi.fn();

        render(<Default setHarGodkjentVilkår={setHarGodkjentVilkår} />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(screen.getByText('Du må bekrefte at du har lest og forstått dine plikter.')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ja, jeg har forstått mine plikter.'));

        expect(screen.queryByText('Du må bekrefte at du har lest og forstått dine plikter.')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Start søknaden'));

        expect(setHarGodkjentVilkår).toHaveBeenCalledTimes(1);
    });
});
