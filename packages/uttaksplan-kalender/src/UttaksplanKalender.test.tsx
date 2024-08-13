import { composeStories } from '@storybook/react';
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
        expect(screen.getByText('Helg (er ikke dager med foreldrepenger)')).toBeInTheDocument();
        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:15;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(11);
        expect(within(mars).getByTestId('day:29;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:3;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:4;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:5;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);
        expect(within(april).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:19;dayColor:BLACK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(8);
        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:1;dayColor:BLACK;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mai).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(12);
        expect(within(mai).getByTestId('day:16;dayColor:BLACK;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(1);
        expect(within(mai).getByTestId('day:31;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:3;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:13;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:14;dayColor:BLUESTRIPED;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:17;dayColor:BLUESTRIPED;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:27;dayColor:BLUESTRIPED;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUESTRIPED', { exact: false })).toHaveLength(10);
        expect(
            within(juni).getByTestId('day:28;dayColor:LIGHTGREENBLUE;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:LIGHTGREENBLUE', { exact: false })).toHaveLength(1);
        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:LIGHTGREENBLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:LIGHTGREENBLUE', { exact: false })).toHaveLength(2);
        expect(within(juli).getByTestId('day:2;dayColor:LIGHTGREENBLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:3;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:15;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
    });
    it('Skal vise utsettelsegrunn i label når en har kun en type utsettelse i planen', async () => {
        render(<FarSøkerMedTapteDagerOgUtsettelse />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Dager du kan tape')).toBeInTheDocument();
        expect(screen.getByText('Du utsetter foreldrepenger fordi du skal jobbe')).toBeInTheDocument();
        expect(screen.getByText('Helg (er ikke dager med foreldrepenger)')).toBeInTheDocument();
        const juni = screen.getByTestId('year:2021;month:5');
        expect(within(juni).getByTestId('day:1;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
        expect(within(juni).getByTestId('day:14;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:15;dayColor:BLACK;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:18;dayColor:BLACK;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(10);
        expect(within(juni).getByTestId('day:28;dayColor:BLACK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:29;dayColor:GREENOUTLINE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(2);
        expect(within(juni).getByTestId('day:30;dayColor:GREENOUTLINE;dayType:LAST_DAY')).toBeInTheDocument();
        const juli = screen.getByTestId('year:2021;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:GREENOUTLINE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(12);
        expect(within(juli).getByTestId('day:16;dayColor:GREENOUTLINE;dayType:LAST_DAY')).toBeInTheDocument();
    });
    it('Skal ikke vise utsettelsegrunn i label når en har flere typer utsettelser i planen', async () => {
        render(<MorSøkerMedFlereUtsettelser />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Du utsetter foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Helg (er ikke dager med foreldrepenger)')).toBeInTheDocument();
        const juni = screen.getByTestId('year:2021;month:5');
        expect(within(juni).getByTestId('day:15;dayColor:BLUEOUTLINE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUEOUTLINE', { exact: false })).toHaveLength(12);
        expect(within(juni).getByTestId('day:30;dayColor:BLUEOUTLINE;dayType:LAST_DAY')).toBeInTheDocument();
        const juli = screen.getByTestId('year:2021;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:BLUEOUTLINE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUEOUTLINE', { exact: false })).toHaveLength(12);
        expect(within(juli).getByTestId('day:16;dayColor:BLUEOUTLINE;dayType:LAST_DAY')).toBeInTheDocument();
    });
    it('Skal ikke vise label for helg når uttaket ikke inkluderer en helg.', async () => {
        render(<KortPeriodeUtenHelg />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Adopsjon')).toBeInTheDocument();
        expect(screen.queryByText('Helg (er ikke dager med foreldrepenger)')).not.toBeInTheDocument();
    });
});
