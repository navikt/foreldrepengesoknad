import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Uttaksplankalender.stories';

import messages from '../intl/messages/nb_NO.json';

const {
    MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering,
    FarSøkerMedTapteDagerOgFerie,
    MorSøkerMedFlereUtsettelser,
    HarPeriode11UkerFørFamiliehendelseDato,
    VisFarsAktivitetsfriKvote,
    MorOverførerFarsKvote,
    SamtidigUttak,
    MorSøkerOgFarHarEøsPeriode,
    MarkerPeriodeNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt,
    MarkerPeriodeNårGraderingsaktivitetMangler,
    FarsUttakMorForSyk,
    FarSøkerEtterAtMorHarSøkt,
    MedArbeidsforhold,
    SkalHaPeriodeMedFratrekkForPleiepenger,
    HarUtsettelse,
    FlerbarnMorOgFar,
    SkalIkkeViseAvslåttePerioderSomOverlapperMedAndrePerioder,
    KunFarHarRettOgHarPauseperiode,
    SkalViseAvslåttPeriodeKorrekt,
    SkalIkkeMarkereAvslåttePerioderMedVarselOmMorsAktivitet,
} = composeStories(stories);

describe('UttaksplanKalender', () => {
    it('skal vise riktige labels og farger på periodene i kalender med gradering, samtidig uttak og tapte dager', () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(screen.getByText(messages['kalender.dinPeriode'])).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.periodeListeHeader.fødsel'])).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.periodeListeHeader.dagerDuKanTape'])).toBeInTheDocument();
        expect(screen.getByText(messages['kalender.dinPeriode.gradert'])).toBeInTheDocument();
        expect(screen.getByText('Du og Hans har permisjon samtidig')).toBeInTheDocument();
        expect(screen.getByText("Hans' periode")).toBeInTheDocument();
        expect(screen.getByText(messages['kalender.helg'])).toBeInTheDocument();
        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:15;dayColor:BLUE')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
        expect(within(mars).getByTestId('day:29;dayColor:BLUE')).toBeInTheDocument();
        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:3;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:4;dayColor:BLUE;with-icon')).toBeInTheDocument();
        expect(within(april).getByTestId('day:5;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
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

    it('Skal vise ha tapte dager i perioden 6 uker etter fam-dato frem til ferie', () => {
        render(<FarSøkerMedTapteDagerOgFerie />);
        expect(screen.getByText(messages['kalender.dinPeriode'])).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.periodeListeHeader.fødsel'])).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.periodeListeHeader.dagerDuKanTape'])).toBeInTheDocument();
        expect(screen.getByText('Du har ferie')).toBeInTheDocument();
        expect(screen.getByText(messages['kalender.helg'])).toBeInTheDocument();
        const juli = screen.getByTestId('year:2021;month:6');
        expect(within(juli).getByTestId('day:9;dayColor:NONE')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:12;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:28;dayColor:BLACK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:29;dayColor:BLUEOUTLINE')).toBeInTheDocument();
    });
    it('Skal ikke vise utsettelsegrunn i label når en har flere typer utsettelser i planen', () => {
        render(<MorSøkerMedFlereUtsettelser />);
        expect(screen.getByText(messages['kalender.dinPeriode'])).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.periodeListeHeader.fødsel'])).toBeInTheDocument();
        expect(screen.getByText('Du har ferie')).toBeInTheDocument();
        expect(screen.getByText(messages['kalender.helg'])).toBeInTheDocument();
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

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByText('29', { exact: false }));

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[0]!);

        await userEvent.click(within(mars).getByText('29', { exact: false }));

        const januar = screen.getByTestId('year:2024;month:0');

        await userEvent.click(within(januar).getByText('10', { exact: false }));
        await userEvent.click(within(januar).getByText('26', { exact: false }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

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

        const mars = screen.getByTestId('year:2024;month:2');
        await userEvent.click(within(mars).getByText('28', { exact: false }));

        expect(await screen.findByText(messages['UttaksplanKalender.VelgDagEllerPeriode'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['UttaksplanKalender.VelgEnkeltDager']));

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[0]!);

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

        const mars = screen.getByTestId('year:2024;month:2');
        const mai = screen.getByTestId('year:2024;month:4');

        await userEvent.click(within(mars).getByTestId('day:14;dayColor:BLUE'));
        await userEvent.click(within(mai).getByTestId('day:31;dayColor:BLUE'));

        expect(screen.getByText('57')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(await screen.findAllByText('11 uker og 2 dager valgt')).toHaveLength(2);

        expect(screen.getByText('Valgte datoer inneholder eksisterende perioder:')).toBeInTheDocument();
        expect(
            screen.queryByText(
                "Du har markert dager som ikke er lagt til i planen ennå. Velg 'Legg til' for å opprette en ny periode.",
            ),
        ).not.toBeInTheDocument();

        const fpFørFødselPeriode = within(screen.getByTestId(`eksisterende-periode-2024-03-14-2024-04-03`));
        expect(fpFørFødselPeriode.getAllByText(messages['RedigeringPanel.Mor'])).toHaveLength(2);
        expect(fpFørFødselPeriode.getByText(messages['uttaksplan.stønadskvotetype.FORELDREPENGER_FØR_FØDSEL'])).toBeInTheDocument();
        expect(fpFørFødselPeriode.getByText('3 uker')).toBeInTheDocument();

        const foreldrepengerPeriode = within(screen.getByTestId(`eksisterende-periode-2024-04-04-2024-04-18`));
        expect(foreldrepengerPeriode.getAllByText(messages['RedigeringPanel.Mor'])).toHaveLength(2);
        expect(foreldrepengerPeriode.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE'])).toBeInTheDocument();
        expect(foreldrepengerPeriode.getByText('2 uker 1 dag')).toBeInTheDocument();

        const arbeidPeriode = within(screen.getByTestId(`eksisterende-periode-2024-05-17-2024-05-23`));
        expect(arbeidPeriode.getAllByText(messages['uttaksplan.valgPanel.leggTilFerie.endre'])).toHaveLength(2);
        expect(arbeidPeriode.getByText('1 uke')).toBeInTheDocument();

        const fellesperiode = within(screen.getByTestId(`eksisterende-periode-2024-05-31-2024-06-13`));
        expect(fellesperiode.getAllByText(messages['RedigeringPanel.Mor'])).toHaveLength(2);
        expect(fellesperiode.getByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])).toBeInTheDocument();
        expect(fellesperiode.getByText('1 dag')).toBeInTheDocument();
    });

    it('skal vise infomelding når en velger dag før fødselsdato', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByText('28', { exact: false }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(
            await screen.findByText(messages['RedigeringPanel.KanMisteDager'],
            ),
        ).toBeInTheDocument();
    });

    it('skal vise infomelding når en velger dag i de første 6 ukene etter fødselsdato', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByText('12', { exact: false }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(
            await screen.findByText(messages['RedigeringPanel.KanMisteDager'],
            ),
        ).toBeInTheDocument();
    });

    it('skal vise infomelding når valg av dager krysser familiehendelsedato', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const mars = screen.getByTestId('year:2024;month:2');
        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(mars).getByTestId('day:13;dayColor:NONE'));
        await userEvent.click(within(april).getByTestId('day:12;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(
            await screen.findByText(
                'Du kan ikke endre planen når du markerer dager både før og etter fødselsdato. ' +
                    'Du må først endre planen før fødselsdato, og så endre planen fra og med fødselsdatoen.',
            ),
        ).toBeInTheDocument();
    });

    it('skal vise endre-knapp og preutfylte felter når en velger en del av en eksisterende periode', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByTestId('day:4;dayColor:BLUE;with-icon'));
        await userEvent.click(within(april).getByTestId('day:18;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(await screen.findByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        expect(screen.getAllByLabelText('Mor')[1]).toBeChecked();

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        expect(screen.getByLabelText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE'])).toBeChecked();

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        expect(screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.Nei'])).toBeChecked();
    });

    it('skal slette foreldrepenger før fødsel og fremdeles beholde markering for dagene etter fødsel', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const mars = screen.getByTestId('year:2024;month:2');
        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(mars).getByTestId('day:18;dayColor:BLUE'));
        await userEvent.click(within(april).getByTestId('day:18;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        const foreldrepengerFørFødsel = within(screen.getByTestId(`eksisterende-periode-2024-03-14-2024-04-03`));

        await userEvent.click(foreldrepengerFørFødsel.getByRole('button', { name: messages['RedigeringPanel.SlettPeriode'] }));

        expect(within(mars).getByTestId('day:18;dayColor:NONE')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(2);
        expect(within(april).getByTestId('day:1;dayColor:NONE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:3;dayColor:NONE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:4;dayColor:DARKBLUE')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:DARKBLUE', { exact: false })).toHaveLength(11);
    });

    it('skal vise flere måneder i starten av kalender', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const mars = screen.getByTestId('year:2024;month:2');
        await userEvent.click(within(mars).getByTestId('day:18;dayColor:BLUE'));

        expect(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])).toHaveLength(2);

        expect(screen.getByTestId('year:2024;month:2')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2024;month:1')).not.toBeInTheDocument();
        expect(screen.queryByTestId('year:2024;month:0')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[0]!);

        expect(screen.getByTestId('year:2024;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:0')).toBeInTheDocument();

        // Kun den på slutten vises
        expect(screen.getByText(messages['UttaksplanKalender.LeggTilMåneder'])).toBeInTheDocument();
    });

    it('skal ikke kunne legge til flere måneder på starten når en allerede viser maks antall måneder', async () => {
        render(<HarPeriode11UkerFørFamiliehendelseDato />);

        const juli = screen.getByTestId('year:2024;month:6');

        await userEvent.click(within(juli).getByTestId('day:3;dayColor:GREEN'));

        // Kun den på slutten vises
        expect(screen.getByText(messages['UttaksplanKalender.LeggTilMåneder'])).toBeInTheDocument();

        expect(screen.getByTestId('year:2024;month:2')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2024;month:0')).toBeInTheDocument();
    });

    it('skal legge til nye måneder på slutten helt til maks antall måneder er nådd', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const juli = screen.getByTestId('year:2024;month:6');

        await userEvent.click(within(juli).getByTestId('day:3;dayColor:GREEN'));

        expect(screen.getByTestId('year:2024;month:6')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:0')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2025;month:0')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:2')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:3')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2025;month:3')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:4')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:5')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:6')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2025;month:6')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:7')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:8')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2025;month:9')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2025;month:9')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:10')).toBeInTheDocument();
        expect(screen.getByTestId('year:2025;month:11')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:0')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2026;month:0')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:2')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:3')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2026;month:3')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:4')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:5')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:6')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2026;month:6')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:7')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:8')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2026;month:9')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2026;month:9')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:10')).toBeInTheDocument();
        expect(screen.getByTestId('year:2026;month:11')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2027;month:0')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2027;month:0')).toBeInTheDocument();
        expect(screen.getByTestId('year:2027;month:1')).toBeInTheDocument();
        expect(screen.getByTestId('year:2027;month:2')).toBeInTheDocument();
        expect(screen.queryByTestId('year:2027;month:3')).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['UttaksplanKalender.LeggTilMåneder'])[1]!);

        expect(screen.getByTestId('year:2027;month:3')).toBeInTheDocument();

        expect(screen.getByText(messages['UttaksplanKalender.Maks3År'])).toBeInTheDocument();
    });

    it('skal vise perioder med aktivitetsfri kvote', async () => {
        render(<VisFarsAktivitetsfriKvote />);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByTestId('day:14;dayColor:GREENSTRIPED'));
        await userEvent.click(within(juni).getByTestId('day:21;dayColor:GREENOUTLINE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[2]!);

        expect(await screen.findAllByText(messages['uttaksplan.stønadskvotetype.AKTIVITETSFRI_KVOTE'])).toHaveLength(2);
        expect(screen.getByText('Gradering: 50 %')).toBeInTheDocument();
    });

    it('skal legge til samtidig uttak, så fjerne det igjen', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByText('10', { exact: false }));
        await userEvent.click(within(juni).getByText('13', { exact: false }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE']));

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE']));

        const samtidigprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(samtidigprosentMor, '60');
        const samtidigprosentFar = screen.getByLabelText('Hvor mange prosent til far?');
        await userEvent.type(samtidigprosentFar, '40');

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(juni).getByTestId('day:10;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:11;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:12;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:13;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:LIGHTGREENBLUE', { exact: false })).toHaveLength(5);

        //Velg periode på nytt
        await userEvent.click(within(juni).getByText('10', { exact: false }));
        await userEvent.click(within(juni).getByText('13', { exact: false }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getByText(messages['RedigeringPanel.Begge'])).toBeInTheDocument();
        expect(screen.getByText('Mor har 60 % mødrekvote')).toBeInTheDocument();
        expect(screen.getByText('Far har 40 % fedrekvote')).toBeInTheDocument();
        expect(screen.getAllByText('4 dager valgt')).toHaveLength(2);
        expect(screen.getByText('4 dager')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: messages['RedigeringPanel.SlettPeriode'] }));

        expect(within(juni).getByTestId('day:10;dayColor:NONE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:11;dayColor:NONE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:12;dayColor:NONE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:13;dayColor:NONE')).toBeInTheDocument();
    });

    it('mor vil overføre fars kvote', async () => {
        render(<MorOverførerFarsKvote />);

        const september = screen.getByTestId('year:2026;month:8');

        await userEvent.click(within(september).getByText('7', { exact: true }));
        await userEvent.click(within(september).getByText('18', { exact: false }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Mor']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE'])[1]!);

        expect(screen.getByText('Hvorfor skal du overta fars kvote?')).toBeInTheDocument();
        expect(screen.getByText('Far er innlagt på sykehus eller annen helseinstitusjon')).toBeInTheDocument();
        expect(
            screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Overføring.Info2.Mor']),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText('Far er innlagt på sykehus eller annen helseinstitusjon'));

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(september).getByTestId('day:7;dayColor:BLUE')).toBeInTheDocument();
        expect(within(september).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(10);
    });

    it('skal vise advarsel om at en mister dager om en velger å gradere i treukersperioden før fødsel som mor', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByText('14', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);
        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(
            screen.getByText(
                'Arbeid i tidsrommet 3 uker før termin og 6 uker etter fødsel,' +
                    ' betyr at foreldrepengene vil reduseres det du jobber uten at du får dagene til gode til senere.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Nei']));

        expect(
            screen.queryByText(
                'Arbeid i tidsrommet 3 uker før termin og 6 uker etter fødsel,' +
                    ' betyr at foreldrepengene vil reduseres det du jobber uten at du får dagene til gode til senere.',
            ),
        ).not.toBeInTheDocument();
    });

    it('skal vise advarsel om at en mister dager om en velger å gradere i seksukersperioden etter fødsel som mor', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const mai = screen.getByTestId('year:2024;month:4');

        await userEvent.click(within(mai).getByText('15', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);
        await userEvent.click(screen.getAllByText(messages['LeggTilPeriodePanel.LeggTil'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['RedigeringPanel.Mor']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        expect(
            screen.getByText(
                'Arbeid i tidsrommet 3 uker før termin og 6 uker etter fødsel,' +
                    ' betyr at foreldrepengene vil reduseres det du jobber uten at du får dagene til gode til senere.',
            ),
        ).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Nei']));

        expect(
            screen.queryByText(
                'Arbeid i tidsrommet 3 uker før termin og 6 uker etter fødsel,' +
                    ' betyr at foreldrepengene vil reduseres det du jobber uten at du får dagene til gode til senere.',
            ),
        ).not.toBeInTheDocument();
    });

    it('skal ikke kunne endre eller slette en EØS-periode', async () => {
        render(<MorSøkerOgFarHarEøsPeriode />);

        const juli = screen.getByTestId('year:2024;month:6');

        await userEvent.click(within(juli).getByText('15', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE'])).toBeInTheDocument();
        expect(screen.getByText(messages['RedigeringPanel.EøsPeriode'])).toBeInTheDocument();
        expect(
            screen.getByText(messages['RedigeringPanel.IkkeRedigerbarEøsUttakPeriode'],
            ),
        ).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.avbryt'])).toBeInTheDocument();
        expect(screen.queryByText(messages['uttaksplan.endre'])).not.toBeInTheDocument();
        expect(screen.queryByText(messages['RedigeringPanel.EndreTilFerie'])).not.toBeInTheDocument();
    });

    it('mor og far tar samtidig uttak - far fellesperiode med 100% samtidig uttak skal trigge aktivitetskrav', async () => {
        render(<SamtidigUttak />);

        const september = screen.getByTestId('year:2026;month:8');

        await userEvent.click(within(september).getByText('7', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);
        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE']));

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[1]!);

        const samtidigprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(samtidigprosentMor, '50');

        const samtidigprosentFar = screen.getByLabelText('Hvor mange prosent til far?');
        await userEvent.type(samtidigprosentFar, '50');

        expect(screen.getByText(messages['AktivitetskravSpørsmål.Label'])).toBeInTheDocument();

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['AktivitetskravSpørsmål.Påkrevd'])).toBeInTheDocument();

        const aktivitetskravSelect = screen.getByLabelText(messages['AktivitetskravSpørsmål.Label']);
        await userEvent.selectOptions(aktivitetskravSelect, 'Arbeid');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(september).getByTestId('day:7;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
    });

    it('mor og far tar samtidig uttak - mindre enn 100 % samtidig uttak skal trigge krav om gradering', async () => {
        render(<SamtidigUttak />);

        const september = screen.getByTestId('year:2026;month:8');

        await userEvent.click(within(september).getByText('7', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);
        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE']));

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[1]!);

        await userEvent.selectOptions(screen.getByLabelText(messages['AktivitetskravSpørsmål.Label']), 'ARBEID');

        const samtidigprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(samtidigprosentMor, '40');

        const samtidigprosentFar = screen.getByLabelText('Hvor mange prosent til far?');
        await userEvent.type(samtidigprosentFar, '40');

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(
            screen.getByText(
                'Når dere har mindre enn 100 % foreldrepenger til sammen, ' +
                    'må dere også jobbe slik at summen av arbeid og foreldrepenger blir 100 % per forelder',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const arbeidsprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor']);
        await userEvent.type(arbeidsprosentMor, '60');

        const arbeidsprosentFar = screen.getByLabelText('Hvor mange prosent skal far jobbe?');
        await userEvent.type(arbeidsprosentFar, '60');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(september).getByTestId('day:7;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
    });

    it('mor og far tar samtidig uttak - dersom kombinert uttak er mer enn 100 % skal man ikke kunne ta mer enn 50 % fellesperiode', async () => {
        render(<SamtidigUttak />);

        const september = screen.getByTestId('year:2026;month:8');

        await userEvent.click(within(september).getByText('7', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);
        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE']));

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[1]!);

        await userEvent.selectOptions(screen.getByLabelText(messages['AktivitetskravSpørsmål.Label']), 'ARBEID');

        const samtidigprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(samtidigprosentMor, '60');

        const samtidigprosentFar = screen.getByLabelText('Hvor mange prosent til far?');
        await userEvent.type(samtidigprosentFar, '51');

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.Maks50ProsentFelles'])).toBeInTheDocument();

        await userEvent.clear(samtidigprosentFar);
        await userEvent.type(samtidigprosentFar, '50');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(
            screen.getByText(
                'Når dere har mindre enn 100 % foreldrepenger til sammen, må dere også jobbe' +
                    ' slik at summen av arbeid og foreldrepenger blir 100 % per forelder',
            ),
        ).toBeInTheDocument();

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        const arbeidsprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor']);
        await userEvent.type(arbeidsprosentMor, '40');

        const arbeidsprosentFar = screen.getByLabelText('Hvor mange prosent skal far jobbe?');
        await userEvent.type(arbeidsprosentFar, '50');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(september).getByTestId('day:7;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
    });

    it('mor og far tar samtidig uttak - fedrekvote + mødrekvote kan ikke være mer enn 100 % til sammen', async () => {
        render(<SamtidigUttak />);

        const september = screen.getByTestId('year:2026;month:8');

        await userEvent.click(within(september).getByText('7', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);
        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE']));

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE'])[1]!);

        const samtidigprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(samtidigprosentMor, '50');

        const samtidigprosentFar = screen.getByLabelText('Hvor mange prosent til far?');
        await userEvent.type(samtidigprosentFar, '51');

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[0]!);

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(
            screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.ToKvoterMerEnn100Prosent']),
        ).toBeInTheDocument();

        await userEvent.clear(samtidigprosentFar);
        await userEvent.type(samtidigprosentFar, '50');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(september).getByTestId('day:7;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
    });

    it('skal vise meldinger om at en må fylle ut mors aktivitet når en har stjernemerkede perioder', async () => {
        render(<MarkerPeriodeNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt />);

        expect(
            await screen.findByText(messages['UttaksplanKalender.MarkertePerioder']),
        ).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');

        await userEvent.click(within(juli).getByTestId('day:3;dayColor:GREEN;with-icon'));
        await userEvent.click(within(juli).getByTestId('day:15;dayColor:GREEN;with-icon'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getByText(messages['RedigeringPanel.MorsAktivitetIkkeValgt'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt'])).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText(messages['AktivitetskravSpørsmål.Label']), 'ARBEID');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText('16 uker og 4 dager til mor')).toBeInTheDocument();
        expect(screen.getByText('19 uker til far')).toBeInTheDocument();
        expect(screen.getByText('16 uker og 2 dager fellesperiode')).toBeInTheDocument();

        expect(screen.queryByText('Stjernemerkede perioder i kalenderen mangler valg')).not.toBeInTheDocument();
    });

    it('skal vise melding om at gradering manglar arbeidsgiver når plan kjem frå planleggar', async () => {
        render(<MarkerPeriodeNårGraderingsaktivitetMangler />);

        expect(
            await screen.findByText(messages['UttaksplanKalender.MarkertePerioderGradering'],
            ),
        ).toBeInTheDocument();
    });

    it('skal ikke som far kunne overskrive en dag i perioden to->tre uker før fødselsdato', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByTestId('day:14;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['LeggTilPeriodePanel.LeggTil'])[0]!);

        expect(
            screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.AnnenPartLåst'],
            ),
        ).toBeInTheDocument();
    });

    it('skal kunne legge til sin egen periode over perioden til annen part', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByTestId('day:28;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['LeggTilPeriodePanel.LeggTil'])[0]!);

        expect(screen.queryByRole('radio', { name: messages['RedigeringPanel.Mor'] })).not.toBeInTheDocument();
        expect(screen.getByRole('radio', { name: messages['RedigeringPanel.Far'] })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: messages['RedigeringPanel.Begge'] })).toBeInTheDocument();
    });

    it('skal ikke kunne slette periodene til annen part', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByTestId('day:28;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        const foreldrepengerFørFødsel = within(screen.getByTestId(`eksisterende-periode-2024-03-14-2024-04-03`));

        expect(foreldrepengerFørFødsel.queryByRole('button', { name: messages['RedigeringPanel.SlettPeriode'] })).not.toBeInTheDocument();
    });

    it('skal automatisk få opp mor sin gradering når far velger BEGGE etter å ha trykket på mors periode', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByTestId('day:14;dayColor:BLUESTRIPED'));
        await userEvent.click(within(juni).getByTestId('day:27;dayColor:BLUESTRIPED'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['LeggTilPeriodePanel.LeggTil'])[0]!);

        expect(screen.queryByRole('radio', { name: messages['RedigeringPanel.Mor'] })).not.toBeInTheDocument();
        expect(screen.getByRole('radio', { name: messages['RedigeringPanel.Far'] })).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: messages['RedigeringPanel.Begge'] })).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();

        expect(screen.getByLabelText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE'])).toBeDisabled();
        expect(screen.getAllByLabelText('Fellesperiode')[0]).toBeDisabled();
        expect(screen.getAllByLabelText('Fellesperiode')[0]).toBeChecked();
        expect(screen.getAllByText('Ja')).toHaveLength(2);
        expect(screen.getAllByLabelText('Ja')[0]).toBeChecked();

        expect(screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor'])).toHaveValue('50');

        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE']));

        const samtidigprosentMor = screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(samtidigprosentMor, '50');
        const samtidigprosentFar = screen.getByLabelText('Hvor mange prosent til far?');
        await userEvent.type(samtidigprosentFar, '50');

        expect(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])).toHaveLength(2);
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        // Mor sine senere perioder er låst, så «Endre uten å flytte resten av
        // planen» er eneste mulige valg. Da skal spørsmålet ikke vises, og
        // endringen utføres direkte uten å flytte resten av planen.
        expect(screen.queryByText(messages['RedigeringPanel.HvaSkalSkje'])).not.toBeInTheDocument();

        const juniEtter = screen.getByTestId('year:2024;month:5');
        expect(await within(juniEtter).findByTestId('day:14;dayColor:LIGHTBLUEGREEN')).toBeInTheDocument();
    });

    it('dersom far/medmor tar ut fedrekvoten i perioden rundt fødsel forbeholdt mor må han laste opp dokumentasjon', async () => {
        render(<FarsUttakMorForSyk />);

        const februar = screen.getByTestId('year:2026;month:1');

        await userEvent.click(within(februar).getAllByText('9', { exact: true })[0]!);

        expect(
            screen.queryByText(
                'De første seks ukene er vanligvis kun for mor.' +
                    ' I noen tilfeller kan du få foreldrepenger i stedet for mor.',
            ),
        ).not.toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['RedigeringPanel.Far']));

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE']));

        expect(
            screen.queryByText(
                'De første seks ukene er vanligvis kun for mor.' +
                    ' I noen tilfeller kan du få foreldrepenger i stedet for mor.',
            ),
        ).toBeInTheDocument();
    });

    it('skal kunne velge å forskyve periodene ved innlegging av ferie', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByTestId('day:3;dayColor:BLUE'));

        expect(within(juni).getByTestId('day:14;dayColor:BLUESTRIPED')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndreTilFerie']));

        expect(await screen.findByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.FlyttPlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(juni).getByTestId('day:3;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:14;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:17;dayColor:BLUESTRIPED')).toBeInTheDocument();
    });

    it('skal ikke vise forskyvspørsmålet når en har valgt dager før familiehendelsesdato', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByTestId('day:1;dayColor:BLUE'));
        await userEvent.click(within(april).getByTestId('day:3;dayColor:BLUE'));

        expect(within(april).getByTestId('day:19;dayColor:BLACK')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndreTilFerie']));

        // Når «Endre og flytt resten av planen» ikke er mulig (valgt dager før seks
        // uker etter fødsel/termin) er «Endre uten å flytte» eneste valg. Da skal
        // spørsmålet ikke vises – endringen utføres direkte uten å flytte planen.
        expect(screen.queryByText(messages['RedigeringPanel.HvaSkalSkje'])).not.toBeInTheDocument();

        const aprilEtter = screen.getByTestId('year:2024;month:3');
        expect(await within(aprilEtter).findByTestId('day:1;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(aprilEtter).getByTestId('day:19;dayColor:BLACK')).toBeInTheDocument();
    });

    it('skal kunne velge å forskyve periodene ved endring til fars periode', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByTestId('day:16;dayColor:BLUE'));
        await userEvent.click(within(april).getByTestId('day:18;dayColor:BLUE'));

        expect(within(april).getByTestId('day:19;dayColor:BLACK')).toBeInTheDocument();
        expect(within(april).getByTestId('day:22;dayColor:BLACK')).toBeInTheDocument();
        expect(within(april).getByTestId('day:23;dayColor:BLACK')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Far']));

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE']));

        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Nei']));

        await userEvent.selectOptions(screen.getByLabelText(messages['AktivitetskravSpørsmål.Label']), 'INNLAGT');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(await screen.findByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.FlyttPlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(within(april).getByTestId('day:16;dayColor:GREEN')).toBeInTheDocument();
        expect(within(april).getByTestId('day:17;dayColor:GREEN')).toBeInTheDocument();
        expect(within(april).getByTestId('day:18;dayColor:GREEN')).toBeInTheDocument();
        expect(within(april).getByTestId('day:19;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:22;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:23;dayColor:BLUE')).toBeInTheDocument();
    });

    it('skal slette periode direkte uten å spørre om forskyvning', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const mai = screen.getByTestId('year:2024;month:4');

        await userEvent.click(within(mai).getByTestId('day:17;dayColor:BLUEOUTLINE'));
        await userEvent.click(within(mai).getByTestId('day:20;dayColor:BLUEOUTLINE'));

        expect(within(mai).getByTestId('day:23;dayColor:BLUEOUTLINE')).toBeInTheDocument();
        expect(within(mai).getByTestId('day:24;dayColor:NONE')).toBeInTheDocument();
        expect(within(mai).getByTestId('day:31;dayColor:BLUE')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        const ferie = within(screen.getByTestId(`eksisterende-periode-2024-05-17-2024-05-23`));

        await userEvent.click(ferie.getByRole('button', { name: messages['RedigeringPanel.SlettPeriode'] }));

        // Perioden bak skal ikkje flytta (dag 31 er framleis BLUE på same plass)
        expect(within(mai).getByTestId('day:31;dayColor:BLUE')).toBeInTheDocument();
        // Forskyvspørsmålet skal ikkje visast
        expect(screen.queryByText('Hva vil du gjøre med dagene du sletter?')).not.toBeInTheDocument();
    });

    it('skal måtte oppgi arbeidsforhold når en graderer', async () => {
        render(<MedArbeidsforhold />);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByTestId('day:3;dayColor:BLUE'));
        await userEvent.click(within(juni).getByTestId('day:13;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Ja'));

        const arbeidsprosentMor = screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor']);
        await userEvent.type(arbeidsprosentMor, '60');

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.HvorSkalDuJobbe'])).toBeInTheDocument();
        await userEvent.click(screen.getByText('Bedrift AS'));

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        await userEvent.click(within(juni).getByTestId('day:3;dayColor:BLUESTRIPED'));
        await userEvent.click(within(juni).getByTestId('day:13;dayColor:BLUESTRIPED'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByRole('radio', { name: /Bedrift AS/i })).toBeChecked();
    });

    it('skal vise perioder for avslag av pleiepenger og annet', async () => {
        render(<SkalHaPeriodeMedFratrekkForPleiepenger />);

        const april = screen.getByTestId('year:2024;month:3');

        await userEvent.click(within(april).getByTestId('day:17;dayColor:DARKGRAY'));
        await userEvent.click(within(april).getByTestId('day:23;dayColor:DARKGRAY'));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Maksimer']));

        const div = within(
            screen.getByText('Valgte datoer inneholder en eksisterende periode:').closest('div')!.parentElement!
                .parentElement!,
        );

        expect(div.getByText(messages['RedigeringPanel.Pleiepenger'])).toBeInTheDocument();
        expect(
            screen.getByText(messages['RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger']),
        ).toBeInTheDocument();

        expect(div.queryByText(messages['uttaksplan.endre'])).not.toBeInTheDocument();
        expect(div.queryByText(messages['RedigeringPanel.EndreTilFerie'])).not.toBeInTheDocument();
        expect(div.queryByText(messages['LeggTilPeriodePanel.LeggTil'])).not.toBeInTheDocument();
        expect(div.queryByText(messages['RedigeringPanel.LeggTilUtsettelse'])).not.toBeInTheDocument();
        expect(div.getByText(messages['uttaksplan.avbryt'])).toBeInTheDocument();

        await userEvent.click(div.getByText(messages['uttaksplan.avbryt']));

        await userEvent.click(within(april).getByTestId('day:24;dayColor:BLACKOUTLINE'));
        await userEvent.click(within(april).getByTestId('day:29;dayColor:BLACKOUTLINE'));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Maksimer']));

        const div2 = within(
            screen.getByText('Valgte datoer inneholder en eksisterende periode:').closest('div')!.parentElement!
                .parentElement!,
        );
        expect(div2.getByText(messages['kalender.avslag'])).toBeInTheDocument();

        expect(div2.getAllByText(messages['uttaksplan.endre'])).toHaveLength(2);
        expect(div2.getByText(messages['RedigeringPanel.LeggTilUtsettelse'])).toBeInTheDocument();
        expect(div2.getByText(messages['uttaksplan.avbryt'])).toBeInTheDocument();
    });

    it('skal lukke dialog for forskyv/erstatt om en endrer på dager i kalender', async () => {
        render(<MedArbeidsforhold />);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByTestId('day:3;dayColor:BLUE'));
        await userEvent.click(within(juni).getByTestId('day:12;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.stønadskvotetype.MØDREKVOTE']));

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(within(juni).getByTestId('day:13;dayColor:BLUE'));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        expect(screen.queryByText(messages['RedigeringPanel.HvaSkalSkje'])).not.toBeInTheDocument();
    });

    it('skal ikke få spørsmål om forskyv/erstatt når en sletter siste dag i kalenderen', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        const juli = screen.getByTestId('year:2024;month:6');

        await userEvent.click(within(juli).getByTestId('day:15;dayColor:GREEN'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getByRole('button', { name: messages['RedigeringPanel.SlettPeriode'] }));

        expect(within(juli).getByTestId('day:15;dayColor:NONE')).toBeInTheDocument();
    });

    it('skal ha utsettelse og så legge til en ekstra dag med utsettelse', async () => {
        render(<HarUtsettelse />);

        expect(await screen.findByText('Du har utsatt uttaket av foreldrepenger')).toBeInTheDocument();

        const januar = screen.getByTestId('year:2026;month:0');

        await userEvent.click(within(januar).getByTestId('day:23;dayColor:BEIGEOUTLINE'));
        await userEvent.click(within(januar).getByTestId('day:29;dayColor:BEIGEOUTLINE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getByText(messages['uttaksplan.periodeListeHeader.instutisjonBarn'])).toBeInTheDocument();
        expect(screen.getByText(messages['RedigeringPanel.LeggTilUtsettelse'])).toBeInTheDocument();

        await userEvent.click(within(januar).getByTestId('day:22;dayColor:BLUE'));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.LeggTilUtsettelse']));

        await userEvent.selectOptions(screen.getByLabelText(messages['LeggTilUtsettelsePanel.VelgÅrsak']), 'SØKER_SYKDOM');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(within(januar).getByTestId('day:22;dayColor:BEIGEOUTLINE')).toBeInTheDocument();
    });

    it('skal fjerne utsettelse-dialog når en velger ny dag', async () => {
        render(<HarUtsettelse />);

        expect(await screen.findByText('Du har utsatt uttaket av foreldrepenger')).toBeInTheDocument();

        const januar = screen.getByTestId('year:2026;month:0');

        await userEvent.click(within(januar).getByTestId('day:22;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getByText(messages['RedigeringPanel.LeggTilUtsettelse']));

        expect(screen.getByText(messages['LeggTilUtsettelsePanel.VelgÅrsak'])).toBeInTheDocument();

        await userEvent.click(within(januar).getByTestId('day:23;dayColor:BEIGEOUTLINE'));

        expect(screen.getByText('Valgte datoer inneholder eksisterende perioder:')).toBeInTheDocument();
        expect(screen.queryByText(messages['LeggTilUtsettelsePanel.VelgÅrsak'])).not.toBeInTheDocument();
    });

    it('skal kunne legge til utsettelse så lenge minst en dag i 6-ukersperioden er valgt', async () => {
        render(<HarUtsettelse />);

        expect(await screen.findByText('Du har utsatt uttaket av foreldrepenger')).toBeInTheDocument();

        const januar = screen.getByTestId('year:2026;month:0');

        await userEvent.click(within(januar).getByTestId('day:20;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getByText(messages['RedigeringPanel.EndreTilFerie'])).toBeInTheDocument();

        await userEvent.click(within(januar).getByTestId('day:22;dayColor:BLUE'));

        expect(screen.getByText(messages['RedigeringPanel.LeggTilUtsettelse'])).toBeInTheDocument();
    });

    it('skal starte redigeringsmodus når en trykker på knapp Start redigering og fjerne valg når en trykker Stopp redigering', async () => {
        render(<MorSøkerMedSamtidigUttakFarUtsettelseFarOgGradering />);

        expect(await screen.findByText(messages['UttaksplanKalender.StartRedigering'])).toBeInTheDocument();

        expect(screen.queryByText(messages['RedigeringKalenderIndex.VelgDatoerIKalender'])).not.toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['UttaksplanKalender.StartRedigering']));

        expect(await screen.findAllByText(messages['RedigeringKalenderIndex.VelgDatoerIKalender'])).toHaveLength(2);

        const mars = screen.getByTestId('year:2024;month:2');

        await userEvent.click(within(mars).getByTestId('day:14;dayColor:BLUE'));

        expect(await within(mars).findByTestId('day:14;dayColor:DARKBLUE')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['UttaksplanKalender.StopRedigering']));

        expect(await within(mars).findByTestId('day:14;dayColor:BLUE')).toBeInTheDocument();
    });

    it('skal spørre om flerbarnsdager', async () => {
        render(<FlerbarnMorOgFar />);

        expect(await screen.findByText(messages['UttaksplanKalender.StartRedigering'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['UttaksplanKalender.StartRedigering']));

        const juni = screen.getByTestId('year:2026;month:5');

        await userEvent.click(within(juni).getByTestId('day:8;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[1]!);

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager'])).not.toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Far']));

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager'])).toBeInTheDocument();
    });

    it('skal ikke spørre om aktivitetskrav for far dersom flerbarnsdager er valgt', async () => {
        render(<FlerbarnMorOgFar />);

        expect(await screen.findByText(messages['UttaksplanKalender.StartRedigering'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['UttaksplanKalender.StartRedigering']));

        const juni = screen.getByTestId('year:2026;month:5');

        await userEvent.click(within(juni).getByTestId('day:8;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[1]!);

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager'])).not.toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Far']));

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.queryByText('Far skal ha?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[1]!);

        expect(screen.queryByText(messages['AktivitetskravSpørsmål.Label'])).not.toBeInTheDocument();
    });

    it('skal tillate 200 % samtidig uttak', async () => {
        render(<FlerbarnMorOgFar />);

        expect(await screen.findByText(messages['UttaksplanKalender.StartRedigering'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['UttaksplanKalender.StartRedigering']));

        const juni = screen.getByTestId('year:2026;month:5');

        await userEvent.click(within(juni).getByTestId('day:8;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[1]!);

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[1]!);

        expect(screen.queryByText('Far skal ha?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[2]!);

        expect(screen.queryByText(messages['AktivitetskravSpørsmål.Label'])).not.toBeInTheDocument();

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor'])).toBeInTheDocument();
        expect(screen.queryByText('Hvor mange prosent til far?')).toBeInTheDocument();

        const arbeidsprosentMor = screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(arbeidsprosentMor, '100');

        const arbeidsprosentFar = screen.getByText('Hvor mange prosent til far?');
        await userEvent.type(arbeidsprosentFar, '100');

        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        expect(screen.queryByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[2]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(await within(juni).findByTestId('day:8;dayColor:LIGHTGREENBLUE')).toBeInTheDocument();
    });

    it('skal ikke tillate mindre enn 100 % samtidig uttak dersom man bruker flerbarnsdager', async () => {
        render(<FlerbarnMorOgFar />);

        expect(await screen.findByText(messages['UttaksplanKalender.StartRedigering'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['UttaksplanKalender.StartRedigering']));

        const juni = screen.getByTestId('year:2026;month:5');

        await userEvent.click(within(juni).getByTestId('day:8;dayColor:BLUE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[1]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.ØnskerFlerbarnsdager'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[1]!);

        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[2]!);

        expect(screen.queryByText(messages['AktivitetskravSpørsmål.Label'])).not.toBeInTheDocument();

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor'])).toBeInTheDocument();
        expect(screen.getByText('Hvor mange prosent til far?')).toBeInTheDocument();

        const arbeidsprosentMor = screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']);
        await userEvent.type(arbeidsprosentMor, '45');

        const arbeidsprosentFar = screen.getByText('Hvor mange prosent til far?');
        await userEvent.type(arbeidsprosentFar, '45');

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        expect(screen.getByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[1]!);
        await userEvent.click(screen.getAllByText(messages['LeggTilEllerEndrePeriodeForm.Nei'])[2]!);

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(
            screen.getByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttakValidering.KanIkkeHaMindreEnn100ProsentFlerbarnsdager'],
            ),
        ).toBeInTheDocument();
    });

    it('skal ikke vise avslåtte perioder som overlapper med andre perioder', async () => {
        render(<SkalIkkeViseAvslåttePerioderSomOverlapperMedAndrePerioder />);

        const desember = screen.getByTestId('year:2025;month:11');
        const januar = screen.getByTestId('year:2026;month:0');

        expect(within(desember).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(23);
        expect(within(januar).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(22);

        await userEvent.click(within(desember).getByTestId('day:1;dayColor:GREEN'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getAllByText(messages['RedigeringPanel.Far'])).toHaveLength(2);
        expect(screen.getByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE'])).toBeInTheDocument();
    });

    it('skal vise pause og legge til ny pause', async () => {
        render(<KunFarHarRettOgHarPauseperiode />);

        expect(screen.getByText('Du har satt uttaket på pause')).toBeInTheDocument();

        const mai = screen.getByTestId('year:2024;month:4');

        expect(within(mai).getAllByTestId('dayColor:BEIGEOUTLINE', { exact: false })).toHaveLength(3);

        await userEvent.click(within(mai).getByTestId('day:24;dayColor:BEIGEOUTLINE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getByText(messages['RedigeringPanel.Far'])).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.valgPanel.leggTilPause'])).toBeInTheDocument();

        await userEvent.click(within(mai).getByTestId('day:24;dayColor:DARKBLUE'));
        await userEvent.click(within(mai).getByTestId('day:30;dayColor:BLACK'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        await userEvent.click(screen.getByText(messages['RedigeringPanel.LeggTilPause']));

        expect(screen.getByText(messages['LeggTilPauseForm.Heading'])).toBeInTheDocument();

        const aktivitetskravSelect = screen.getByLabelText(messages['LeggTilPauseForm.VelgMorsAktivitet']);
        await userEvent.selectOptions(aktivitetskravSelect, 'ARBEID');

        await userEvent.click(screen.getByText(messages['LeggTilPeriodePanel.LeggTil']));

        expect(within(mai).getAllByTestId('dayColor:BEIGEOUTLINE', { exact: false })).toHaveLength(4);
    });

    it('skal skjule forelder-spørsmålet og sette verdien bak panseret når kun far har rett', async () => {
        render(<KunFarHarRettOgHarPauseperiode />);

        const juni = screen.getByTestId('year:2024;month:5');

        await userEvent.click(within(juni).getByText('17', { exact: true }));
        await userEvent.click(within(juni).getByText('20', { exact: true }));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);
        await userEvent.click(screen.getAllByText(messages['LeggTilPeriodePanel.LeggTil'])[0]!);

        // Når kun far har rett til foreldrepenger, skal spørsmålet om hvem som
        // skal ha foreldrepenger ikke vises. Verdien settes bak panseret, og vi
        // går rett til kvotetype-spørsmålet "Far skal ha?".
        expect(screen.getByText('Far skal ha?')).toBeInTheDocument();
        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).not.toBeInTheDocument();
    });

    it('skal vise avslåtte periode korrekt og så markere som hull når en sletter', async () => {
        render(<SkalViseAvslåttPeriodeKorrekt />);

        const juli = screen.getByTestId('year:2026;month:6');

        expect(within(juli).getAllByTestId('dayColor:BLACKOUTLINE', { exact: false })).toHaveLength(13);

        await userEvent.click(within(juli).getByTestId('day:14;dayColor:BLACKOUTLINE'));

        await userEvent.click(screen.getAllByText(messages['RedigeringPanel.EndreTil'])[3]!);

        expect(screen.getByText(messages['kalender.avslag'])).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: messages['RedigeringPanel.SlettPeriode'] }));

        expect(within(juli).getByTestId('day:14;dayColor:BLACK')).toBeInTheDocument();
    });

    it('skal ikke markere avslåtte perioder med varsel om mors aktivitet', () => {
        render(<SkalIkkeMarkereAvslåttePerioderMedVarselOmMorsAktivitet />);

        const juni = screen.getByTestId('year:2024;month:5');

        expect(within(juni).getByTestId('day:3;dayColor:BLACKOUTLINE')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:14;dayColor:DARKGRAY')).toBeInTheDocument();

        expect(
            screen.queryByText(messages['UttaksplanKalender.MarkertePerioder']),
        ).not.toBeInTheDocument();
    });
});
