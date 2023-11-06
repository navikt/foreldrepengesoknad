import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './VelgArbeid.stories';
import { render, screen } from '@testing-library/react';

const { Default } = composeStories(stories);

const SØKNAD_TITTEL = 'Søknad om svangerskapspenger';
const HVOR_SKAL_DU_JOBBE = 'Hvor skal du jobbe mindre eller slutte å jobbe midlertidig på grunn av svangerskapet?';
const SYKEHUSET = 'Sykehuset i Vestfold';
const OMSORGSPARTNER = 'Omsorgspartner Vestfold AS';
const RE = 'Re Kommune';
const INFO = 'Du vil nå gå gjennom hvert arbeidsforhold og gjøre dette:';
const NESTE_STEG = 'Neste steg';

describe('<Velg arbeid>', () => {
    const user = userEvent.setup();

    it('skal vise feilmelding hvis ingen arbeidsforhold er avhuket', async () => {
        render(<Default />);

        expect(await screen.findByText(SØKNAD_TITTEL)).toBeInTheDocument();
        expect(await screen.findByText(HVOR_SKAL_DU_JOBBE)).toBeInTheDocument();
        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();

        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.getAllByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.')[0],
        ).toBeInTheDocument();
    });
    it('skal ikke vise feilmelding', async () => {
        render(<Default />);

        expect(await screen.findByText(SYKEHUSET)).toBeInTheDocument();

        await user.click(screen.getByText(SYKEHUSET));

        expect(await screen.findByText(NESTE_STEG)).toBeInTheDocument();
        await user.click(screen.getByText(NESTE_STEG));

        expect(
            await screen.queryByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).not.toBeInTheDocument();
    });
    it('skal ikke arbeidsgiver med ingen stillingsprosent', async () => {
        render(<Default />);

        expect(await screen.queryByText(RE)).not.toBeInTheDocument();
    });
    it('skal ikke vise infoboks når kunn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText(SYKEHUSET)).toBeInTheDocument();

        await user.click(screen.getByText(SYKEHUSET));

        expect(await screen.queryByText(INFO)).not.toBeInTheDocument();
    });
    it('skal vise infoboks når mer enn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText(SYKEHUSET)).toBeInTheDocument();

        await user.click(screen.getByText(SYKEHUSET));
        await user.click(screen.getByText(OMSORGSPARTNER));

        expect(await screen.findByText(INFO)).toBeInTheDocument();
    });
});
