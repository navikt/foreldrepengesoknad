import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './OppsummeringSteg.stories';

const { Default } = composeStories(stories);

describe('<OppsummeringSteg>', () => {
    it('skal vise feilmelding når vilkår ikke er godkjent', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Send søknaden')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Send søknaden'));

        expect(screen.getByText('Du må bekrefte at du har oppgitt riktige opplysninger')).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding, vilkår er godkjent', async () => {
        const sendSøknad = vi.fn();

        render(<Default sendSøknad={sendSøknad} />);

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

        expect(screen.queryByText('Du må bekrefte at du har oppgitt riktige opplysninger')).not.toBeInTheDocument();

        expect(sendSøknad).toHaveBeenCalledTimes(1);
    });
});
