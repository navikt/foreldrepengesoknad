import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';

import * as stories from './OversiktSteg.stories';

const { PeriodeFlereForsørgereTerminBeggeHarRett } = composeStories(stories);

//TODO Skriv fleire testar når stories er skrive bedre for å testa forskjellige case

describe('<OversiktSteg>', () => {
    it('skal vise valgt dekningsgrad og fordeling av dager', async () => {
        render(<PeriodeFlereForsørgereTerminBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        expect((screen.getByRole('option', { name: '5 til mor, 11 til far' }) as HTMLOptionElement).selected).toBe(
            true,
        );

        expect(screen.getByText('Mor, 23 uker, starter Monday 3 Oct')).toBeInTheDocument();
        expect(screen.getByText('Far, 26 uker, starter Tuesday 14 Mar')).toBeInTheDocument();
        expect(screen.getByText('Fødselsdato 24. Oct')).toBeInTheDocument();
    });

    it('skal vise korrekt kalenderplan når mor og far søker med 5 uker av fellesperioden til mor', async () => {
        render(<PeriodeFlereForsørgereTerminBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        const october = screen.getByTestId('year:2022;month:9');
        expect(within(october).getByTestId('day:24;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(october).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(20);

        const november = screen.getByTestId('year:2022;month:10');
        expect(within(november).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const december = screen.getByTestId('year:2022;month:11');
        expect(within(december).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const januar = screen.getByTestId('year:2023;month:0');
        expect(within(januar).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const februar = screen.getByTestId('year:2023;month:1');
        expect(within(februar).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(20);

        const mars = screen.getByTestId('year:2023;month:2');
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(9);
        expect(within(mars).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(14);

        const april = screen.getByTestId('year:2023;month:3');
        expect(within(april).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(20);

        const may = screen.getByTestId('year:2023;month:4');
        expect(within(may).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(23);

        const june = screen.getByTestId('year:2023;month:5');
        expect(within(june).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(22);

        const july = screen.getByTestId('year:2023;month:6');
        expect(within(july).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(21);

        const august = screen.getByTestId('year:2023;month:7');
        expect(within(august).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(23);

        const september = screen.getByTestId('year:2023;month:8');
        expect(within(september).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(8);
    });
});
