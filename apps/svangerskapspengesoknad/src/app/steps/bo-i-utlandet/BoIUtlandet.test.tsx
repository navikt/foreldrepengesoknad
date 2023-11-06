import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './BoIUtlandet.stories';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';

const { OppgirIFortid, OppgirIFremtid } = composeStories(stories);

const NESTE_STEG = 'Neste steg';
const HVILKET_LAND_HAR_DU_BODD = 'Hvilket land har du bodd i?';
const HVILKET_LAND_SKAL_DU_BO = 'Hvilket land skal du bo i?';
const FOM = 'Fra og med';
const TOM = 'Til og med';

describe('<BoIUtlandet> - oppgir bosted i fortid', () => {
    const user = userEvent.setup();

    it('skal stille riktig spørsmål om opphold i fortid', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText(HVILKET_LAND_HAR_DU_BODD)).toBeInTheDocument();
    });
    it('skal måtte svare på alle spørsmål', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Du må oppgi land.')[0]).toBeInTheDocument();
        expect(await screen.getAllByText('Du må oppgi en fra og med dato.')[0]).toBeInTheDocument();
        expect(await screen.getAllByText('Du må oppgi en til og med dato.')[0]).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis fra og med dato på feil format', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText(FOM)).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText(FOM);
        await user.type(fraOgMedInput, 'bla bla');
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Fra og med dato må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis til og med dato på feil format', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText(TOM)).toBeInTheDocument();

        const tilOgMedInput = screen.getByLabelText(TOM);
        await user.type(tilOgMedInput, 'bla bla');
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Til og med dato må være en gyldig dato på formatet dd.mm.åååå.')[0],
        ).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis fra og med dat er etter til og med dato på feil format', async () => {
        render(<OppgirIFortid />);

        expect(await screen.findByText(FOM)).toBeInTheDocument();
        expect(await screen.findByText(TOM)).toBeInTheDocument();

        const fraOgMedInput = screen.getByLabelText(FOM);
        const tilOgMedInput = screen.getByLabelText(TOM);
        await user.type(fraOgMedInput, dayjs('2023-12-30').format('DD.MM.YYYY'));
        await user.type(tilOgMedInput, dayjs('2023-11-30').format('DD.MM.YYYY'));
        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(await screen.getAllByText('Til og med dato kan ikke være før fra og med dato.')[0]).toBeInTheDocument();
    });
    it('skal vise feilmelding hvis man legger til overlappende opphold i utlandet', async () => {
        //TODO
    });
});

describe('<BoIUtlandet> - oppgir bosted i fremtid', () => {
    it('skal stille riktig spørsmål om opphold i fremtid', async () => {
        render(<OppgirIFremtid />);

        expect(await screen.findByText(HVILKET_LAND_SKAL_DU_BO)).toBeInTheDocument();
    });
});
