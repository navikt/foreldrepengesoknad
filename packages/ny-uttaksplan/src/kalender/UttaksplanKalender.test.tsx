import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Uttaksplankalender.stories';

const {
    MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering,
    FarSøkerMedTapteDagerOgUtsettelse,
    MorSøkerMedFlereUtsettelser,
    KortPeriodeUtenHelg,
} = composeStories(stories);

describe('UttaksplanKalender', () => {
    it('skal vise riktige labels og farger på periodene i kalender med gradering, samtidig uttak og tapte dager', () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Dager du kan tape')).toBeInTheDocument();
        expect(screen.getByText('Du kombinerer jobb og foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Du og Hans har permisjon samtidig')).toBeInTheDocument();
        expect(screen.getByText("Hans' periode")).toBeInTheDocument();
        expect(screen.getByText('Helg')).toBeInTheDocument();
        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:15;dayColor:BLUE')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
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
        expect(within(mai).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(11);
        expect(within(mai).getByTestId('day:15;dayColor:BLACK')).toBeInTheDocument();
        expect(within(mai).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(6);
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
    it('Skal vise utsettelsegrunn i label når en har kun en type utsettelse i planen', () => {
        render(<FarSøkerMedTapteDagerOgUtsettelse />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Dager du kan tape')).toBeInTheDocument();
        expect(screen.getByText('Du bruker ikke foreldrepenger')).toBeInTheDocument();
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
    it('Skal ikke vise utsettelsegrunn i label når en har flere typer utsettelser i planen', () => {
        render(<MorSøkerMedFlereUtsettelser />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getByText('Du bruker ikke foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Helg')).toBeInTheDocument();
        const juni = screen.getByTestId('year:2021;month:5');
        expect(within(juni).getByTestId('day:15;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUEOUTLINE', { exact: false })).toHaveLength(10);
        expect(within(juni).getByTestId('day:29;dayColor:NONE')).toBeInTheDocument();
    });
    it('Skal ikke vise label for helg når uttaket ikke inkluderer en helg.', () => {
        render(<KortPeriodeUtenHelg />);
        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Adopsjon')).toBeInTheDocument();
        expect(screen.queryByText('Helg')).not.toBeInTheDocument();
    });

    it('skal markere en periode som ikke overlapper med eksisterende perioder', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const januar = screen.getByTestId('year:2024;month:0');

        await userEvent.click(within(januar).getByText('10', { exact: false }));
        await userEvent.click(within(januar).getByText('26', { exact: false }));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        expect(screen.getAllByText('2 uker og 3 dager valgt')).toHaveLength(2);
        expect(
            screen.getByText(
                "Du har markert dager som ikke er lagt til i planen ennå. Velg 'Legg til' for å opprette en ny periode.",
            ),
        ).toBeInTheDocument();
        expect(screen.queryByText('Valgte datoer inneholder eksisterende perioder:')).not.toBeInTheDocument();

        expect(within(januar).getByTestId('day:9;dayColor:NONE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:10;dayColor:DARKBLUE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:26;dayColor:DARKBLUE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:27;dayColor:GRAY')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:29;dayColor:NONE')).toBeInTheDocument();
        expect(within(januar).getAllByTestId('dayColor:DARKBLUE', { exact: false })).toHaveLength(13);
    });

    it('skal velge enkeltperioder', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Enkeltdager'));

        const januar = screen.getByTestId('year:2024;month:0');

        await userEvent.click(within(januar).getByText('10', { exact: false }));
        await userEvent.click(within(januar).getByText('26', { exact: false }));

        expect(await screen.findByText('2 dager valgt')).toBeInTheDocument();

        expect(within(januar).getByTestId('day:9;dayColor:NONE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:10;dayColor:DARKBLUE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:11;dayColor:NONE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:25;dayColor:NONE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:26;dayColor:DARKBLUE')).toBeInTheDocument();
        expect(within(januar).getByTestId('day:27;dayColor:GRAY')).toBeInTheDocument();
        expect(within(januar).getAllByTestId('dayColor:DARKBLUE', { exact: false })).toHaveLength(2);
    });

    it('skal markere en periode som overlapper med eksisterende perioder', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        const mai = screen.getByTestId('year:2024;month:4');

        await userEvent.click(within(mars).getByTestId('day:14;dayColor:BLUE'));
        await userEvent.click(within(mai).getByTestId('day:31;dayColor:BLUE'));

        expect(screen.getByText('57')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        expect(await screen.findAllByText('11 uker og 2 dager valgt')).toHaveLength(2);

        expect(screen.getByText('Valgte datoer inneholder eksisterende perioder:')).toBeInTheDocument();
        expect(
            screen.queryByText(
                "Du har markert dager som ikke er lagt til i planen ennå. Velg 'Legg til' for å opprette en ny periode.",
            ),
        ).not.toBeInTheDocument();

        const fpFørFødselPeriode = within(screen.getByTestId(`eksisterende-periode-2024-03-14-2024-04-03`));
        expect(fpFørFødselPeriode.getAllByText('Mor')).toHaveLength(2);
        expect(fpFørFødselPeriode.getByText('Foreldrepenger før fødsel')).toBeInTheDocument();
        expect(fpFørFødselPeriode.getByText('15 dager valgt i perioden')).toBeInTheDocument();

        const foreldrepengerPeriode = within(screen.getByTestId(`eksisterende-periode-2024-04-04-2024-04-18`));
        expect(foreldrepengerPeriode.getAllByText('Mor')).toHaveLength(2);
        expect(foreldrepengerPeriode.getByText('Mors kvote')).toBeInTheDocument();
        expect(foreldrepengerPeriode.getByText('11 dager valgt i perioden')).toBeInTheDocument();

        const arbeidPeriode = within(screen.getByTestId(`eksisterende-periode-2024-05-17-2024-05-23`));
        expect(arbeidPeriode.getAllByText('Ferie')).toHaveLength(2);
        expect(arbeidPeriode.getByText('5 dager valgt i perioden')).toBeInTheDocument();

        const fellesperiode = within(screen.getByTestId(`eksisterende-periode-2024-05-31-2024-06-13`));
        expect(fellesperiode.getAllByText('Mor')).toHaveLength(2);
        expect(fellesperiode.getByText('Fellesperiode')).toBeInTheDocument();
        expect(fellesperiode.getByText('1 dag valgt i perioden')).toBeInTheDocument();
    });

    it('skal vise infomelding når en velger dag før fødselsdato', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByText('28', { exact: false }));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        expect(
            await screen.findByText(
                'Du mister dager hvis du ikke har foreldrepenger før termin eller i de seks første ukene etter fødsel.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise infomelding når en velger dag i de første 6 ukene etter fødselsdato', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByText('12', { exact: false }));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        expect(
            await screen.findByText(
                'Du mister dager hvis du ikke har foreldrepenger før termin eller i de seks første ukene etter fødsel.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise infomelding når valg av dager gir ingen mulige kontotyper', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(mars).getByText('28', { exact: false }));
        await userEvent.click(within(april).getByText('12', { exact: false }));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        await userEvent.click(screen.getAllByText('Legg til')[0]!);

        expect(
            await screen.findByText(
                'Du har valgt en kombinasjon av dager som ikke tillater noen kvoter, og du kan derfor ikke legge til en periode.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise endre-knapp og preutfylte felter når en velger en hel periode', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByTestId('day:4;dayColor:PINK'));
        await userEvent.click(within(april).getByTestId('day:18;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        await userEvent.click(screen.getAllByText('Endre')[0]!);

        expect(await screen.findByText('Velg kvotetype')).toBeInTheDocument();
        expect(screen.getByLabelText('Mors kvote')).toBeChecked();
        expect(screen.getByText('Fars kvote')).toBeInTheDocument();
        expect(screen.getByText('Fellesperiode')).toBeInTheDocument();

        expect(await screen.findByText('Skal dere ha foreldrepenger samtidig?')).toBeInTheDocument();
        expect(screen.getAllByText('Ja')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Nei')[0]).toBeInTheDocument();
        expect(screen.getAllByLabelText('Nei')[0]).toBeChecked();

        expect(await screen.findByText('Skal du kombinere foreldrepengene med arbeid?')).toBeInTheDocument();
        expect(screen.getAllByText('Ja')[1]).toBeInTheDocument();
        expect(screen.getAllByText('Nei')[1]).toBeInTheDocument();
        expect(screen.getAllByLabelText('Nei')[1]).toBeChecked();
    });

    it('skal slette foreldrepenger før fødsel og fremdeles beholde markering for dagene etter fødsel', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(mars).getByTestId('day:18;dayColor:BLUE'));
        await userEvent.click(within(april).getByTestId('day:18;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        const foreldrepengerFørFødsel = within(screen.getByTestId(`eksisterende-periode-2024-03-14-2024-04-03`));

        await userEvent.click(foreldrepengerFørFødsel.getByText('Slett dager fra periode'));

        expect(within(mars).getByTestId('day:18;dayColor:NONE')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(2);
        expect(within(april).getByTestId('day:1;dayColor:NONE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:3;dayColor:NONE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:4;dayColor:DARKBLUE')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:DARKBLUE', { exact: false })).toHaveLength(11);
    });
});
