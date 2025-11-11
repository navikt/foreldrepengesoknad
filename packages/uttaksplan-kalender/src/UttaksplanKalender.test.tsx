import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';

import * as stories from './Uttaksplankalender.stories';

const {
    MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering,
    FarSøkerMedTapteDagerOgUtsettelse,
    MorSøkerMedFlereUtsettelser,
    KortPeriodeUtenHelg,
} = composeStories(stories);

describe('MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering', () => {
    it('skal vise riktige labels og farger på periodene i kalender med gradering, samtidig uttak og tapte dager', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Avslåtte perioder vises ikke i kalenderen.')).toBeInTheDocument();
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Dager du kan tape')).toBeInTheDocument();
        expect(screen.getByText('Du kombinerer jobb og foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Du og Hans har permisjon samtidig')).toBeInTheDocument();
        expect(screen.getByText("Hans' periode")).toBeInTheDocument();
        expect(screen.getByText('Helg')).toBeInTheDocument();
        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:15;dayColor:BLUE')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(11);
        expect(within(mars).getByTestId('day:29;dayColor:BLUE')).toBeInTheDocument();
        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:3;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:4;dayColor:PINK')).toBeInTheDocument();
        expect(within(april).getByTestId('day:5;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);
        expect(within(april).getByTestId('day:18;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:19;dayColor:BLACK')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(8);
        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:1;dayColor:BLACK')).toBeInTheDocument();
        expect(within(mai).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(12);
        expect(within(mai).getByTestId('day:16;dayColor:BLACK')).toBeInTheDocument();
        expect(within(mai).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(1);
        expect(within(mai).getByTestId('day:31;dayColor:BLUE')).toBeInTheDocument();
        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:3;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:13;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:14;dayColor:BLUESTRIPED')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:17;dayColor:BLUESTRIPED')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:27;dayColor:BLUESTRIPED')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUESTRIPED', { exact: false })).toHaveLength(10);
        expect(within(juni).getByTestId('day:28;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:LIGHTGREENBLUE', { exact: false })).toHaveLength(1);
        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:LIGHTGREENBLUE', { exact: false })).toHaveLength(2);
        expect(within(juli).getByTestId('day:2;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:3;dayColor:LIGHTGREEN')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:15;dayColor:LIGHTGREEN')).toBeInTheDocument();
    });
    it('Skal vise utsettelsegrunn i label når en har kun en type utsettelse i planen', async () => {
        render(<FarSøkerMedTapteDagerOgUtsettelse />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Dager du kan tape')).toBeInTheDocument();
        expect(screen.getByText('Du utsetter foreldrepenger fordi du skal jobbe')).toBeInTheDocument();
        expect(screen.getByText('Helg')).toBeInTheDocument();
        const juni = screen.getByTestId('year:2021;month:5');
        expect(within(juni).getByTestId('day:1;dayColor:GREEN')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
        expect(within(juni).getByTestId('day:14;dayColor:GREEN')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:15;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:18;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(10);
        expect(within(juni).getByTestId('day:28;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:29;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(2);
        expect(within(juni).getByTestId('day:30;dayColor:GREENOUTLINE')).toBeInTheDocument();
        const juli = screen.getByTestId('year:2021;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(12);
        expect(within(juli).getByTestId('day:16;dayColor:GREENOUTLINE')).toBeInTheDocument();
    });
    it('Skal ikke vise utsettelsegrunn i label når en har flere typer utsettelser i planen', async () => {
        render(<MorSøkerMedFlereUtsettelser />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Du utsetter foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Helg')).toBeInTheDocument();
        const juni = screen.getByTestId('year:2021;month:5');
        expect(within(juni).getByTestId('day:15;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUEOUTLINE', { exact: false })).toHaveLength(12);
        expect(within(juni).getByTestId('day:30;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        const juli = screen.getByTestId('year:2021;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUEOUTLINE', { exact: false })).toHaveLength(12);
        expect(within(juli).getByTestId('day:16;dayColor:BLUEOUTLINE')).toBeInTheDocument();
    });
    it('Skal ikke vise label for helg når uttaket ikke inkluderer en helg.', async () => {
        render(<KortPeriodeUtenHelg />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Adopsjon')).toBeInTheDocument();
        expect(screen.queryByText('Helg')).not.toBeInTheDocument();
    });
});
