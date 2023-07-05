import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Barnet.stories';

const { Default } = composeStories(stories);
const ER_BARNET_FØDT = 'Er barnet født?';
const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const FØDSELSDATO = 'Fødselsdato';
const TERMINDATO = 'Termindato';
const NESTE_STEG = 'Neste steg';
describe('<Barnet>', () => {
    const user = userEvent.setup();
    it('skal ikke måtte oppgi fødselsdato om barnet ikke er født', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(ER_BARNET_FØDT)).toBeInTheDocument();
        await user.click(screen.getByText('Nei'));
        expect(screen.queryByText(FØDSELSDATO)).not.toBeInTheDocument();
        expect(await screen.findByText(TERMINDATO)).toBeInTheDocument();
        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
    });
    it('skal  måtte oppgi fødselsdato om barnet er født', async () => {
        render(<Default />);
        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(ER_BARNET_FØDT)).toBeInTheDocument();
        await user.click(screen.getByText('Ja'));
        expect(await screen.findByText(FØDSELSDATO)).toBeInTheDocument();
        expect(await screen.findByText(TERMINDATO)).toBeInTheDocument();
        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
    });
});
