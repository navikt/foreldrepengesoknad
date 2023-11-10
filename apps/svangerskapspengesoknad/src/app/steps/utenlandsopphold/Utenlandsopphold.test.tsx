import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Utenlandsopphold.stories';
import { render, screen } from '@testing-library/react';

const { Default } = composeStories(stories);

describe('<Utlandsopphold>', () => {
    it('skal ikke vise feilmelding hvis spørsmål besvart', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(screen.getByText('Hvor har du bodd de siste 12 månedene?')).toBeInTheDocument();
        expect(screen.getByText('Hvor skal du bo de neste 12 månedene?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Du har bodd i Norge'));

        await userEvent.click(screen.getByText('Du skal bo i Norge'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi om du har bodd i Norge de siste 12 månedene.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi om du skal bo i Norge de neste 12 månedene.')).not.toBeInTheDocument();
    });

    it('skal vise feilmelding hvis spørsmål ikke er besvart', async () => {
        render(<Default />);

        expect(await screen.findByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi om du har bodd i Norge de siste 12 månedene.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi om du skal bo i Norge de neste 12 månedene.')[0]).toBeInTheDocument();
    });
});
