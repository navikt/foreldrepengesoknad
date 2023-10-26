import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './BoIUtlandet.stories';
import { render, screen } from '@testing-library/react';

const { OppgirIFortid, OppgirIFremtid } = composeStories(stories);

const NESTE_STEG = 'Neste steg';
const HVILKET_LAND_HAR_DU_BODD = 'Hvilket land har du bodd i?';
const HVILKET_LAND_SKAL_DU_BO = 'Hvilket land skal du bo i?';

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
        //TODO
    });
    it('skal vise feilmelding hvis til og med dato på feil format', async () => {
        //TODO
    });
    it('skal vise feilmelding hvis fra og med dat er etter til og med dato på feil format', async () => {
        //TODO
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
