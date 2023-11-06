import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Frilans.stories';
import dayjs from 'dayjs';

const { Default } = composeStories(stories);
const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const FRILANS_STARTDATO = 'Når startet du som frilanser?';
const JOBBER_DU_FORTSATT_FRILANS = 'Jobber du fortsatt som frilanser?';
const JA = 'Ja';
const NESTE_STEG = 'Neste steg';

describe('<Arbeid som frilanser>', () => {
    const user = userEvent.setup();
    it('skal vise feilmelding når ingenting er fylt eller huket av', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi en startdato.')[0]).toBeInTheDocument();
        expect(await screen.getAllByText('Du må oppgi om du fortsatt jobber som frilanser.')[0]).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding, alt er utfylt', async () => {
        render(<Default />);
        expect(await screen.findByText(FRILANS_STARTDATO)).toBeInTheDocument();
        expect(await screen.findByText(JOBBER_DU_FORTSATT_FRILANS)).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText(FRILANS_STARTDATO);
        await user.type(frilansStartdatoInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await user.tab();

        expect(await screen.findByText(JOBBER_DU_FORTSATT_FRILANS)).toBeInTheDocument();
        await user.click(screen.getByText(JA));
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.queryByText('Du må oppgi startdatoen for behov for tilrettelegging.'),
        ).not.toBeInTheDocument();
        expect(await screen.queryByText('Du må oppgi hvor mye du kan jobbe.')).not.toBeInTheDocument();
    });
    it('validering av dato på feil format', async () => {
        render(<Default />);

        expect(await screen.findByText(FRILANS_STARTDATO)).toBeInTheDocument();
        expect(await screen.findByText(JOBBER_DU_FORTSATT_FRILANS)).toBeInTheDocument();

        const frilansStartdatoInput = screen.getByLabelText(FRILANS_STARTDATO);
        await user.type(frilansStartdatoInput, 'sjnkf');
        await user.tab();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Startdatoen må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
});
