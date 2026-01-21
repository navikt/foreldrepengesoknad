import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Uttaksplankalender.stories';

const {
    MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering,
    FarSøkerMedTapteDagerOgUtsettelse,
    MorSøkerMedFlereUtsettelser,
    HarPeriode11UkerFørFamiliehendelseDato,
    VisFarsAktivitetsfriKvote,
    MorOverførerFarsKvote,
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
        expect(within(juli).getByTestId('day:3;dayColor:GREEN')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:15;dayColor:GREEN')).toBeInTheDocument();
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
        expect(within(juni).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(10);
        expect(within(juni).getByTestId('day:14;dayColor:GREEN')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:15;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:18;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(10);
        expect(within(juni).getByTestId('day:28;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:29;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUEOUTLINE', { exact: false })).toHaveLength(2);
        expect(within(juni).getByTestId('day:30;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        const juli = screen.getByTestId('year:2021;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUEOUTLINE', { exact: false })).toHaveLength(12);
        expect(within(juli).getByTestId('day:16;dayColor:BLUEOUTLINE')).toBeInTheDocument();
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
        expect(within(juni).getByTestId('day:29;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:30;dayColor:BLACK')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2021;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLACK', { exact: false })).toHaveLength(7);
    });

    it('skal markere en periode som ikke overlapper med eksisterende perioder', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[0]!);

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

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Enkeltdager'));

        await userEvent.click(screen.getAllByText('Vis flere måneder')[0]!);

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

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

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

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

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

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

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

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(mars).getByTestId('day:13;dayColor:NONE'));
        await userEvent.click(within(april).getByTestId('day:12;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        await userEvent.click(screen.getAllByText('Endre')[0]!);

        expect(
            await screen.findByText('Du har valgt en kombinasjon av dager som ikke er gyldig for noen foreldre.'),
        ).toBeInTheDocument();
    });

    it('skal vise endre-knapp og preutfylte felter når en velger en del av en eksisterende periode', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByTestId('day:4;dayColor:PINK'));
        await userEvent.click(within(april).getByTestId('day:18;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        await userEvent.click(screen.getAllByText('Endre')[0]!);

        expect(await screen.findByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();
        expect(screen.getAllByLabelText('Mor')[1]).toBeChecked();

        expect(screen.getByText('Mor skal ha?')).toBeInTheDocument();
        expect(screen.getByLabelText('Mors kvote')).toBeChecked();

        expect(screen.getByText('Skal mor kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        expect(screen.getByLabelText('Nei')).toBeChecked();
    });

    it('skal slette foreldrepenger før fødsel og fremdeles beholde markering for dagene etter fødsel', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

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

    it('skal vise flere måneder i starten av kalender', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        expect(screen.queryByText('Vis flere måneder')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        expect(screen.getAllByText('Vis flere måneder')).toHaveLength(2);

        expect(screen.getByTestId('year:2024;month:2')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2024;month:1')).not.toBeInTheDocument();
        expect(screen.queryByTestId('year:2024;month:0')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[0]!);

        expect(screen.getByTestId('year:2024;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:0')).toBeInTheDocument();

        // Kun den på slutten vises
        expect(screen.getByText('Vis flere måneder')).toBeInTheDocument();
    });

    it('skal ikke kunne legge til flere måneder på starten når en allerede viser maks antall måneder', async () => {
        render(<HarPeriode11UkerFørFamiliehendelseDato />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        expect(screen.queryByText('Vis flere måneder')).not.toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        // Kun den på slutten vises
        expect(screen.getByText('Vis flere måneder')).toBeInTheDocument();

        expect(screen.getByTestId('year:2024;month:2')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:0')).toBeInTheDocument();
    });

    it('skal legge til nye måneder på slutten helt til maks antall måneder er nådd', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        expect(screen.getByTestId('year:2024;month:6')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2024;month:7')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2024;month:7')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:8')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:9')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2024;month:10')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2024;month:10')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:11')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:0')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:1')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2025;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:2')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:3')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:4')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2025;month:4')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:5')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:6')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:7')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2025;month:7')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:8')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:9')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:10')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2025;month:10')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:11')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:0')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:1')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2026;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:2')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:3')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:4')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2026;month:4')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:5')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:6')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:7')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2026;month:7')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:8')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:9')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:10')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2026;month:10')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:11')).toBeInTheDocument();
        expect(screen.getByTestId('year:2027;month:0')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2027;month:1')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[1]!);

        expect(screen.getByTestId('year:2027;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2027;month:2')).toBeInTheDocument();
        expect(screen.getByTestId('year:2027;month:3')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2027;month:4')).not.toBeInTheDocument();

        expect(screen.getByText('Du viser maks antall måneder (3 år)')).toBeInTheDocument();
    });

    it('skal vise perioder med aktivitetsfri kvote', async () => {
        render(<VisFarsAktivitetsfriKvote />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByTestId('day:14;dayColor:GREENSTRIPED'));
        await userEvent.click(within(juni).getByTestId('day:21;dayColor:GREENOUTLINE'));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[2]!);

        expect(await screen.findAllByText('Foreldrepenger uten aktivitetskrav')).toHaveLength(2);
        expect(screen.getByText('Gradering: 50 %')).toBeInTheDocument();
    });

    it('skal legg til samtidig uttak, så fjerne det igjen', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        expect(await screen.findByText('Velg dager eller periode')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Vis flere måneder')[0]!);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByText('10', { exact: false }));
        await userEvent.click(within(juni).getByText('13', { exact: false }));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        await userEvent.click(screen.getAllByText('Endre')[0]!);

        expect(screen.getByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Begge'));

        expect(screen.getByText('Mor skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Mors kvote')[0]!);

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Fars kvote')[1]!);

        const samtidigprosentMor = screen.getByLabelText('Hvor mange prosent for mor?');
        await userEvent.type(samtidigprosentMor, '60');
        const samtidigprosentFar = screen.getByLabelText('Hvor mange prosent for far?');
        await userEvent.type(samtidigprosentFar, '40');

        expect(screen.getByText('Skal mor kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Nei')[1]!);

        await userEvent.click(screen.getByText('Legg til'));

        expect(within(juni).getByTestId('day:10;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:11;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:12;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:13;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:LIGHTGREENBLUE', { exact: false })).toHaveLength(5);

        //Velg periode på nytt
        await userEvent.click(within(juni).getByText('10', { exact: false }));
        await userEvent.click(within(juni).getByText('13', { exact: false }));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        expect(screen.getByText('Begge')).toBeInTheDocument();
        expect(screen.getByText('Mor har 60 % mødrekvote')).toBeInTheDocument();
        expect(screen.getByText('Far har 40 % fedrekvote')).toBeInTheDocument();
        expect(screen.getByText('4 dager valgt i perioden')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Slett dager fra periode'));

        expect(within(juni).getByTestId('day:10;dayColor:NONE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:11;dayColor:NONE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:12;dayColor:NONE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:13;dayColor:NONE')).toBeInTheDocument();
    });

    it('mor vil overføre fars kvote', async () => {
        render(<MorOverførerFarsKvote />);

        expect(await screen.findByText('Start redigering')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Start redigering'));

        const september = screen.getByTestId('year:2026;month:8');

        await userEvent.click(within(september).getByText('7', { exact: true }));
        await userEvent.click(within(september).getByText('18', { exact: false }));

        await userEvent.click(screen.getAllByText('Hva vil du endre til?')[3]!);

        await userEvent.click(screen.getAllByText('Endre')[0]!);

        expect(screen.getByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Mor'));

        expect(screen.getByText('Mor skal ha?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Fars kvote')[1]!);

        expect(screen.getByText('Hvorfor skal du overta fars kvote?')).toBeInTheDocument();
        expect(screen.getByText('Far er innlagt på sykehus')).toBeInTheDocument();
        expect(
            screen.getByText(
                'I noen tilfeller kan du søke om å overta den andre forelderens kvote. I søknaden vil Nav be om dokumentasjon.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Far er innlagt på sykehus'));

        await userEvent.click(screen.getByText('Legg til'));

        expect(within(september).getByTestId('day:7;dayColor:BLUE')).toBeInTheDocument();
        expect(within(september).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(10);
    });
});
