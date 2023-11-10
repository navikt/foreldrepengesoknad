import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './VelgArbeid.stories';
import { render, screen } from '@testing-library/react';

const { Default } = composeStories(stories);

describe('<Velg arbeid>', () => {
    it('skal vise feilmelding hvis ingen arbeidsforhold er avhuket', async () => {
        render(<Default />);

        expect(await screen.findByText('Søknad om svangerskapspenger')).toBeInTheDocument();
        expect(
            screen.getByText('Hvor skal du jobbe mindre eller slutte å jobbe midlertidig på grunn av svangerskapet?'),
        ).toBeInTheDocument();
        expect(screen.getByText('Neste steg')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.getAllByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).toHaveLength(2);
    });

    it('skal ikke vise feilmelding', async () => {
        render(<Default />);

        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.getByText('Neste steg')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Neste steg'));

        expect(
            screen.queryByText('Du må velge hvilket arbeidsforhold du ønsker å søke svangerskapspenger for.'),
        ).not.toBeInTheDocument();
    });

    it('skal ikke vise infoboks når kunn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));

        expect(screen.queryByText('Du vil nå gå gjennom hvert arbeidsforhold og gjøre dette:')).not.toBeInTheDocument();
    });

    it('skal vise infoboks når mer enn ett arbeidsforhold er valgt', async () => {
        render(<Default />);
        expect(await screen.findByText('Sykehuset i Vestfold')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Sykehuset i Vestfold'));
        await userEvent.click(screen.getByText('Omsorgspartner Vestfold AS'));

        expect(screen.getByText('Du vil nå gå gjennom hvert arbeidsforhold og gjøre dette:')).toBeInTheDocument();
    });
});
