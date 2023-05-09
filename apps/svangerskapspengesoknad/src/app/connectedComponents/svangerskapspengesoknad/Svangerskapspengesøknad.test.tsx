import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Svangerskapspengesoknad.stories';

const { VisApp } = composeStories(stories);

describe('<Svangerskapspengesøknad>', () => {
    it('skal rendre komponent ok', async () => {
        render(<VisApp />);

        expect(await screen.findByText('Jeg vil hjelpe deg med å fylle ut søknaden.')).toBeInTheDocument();

        expect(
            await screen.findByText('For å gå videre med søknaden må du bekrefte at du har lest og forstått', {
                exact: false,
            })
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Begynn med søknad'));

        expect(
            await screen.findByText('Du må godkjenne vilkårene for å kunne fortsette med søknaden.')
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Jeg bekrefter at jeg har lest og forstått'));

        await userEvent.click(screen.getByText('Begynn med søknad'));

        expect(await screen.findByText('Om barnet')).toBeInTheDocument();

        // TODO Kan med fordel testa gjennom heile applikasjonen her
    });
});
