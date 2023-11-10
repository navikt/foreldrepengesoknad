import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Oppsummering.stories';
import { render, screen } from '@testing-library/react';

const { Default } = composeStories(stories);

describe('<Oppsummering>', () => {
    it('skal vise feilmelding når vilkår ikke er godkjent', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Oppsummering')).toBeInTheDocument();
        expect(screen.getByText('Send søknaden')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(screen.getAllByText('Du må bekrefte at du har gjort deg kjent med vilkårene.')[0]).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding, vilkår er godkjent', async () => {
        render(<Default />);

        expect(
            await screen.findByText(
                'Opplysningene jeg har oppgitt stemmer og jeg har gjort meg kjent med vilkårene for å motta svangerskapspenger.',
            ),
        ).toBeInTheDocument();
        await userEvent.click(
            screen.getByLabelText(
                'Opplysningene jeg har oppgitt stemmer og jeg har gjort meg kjent med vilkårene for å motta svangerskapspenger.',
            ),
        );

        expect(screen.getByText('Send søknaden')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(screen.queryByText('Du må bekrefte at du har gjort deg kjent med vilkårene.')).not.toBeInTheDocument();
    });
});
