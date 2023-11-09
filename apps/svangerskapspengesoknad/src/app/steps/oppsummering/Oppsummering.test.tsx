import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Oppsummering.stories';
import { render, screen } from '@testing-library/react';

const { Default } = composeStories(stories);

const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const OPPSUMMERING = 'Oppsummering';
const VILKÅR =
    'Opplysningene jeg har oppgitt stemmer og jeg har gjort meg kjent med vilkårene for å motta svangerskapspenger.';
const SEND = 'Send søknaden';

describe('<Oppsummering>', () => {
    const user = userEvent.setup();

    it('skal vise feilmelding når vilkår ikke er godkjent', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(OPPSUMMERING)).toBeInTheDocument();
        expect(await screen.findByText(SEND)).toBeInTheDocument();
        await user.click(screen.getByText(SEND));

        expect(
            await screen.getAllByText('Du må bekrefte at du har gjort deg kjent med vilkårene.')[0],
        ).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding, vilkår er godkjent', async () => {
        render(<Default />);

        expect(await screen.findByText(VILKÅR)).toBeInTheDocument();
        await user.click(screen.getByLabelText(VILKÅR));

        expect(await screen.findByText(SEND)).toBeInTheDocument();
        await user.click(screen.getByText(SEND));

        expect(
            await screen.queryByText('Du må bekrefte at du har gjort deg kjent med vilkårene.'),
        ).not.toBeInTheDocument();
    });
});
