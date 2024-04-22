import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OppsummeringSteg.stories';

const { OppsummeringFlereForsørgereHundreProsentTermin } = composeStories(stories);

//TODO Skriv fleire testar når stories er skrive bedre for å testa forskjellige case

describe('<OppsummeringSteg>', () => {
    it.skip('skal vise info der det er flere forsørgere og ingen har rett til foreldrepenger', async () => {
        render(<OppsummeringFlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Ingen av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(
            screen.getByText('Basert på svarene deres har ingen av dere rett på foreldrepenger.'),
        ).toBeInTheDocument();
    });
    it('skal vise info der det er flere forsørgere og begge har rett til foreldrepenger', async () => {
        render(<OppsummeringFlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Både Klara og Espen har hatt opptjening 6 av de siste 10 månedene og har tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde og fordeling')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Dere valgte 100 % foreldrepenger i 49 uker og fordeler fellesperioden med 5 uker til mor og 11 uker til far.',
            ),
        ).toBeInTheDocument();
    });
    it.skip('skal vise info der det er flere forsørgere og kun mor har rett til foreldrepenger', async () => {
        render(<OppsummeringFlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Klara har hatt opptjening 6 av de siste 10 månedene og tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                'Espen har ikke hatt opptjening 6 av de siste 10 månedene og tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Dere valgte 100 % foreldrepenger i 49 uker.')).toBeInTheDocument();
    });
    it.skip('skal vise info der det er aleneforsørger', async () => {
        render(<OppsummeringFlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Dette svarte du')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Mor har hatt opptjening 6 av de siste 10 månedene og tjent mer enn 59 310 kr det siste året.',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText('Lengde')).toBeInTheDocument();
        expect(screen.getByText('Du valgte 100 % utbetaling i 49 uker.')).toBeInTheDocument();
    });
});
