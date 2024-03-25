import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './OppsummeringSteg.stories';

const { OppsummeringFlereForsørgereHundreProsentTermin } = composeStories(stories);

//TODO Skriv fleire testar når stories er skrive bedre for å testa forskjellige case

describe('<OppsummeringSteg>', () => {
    it('skal vise info der det er flere forsørgere og ingen har rett til foreldrepenger', async () => {
        render(<OppsummeringFlereForsørgereHundreProsentTermin />);

        expect(await screen.findAllByText('Oppsummering')).toHaveLength(2);
        expect(screen.getByText('Ingen av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('Dette svarte dere')).toBeInTheDocument();
        expect(screen.getByText('Foreldre')).toBeInTheDocument();
        expect(screen.getByText('Klara Utvikler og Espen Utvikler')).toBeInTheDocument();

        expect(screen.getByText('Barnet')).toBeInTheDocument();
        expect(screen.getByText('Antall barn: 1')).toBeInTheDocument();
        expect(screen.getByText('Termindato: 24.10.2022')).toBeInTheDocument();

        expect(screen.getByText('Arbeidssituasjon')).toBeInTheDocument();
        expect(screen.getByText('Klara: Jobber ikke')).toBeInTheDocument();
        expect(screen.getByText('Espen: Jobber ikke')).toBeInTheDocument();

        expect(screen.getByText('Periode')).toBeInTheDocument();
        expect(screen.getByText('100% utbetaling over 49 uker')).toBeInTheDocument();
        expect(screen.getByText('5 uker til Klara, 11 uker til Espen')).toBeInTheDocument();
        expect(screen.getByText('Klaras første dag: 03.10.22')).toBeInTheDocument();
        expect(screen.getByText('Klaras siste dag: 20.02.23')).toBeInTheDocument();
        expect(screen.getByText('Espens første dag: 21.02.23')).toBeInTheDocument();
        expect(screen.getByText('Espens siste dag: 21.08.23')).toBeInTheDocument();
    });
});
