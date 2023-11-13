import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './BoIUtlandet.stories';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

const { OppgirIFortid, OppgirIFremtid } = composeStories(stories);

describe('<BoIUtlandet> - oppgir bosted i fortid', () => {
    const user = userEvent.setup();

    it('skal stille riktig spørsmål om opphold i fortid', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText('Hvilket land har du bodd i?')).toBeInTheDocument();
    });
    it('skal måtte svare på alle spørsmål', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText('Neste steg')).toBeInTheDocument();
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Du må oppgi land.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi en fra og med dato.')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Du må oppgi en til og med dato.')[0]).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis fra og med dato på feil format', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText('Fra og med')).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText('Fra og med');
        await user.type(fraOgMedInput, 'bla bla');
        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Fra og med dato må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis til og med dato på feil format', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText('Til og med')).toBeInTheDocument();

        const tilOgMedInput = screen.getByLabelText('Til og med');
        await user.type(tilOgMedInput, 'bla bla');
        await user.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Til og med dato må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis fra og med dat er etter til og med dato på feil format', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText('Fra og med')).toBeInTheDocument();
        expect(screen.getByText('Til og med')).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText('Fra og med');
        const tilOgMedInput = screen.getByLabelText('Til og med');
        await user.type(fraOgMedInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await user.type(tilOgMedInput, dayjs('2023-11-30').format('DD.MM.YYYY'));
        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await user.click(screen.getByText('Neste steg'));

        expect(screen.getAllByText('Til og med dato kan ikke være før fra og med dato.')[0]).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis man legger til overlappende opphold i utlandet', async () => {
        //TODO
    });
});

describe('<BoIUtlandet> - oppgir bosted i fremtid', () => {
    it('skal stille riktig spørsmål om opphold i fremtid', async () => {
        render(<OppgirIFremtid />);

        expect(await screen.findByText('Hvilket land skal du bo i?')).toBeInTheDocument();
    });
});
