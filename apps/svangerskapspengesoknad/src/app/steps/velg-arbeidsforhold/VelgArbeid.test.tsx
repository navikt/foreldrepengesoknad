import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './VelgArbeid.stories';
import { render, screen } from '@testing-library/react';

const { Default } = composeStories(stories);

const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const HVOR_SKAL_DU_JOBBE = 'Hvor skal du jobbe mindre eller slutte å jobbe midlertidig i på grunn av svangerskapet?';
const SYKEHUSET = 'SYKEHUSET I VESTFOLD';
const RE = 'RE KOMMUNE';
const NESTE_STEG = 'Neste steg';

describe('<Velg arbeid>', () => {
    const user = userEvent.setup();

    it('skal vise feilmelding hvis ingen arbeidsforhold er avhuket', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(HVOR_SKAL_DU_JOBBE)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.')[0],
        ).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding', async () => {
        render(<Default />);

        expect(await screen.findByText(SYKEHUSET)).toBeInTheDocument();

        await user.click(screen.getByText(SYKEHUSET));
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.queryByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).not.toBeInTheDocument();
    });
    it('skal ikke arbeidsgiver med ingen stillingsprosent', async () => {
        render(<Default />);

        expect(await screen.queryByText(RE)).not.toBeInTheDocument();
    });
});
