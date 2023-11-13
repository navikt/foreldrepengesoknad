import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Frilans.stories';
import dayjs from 'dayjs';

const { Default } = composeStories(stories);

describe('<Arbeid som frilanser>', () => {
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi en startdato.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi om du fortsatt jobber som frilanser.')[0]).toBeInTheDocument();
    });

    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du som frilanser?')).toBeInTheDocument();
        expect(screen.getByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText('Når startet du som frilanser?');
        await userEvent.type(frilansStartdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));
        await userEvent.click(screen.getByText('Neste steg'));

        expect(screen.queryByText('Du må oppgi startdatoen for behov for tilrettelegging.')).not.toBeInTheDocument();
        expect(screen.queryByText('Du må oppgi hvor mye du kan jobbe.')).not.toBeInTheDocument();
    });

    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText('Når startet du som frilanser?')).toBeInTheDocument();
        expect(screen.getByText('Jobber du fortsatt som frilanser?')).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText('Når startet du som frilanser?');
        await userEvent.type(frilansStartdatoInput, 'sjnkf');
        await userEvent.tab();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Startdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
});
