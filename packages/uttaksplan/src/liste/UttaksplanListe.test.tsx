import { composeStories } from '@storybook/react-vite';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './UttaksplanListe.stories';

import messages from '../intl/messages/nb_NO.json';

const {
    Default,
    MorOgMedmor,
    FarSøkerEtterAtMorHarSøkt,
    MorOgFarMedFerieopphold,
    HullperiodeOverFamiliehendelsesdato,
    VisPerioderMedOppholdsårsakKorrekt,
    MorSøkerOgFarHarEøsPeriode,
    MarkeringNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt,
    MarkeringNårGraderingsaktivitetMangler,
    HarUtsettelse,
    KunFarHarRettOgHarPauseperiode,
    EøsPerioderForAnnenPart,
} = composeStories(stories);

describe('UttaksplanListe', () => {
    it('skal legge til ny periode - ferie', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('18. april 25 - 08. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['uttaksplan.leggTilPeriode']));

        expect(await screen.findByText(messages['uttaksplan.tidsperiodeSpørsmål.heading'])).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.valgPanel.leggTilFerie']));

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-06-27',
                flerbarnsdager: false,
            },
            {
                fom: '2025-06-30',
                tom: '2025-08-28',
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
            },
            {
                fom: '2025-08-29',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-12-11',
                flerbarnsdager: false,
            },
            {
                fom: '2025-12-12',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2026-03-26',
                flerbarnsdager: false,
            },
        ]);
    });

    it('skal legge til ny periode - Periode med foreldrepenger', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('18. april 25 - 08. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25')).toBeInTheDocument();
        expect(screen.getByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['uttaksplan.leggTilPeriode']));
        expect(await screen.findByText(messages['uttaksplan.tidsperiodeSpørsmål.heading'])).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.valgPanel.leggTilPeriode']));

        expect(await screen.findByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['RedigeringPanel.Begge']));

        expect(await screen.findByText(messages['LeggTilEllerEndrePeriodeForm.KvoteTypeMor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])[1]!);

        expect(await screen.findByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE'])[0]!);

        expect(await screen.findByText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor'])).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.SamtidigUttaksprosentMor']), '50');

        expect(await screen.findByText('Hvor mange prosent til far?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent til far?'), '50');

        expect(await screen.findByText(messages['LeggTilEllerEndrePeriodeForm.SkalKombinere.Mor'])).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(await screen.findByText(messages['LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor'])).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText(messages['LeggTilEllerEndrePeriodeForm.Stillingsprosent.Mor']), '50');

        expect(await screen.findByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(await screen.findByText('Hvor mange prosent skal far jobbe?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent skal far jobbe?'), '50');

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-06-27',
                flerbarnsdager: false,
            },
            {
                fom: '2025-06-30',
                forelder: 'MOR',
                gradering: {
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                    },
                    arbeidstidprosent: 50,
                },
                kontoType: 'FELLESPERIODE',
                samtidigUttak: 50,
                tom: '2025-08-28',
                flerbarnsdager: false,
            },
            {
                fom: '2025-06-30',
                forelder: 'FAR_MEDMOR',
                gradering: {
                    aktivitet: {
                        type: 'ANNET',
                    },
                    arbeidstidprosent: 50,
                },
                kontoType: 'FEDREKVOTE',
                morsAktivitet: undefined,
                samtidigUttak: 50,
                tom: '2025-08-28',
                flerbarnsdager: false,
            },
            {
                fom: '2025-08-29',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-12-11',
                flerbarnsdager: false,
            },
            {
                fom: '2025-12-12',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2026-03-26',
                flerbarnsdager: false,
            },
        ]);
    });

    it('Skal endre periode til ferie', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('12. des. 25 - 26. mars 26')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[2]!);

        expect(await screen.findByText(messages['endrePeriodePanel.tittel'])).toBeInTheDocument();
        expect(screen.getByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['uttaksplan.valgPanel.leggTilFerie.endre']));

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-08-21',
                flerbarnsdager: false,
            },
            {
                fom: '2025-08-22',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-12-11',
                flerbarnsdager: false,
            },
            {
                fom: '2025-12-12',
                forelder: 'MOR',
                tom: '2026-03-26',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
                flerbarnsdager: false,
            },
        ]);
    });

    it('Skal endre datoer for ferieperiode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<MorOgFarMedFerieopphold oppdaterUttaksplan={oppdaterUttaksplan} />);
        expect(await screen.findByText('12. des. 25 - 15. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. 25 - 15. des. 25'));
        const datoElement = screen.getByText('12. des. 25 - 15. des. 25');
        const periodeContainer = datoElement.closest('.aksel-stack') as HTMLElement;
        const endreKnapp = within(periodeContainer).getByRole('button', { name: /endre/i });

        await userEvent.click(endreKnapp);
        expect(await screen.findByText(messages['endrePeriodePanel.tittel'])).toBeInTheDocument();

        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2025-12-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.clear(tilOgMedDato);
        await userEvent.type(tilOgMedDato, dayjs('2025-12-17').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(screen.getByText(messages['RedigeringPanel.HvaSkalSkje'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['RedigeringPanel.EndrePlanen']));

        await userEvent.click(screen.getByText(messages['RedigeringPanel.Fortsett']));

        expect(await screen.findByText('15. des. 25 - 17. des. 25')).toBeInTheDocument();
        expect(screen.queryByText('12. des. 25 - 15. des. 25')).not.toBeInTheDocument();
    });

    it('Skal slette periode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('09. mai 25 - 11. des. 25'));

        await userEvent.click(screen.getAllByText(messages['uttaksplan.slett'])[1]!);

        await userEvent.click(screen.getByText('09.05.2025 - 21.08.2025 - Olga Utviklers kvote'));

        await userEvent.click(screen.getByText(messages['uttaksplan.slettValgte']));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-12',
                tom: '2026-03-26',
                flerbarnsdager: false,
            },
        ]);
    });

    it('Skal vise "Fars kvote" når det er morOgFar', async () => {
        const oppdaterUttaksplan = vi.fn();
        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();
        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));
        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[2]!);

        expect(screen.getByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE'])).toBeInTheDocument();
        expect(screen.queryByText(messages['uttaksplan.stønadskvotetype.MEDMORSKVOTE'])).not.toBeInTheDocument();
    });

    it('Skal vise "Medmors kvote" når det er morOgmor', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<MorOgMedmor oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();
        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));
        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[2]!);

        expect(screen.getByText(messages['uttaksplan.stønadskvotetype.MEDMORSKVOTE'])).toBeInTheDocument();
        expect(screen.queryByText(messages['uttaksplan.stønadskvotetype.FEDREKVOTE'])).not.toBeInTheDocument();
    });

    it('Skal vise periode uten foreldrepenger og to perioder for tapte dager', async () => {
        render(<HullperiodeOverFamiliehendelsesdato />);

        expect(await screen.findByText('14. mars 24 - 01. april 24')).toBeInTheDocument();

        const førsteRad = within(screen.getByTestId('2024-03-14 - 2024-04-01'));
        expect(førsteRad.getByText('14. mars 24 - 01. april 24')).toBeInTheDocument();
        expect(førsteRad.getByText('2 uker og 3 dager')).toBeInTheDocument();
        expect(førsteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const andreRad = within(screen.getByTestId('2024-04-02 - 2024-04-03'));
        expect(andreRad.getByText('02. april 24 - 03. april 24')).toBeInTheDocument();
        expect(andreRad.getByText('2 dager')).toBeInTheDocument();
        expect(andreRad.getAllByText(messages['uttaksplan.periodeListeHeader.fri'])).toHaveLength(2);

        const tredjeRad = within(screen.getByTestId('2024-04-04 - 2024-04-04'));
        expect(tredjeRad.getByText('04. april 24')).toBeInTheDocument();
        expect(tredjeRad.getAllByText(messages['uttaksplan.periodeListeHeader.fødsel'])).toHaveLength(2);

        const fjerdeRad = within(screen.getByTestId('2024-04-04 - 2024-05-02'));
        expect(fjerdeRad.getByText('04. april 24 - 02. mai 24')).toBeInTheDocument();
        expect(fjerdeRad.getByText('4 uker og 1 dag')).toBeInTheDocument();
        expect(fjerdeRad.getAllByText(messages['uttaksplan.periodeListeHeader.dagerDuKanTape'])).toHaveLength(2);

        const femteRad = within(screen.getByTestId('2024-05-03 - 2024-05-15'));
        expect(femteRad.getByText('03. mai 24 - 15. mai 24')).toBeInTheDocument();
        expect(femteRad.getByText('1 uke og 4 dager')).toBeInTheDocument();
        expect(femteRad.getAllByText('Hans har foreldrepenger')).toHaveLength(2);
    });

    it('Skal vise perioder med oppholdsårsak korrekt', async () => {
        render(<VisPerioderMedOppholdsårsakKorrekt />);

        expect(await screen.findByText('18. nov. 24 - 08. des. 24')).toBeInTheDocument();

        const førsteRad = within(screen.getByTestId('2024-11-18 - 2024-12-08'));
        expect(førsteRad.getByText('18. nov. 24 - 08. des. 24')).toBeInTheDocument();
        expect(førsteRad.getByText('3 uker')).toBeInTheDocument();
        expect(førsteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const andreRad = within(screen.getByTestId('2024-12-09 - 2024-12-09'));
        expect(andreRad.getByText('09. des. 24')).toBeInTheDocument();
        expect(andreRad.getAllByText(messages['uttaksplan.periodeListeHeader.fødsel'])).toHaveLength(2);

        const fjerdeRad = within(screen.getByTestId('2024-12-09 - 2025-05-16'));
        expect(fjerdeRad.getByText('09. des. 24 - 16. mai 25')).toBeInTheDocument();
        expect(fjerdeRad.getByText('23 uker')).toBeInTheDocument();
        expect(fjerdeRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const femteRad = within(screen.getByTestId('2025-05-19 - 2025-09-29'));
        expect(femteRad.getByText('19. mai 25 - 29. sep. 25')).toBeInTheDocument();
        expect(femteRad.getByText('19 uker og 1 dag')).toBeInTheDocument();
        expect(femteRad.getAllByText('Hans har foreldrepenger')).toHaveLength(2);

        const sjetteRad = within(screen.getByTestId('2025-09-30 - 2025-10-15'));
        expect(sjetteRad.getByText('30. sep. 25 - 15. okt. 25')).toBeInTheDocument();
        expect(sjetteRad.getByText('2 uker og 2 dager')).toBeInTheDocument();
        expect(sjetteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        expect(screen.queryByText('Uten Foreldrepenger')).not.toBeInTheDocument();
        expect(screen.queryByText(messages['uttaksplan.periodeListeHeader.dagerDuKanTape'])).not.toBeInTheDocument();
    });

    it('Skal ikke kunne redigere en EØS-periode', async () => {
        render(<MorSøkerOgFarHarEøsPeriode />);

        expect(await screen.findByText('03. juli 24 - 15. juli 24')).toBeInTheDocument();

        const eøsRad = within(screen.getByTestId('2024-07-03 - 2024-07-15'));
        expect(eøsRad.getByText('03. juli 24 - 15. juli 24')).toBeInTheDocument();
        expect(eøsRad.getByText('1 uke og 4 dager')).toBeInTheDocument();
        expect(eøsRad.getAllByText('Hans har foreldrepenger (EU/EØS)')).toHaveLength(2);

        const ekspandertEøsRad = within(
            screen.getByText(messages['uttaksplan.periodeListeContent.eøs']),
        );
        expect(
            ekspandertEøsRad.getByText(messages['uttaksplan.periodeListeContent.eøs']),
        ).toBeInTheDocument();
        expect(ekspandertEøsRad.queryByText(messages['uttaksplan.endre'])).not.toBeInTheDocument();
        expect(ekspandertEøsRad.queryByText(messages['uttaksplan.slett'])).not.toBeInTheDocument();
    });

    it('Skal få advarsel om at en må velge mors aktivitet', async () => {
        render(<MarkeringNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt />);

        expect(await screen.findByText(messages['UttaksplanListe.ManglerMorsAktivitet'])).toBeInTheDocument();

        expect(screen.getAllByText(messages['PeriodeListeHeader.MorsAktivitetIkkeValgt'])).toHaveLength(3);

        await userEvent.click(screen.getAllByText(messages['PeriodeListeHeader.MorsAktivitetIkkeValgt'])[0]!);

        const alleEndringsknapper = screen.getAllByText(messages['uttaksplan.endre']);
        await userEvent.click(alleEndringsknapper.at(-1)!);

        expect(await screen.findByText(messages['LeggTilEllerEndrePeriodeFellesForm.HarPeriodeDerMorsAktivitetIkkeErValgt'])).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText(messages['AktivitetskravSpørsmål.Label']), 'ARBEID');

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(screen.getByText(messages['uttaksplan.periodeListeContent.morsAktivitet.Arbeid'])).toBeInTheDocument();

        expect(screen.queryByText(messages['UttaksplanListe.ManglerMorsAktivitet'])).not.toBeInTheDocument();
    });

    it('Skal få advarsel om at gradering manglar arbeidsgiver når plan kjem frå planleggar', async () => {
        render(<MarkeringNårGraderingsaktivitetMangler />);

        expect(
            await screen.findByText(messages['UttaksplanListe.ManglerGraderingsaktivitet']),
        ).toBeInTheDocument();

        expect(
            screen.getAllByText(messages['PeriodeListeHeader.GraderingsaktivitetIkkeValgt']).length,
        ).toBeGreaterThanOrEqual(1);
    });

    it('Skal kunne slette og endre alle perioder bortsett fra periodene til annen part', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);
        expect(await screen.findAllByText('Hanne har foreldrepenger')).toHaveLength(6);
        expect(screen.getAllByText(messages['uttaksplan.endre'])).toHaveLength(2);
        expect(screen.queryByText(messages['uttaksplan.slett'])).not.toBeInTheDocument();
    });

    it('Mors fellesperiode skal vises som "Fellesperiode" i fars listevisning, ikke "med aktivitetskrav"', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        // Mor har tre fellesperioder. Når far ser oversikten sin skal disse vises
        // som "Fellesperiode", ikke "Foreldrepenger med aktivitetskrav" (som er
        // forbeholdt bare-far-har-rett-perioder med kontoType FORELDREPENGER).
        expect(await screen.findAllByText(messages['uttaksplan.stønadskvotetype.FELLESPERIODE'])).toHaveLength(3);
        expect(screen.queryByText(messages['uttaksplan.stønadskvotetype.AKTIVITETSKRAV_KVOTE_BFHR'])).not.toBeInTheDocument();
    });

    it('Skal ikke kunne legge til annen part som forelder når en legger til ny periode', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        expect(await screen.findByText('14. mars 24 - 03. april 24')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['uttaksplan.leggTilPeriode']));

        expect(await screen.findByText(messages['uttaksplan.tidsperiodeSpørsmål.heading'])).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.valgPanel.leggTilPeriode']));

        expect(screen.getByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).toBeInTheDocument();
        expect(screen.queryByText(messages['RedigeringPanel.Mor'])).not.toBeInTheDocument();
        expect(screen.getByText(messages['RedigeringPanel.Far'])).toBeInTheDocument();
        expect(screen.getByText(messages['RedigeringPanel.Begge'])).toBeInTheDocument();
    });

    it('Skal slette periode direkte uten å spørre om forskyvning', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. mai 25 - 11. des. 25')).toBeInTheDocument();

        await userEvent.click(screen.getByText('09. mai 25 - 11. des. 25'));

        await userEvent.click(screen.getAllByText(messages['uttaksplan.slett'])[1]!);

        await userEvent.click(screen.getByText('22.08.2025 - 11.12.2025 - Fellesperiode'));

        await userEvent.click(screen.getByText(messages['uttaksplan.slettValgte']));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-08-21',
                flerbarnsdager: false,
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-12',
                tom: '2026-03-26',
                flerbarnsdager: false,
            },
        ]);
    });

    it('Skal slette periode direkte og ikke spørre om forskyvning når en sletter siste periode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('12. des. 25 - 26. mars 26')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. des. 25 - 26. mars 26'));

        await userEvent.click(screen.getAllByText(messages['uttaksplan.slett'])[2]!);

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
                flerbarnsdager: false,
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-08-21',
                flerbarnsdager: false,
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
                flerbarnsdager: false,
            },
        ]);
    });

    it('Skal kun vise utsettelse-valget når valgt tidsrom er innenfor 6-ukersperioden', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<HarUtsettelse oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('15. aug. 25 - 25. aug. 25')).toBeInTheDocument();
        expect(screen.getAllByText(messages['uttaksplan.periodeListeHeader.instutisjonBarn'])).toHaveLength(2);

        await userEvent.click(screen.getByText('15. aug. 25 - 25. aug. 25'));

        expect(screen.getByText(messages['uttaksplan.utsettelsesårsak.BARN_INNLAGT'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[1]!);

        expect(screen.getByText(messages['LeggTilUtsettelsePanel.VelgÅrsak'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['uttaksplan.avbryt']));

        await userEvent.click(screen.getByText(messages['uttaksplan.leggTilPeriode']));

        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.type(fraOgMedDato, dayjs('2025-10-26').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.type(tilOgMedDato, dayjs('2025-10-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        // Tidsrom utenfor 6-ukersperioden: «Utsettelse» skal ikke være et valg
        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: messages['uttaksplan.valgPanel.leggTilUtsettelse'] })).not.toBeInTheDocument();

        // Endre til et tidsrom innenfor 6-ukersperioden → «Utsettelse» dukker opp
        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2025-08-26').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.clear(tilOgMedDato);
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(await screen.findByRole('radio', { name: messages['uttaksplan.valgPanel.leggTilUtsettelse'] }));

        await userEvent.selectOptions(screen.getByLabelText(messages['LeggTilUtsettelsePanel.VelgÅrsak']), 'SØKER_SYKDOM');

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-08-15',
                tom: '2025-08-25',
                forelder: 'MOR',
                utsettelseÅrsak: 'BARN_INNLAGT',
                flerbarnsdager: false,
            },
            {
                fom: '2025-08-26',
                tom: '2025-08-28',
                forelder: 'MOR',
                utsettelseÅrsak: 'SØKER_SYKDOM',
                flerbarnsdager: false,
            },
        ]);
    });

    it('Skal ha periode med pause og legge til ny periode med pause', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<KunFarHarRettOgHarPauseperiode oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('24. mai 24 - 28. mai 24')).toBeInTheDocument();
        expect(screen.getAllByText(messages['uttaksplan.periodeListeHeader.pause'])).toHaveLength(2);

        await userEvent.click(screen.getByText('24. mai 24 - 28. mai 24'));

        expect(screen.getByText(messages['uttaksplan.periodeListeContent.morsAktivitet.ArbeidOgUtdanning'])).toBeInTheDocument();

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[3]!);

        expect(screen.getByText(messages['LeggTilPauseForm.VelgMorsAktivitet'])).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['uttaksplan.avbryt']));

        await userEvent.click(screen.getByText(messages['uttaksplan.leggTilPeriode']));

        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.type(fraOgMedDato, dayjs('2024-04-29').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.type(tilOgMedDato, dayjs('2024-05-30').format('DD.MM.YYYY'));
        await userEvent.tab();

        // Tidsrom før utløpet av 6-ukersperioden: «Pause» skal ikke være et valg
        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: messages['uttaksplan.valgPanel.leggTilPause'] })).not.toBeInTheDocument();

        // Endre fra-dato til etter 6-ukersperioden → «Pause» dukker opp
        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2024-05-29').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(await screen.findByRole('radio', { name: messages['uttaksplan.valgPanel.leggTilPause'] }));

        await userEvent.selectOptions(screen.getByLabelText(messages['LeggTilPauseForm.VelgMorsAktivitet']), 'ARBEID');

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                flerbarnsdager: false,
                fom: '2024-05-17',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2024-05-23',
            },
            {
                flerbarnsdager: false,
                fom: '2024-05-24',
                forelder: 'FAR_MEDMOR',
                morsAktivitet: 'ARBEID_OG_UTDANNING',
                tom: '2024-05-28',
                utsettelseÅrsak: 'FRI',
            },
            {
                flerbarnsdager: false,
                fom: '2024-05-29',
                forelder: 'FAR_MEDMOR',
                morsAktivitet: 'ARBEID',
                tom: '2024-05-30',
                utsettelseÅrsak: 'FRI',
            },
            {
                flerbarnsdager: false,
                fom: '2024-05-31',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2024-06-13',
            },
        ]);
    });

    it('skal skjule forelder-spørsmålet og sette verdien bak panseret når kun far har rett', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<KunFarHarRettOgHarPauseperiode oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('24. mai 24 - 28. mai 24')).toBeInTheDocument();

        await userEvent.click(screen.getByText(messages['uttaksplan.leggTilPeriode']));

        expect(await screen.findByText(messages['uttaksplan.tidsperiodeSpørsmål.heading'])).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.type(fraOgMedDato, dayjs('2024-06-14').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.type(tilOgMedDato, dayjs('2024-06-20').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.valgPanel.leggTilPeriode']));

        // Når kun far har rett til foreldrepenger, skal spørsmålet om hvem som
        // skal ha foreldrepenger ikke vises. Verdien settes bak panseret, og vi
        // går rett til kvotetype-spørsmålet "Far skal ha?".
        expect(await screen.findByText('Far skal ha?')).toBeInTheDocument();
        expect(screen.queryByText(messages['LeggTilEllerEndrePeriodeForm.Forelder.HvemGjelder'])).not.toBeInTheDocument();
    });

    it('Skal ikke kunne legge til ferieperiode etter 6-ukerperioden for kun far har rett', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<KunFarHarRettOgHarPauseperiode oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('16. mai 24 - 16. mai 24')).toBeInTheDocument();

        await userEvent.click(screen.getByText('16. mai 24 - 16. mai 24'));

        await userEvent.click(screen.getAllByText(messages['uttaksplan.endre'])[3]!);

        // Tidsrommet ligger etter 6-ukersperioden for kun-far-har-rett → «Ferie» er ikke et gyldig valg
        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        expect(screen.queryByRole('radio', { name: messages['uttaksplan.valgPanel.leggTilFerie.endre'] })).not.toBeInTheDocument();
    });

    it('Skal ikke kunne endre EØS-perioder', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<EøsPerioderForAnnenPart oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findAllByText('Hanne har foreldrepenger (EU/EØS)')).toHaveLength(4);

        await userEvent.click(screen.getByText(messages['uttaksplan.leggTilPeriode']));

        const fraOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.fom']);
        await userEvent.type(fraOgMedDato, dayjs('2025-10-08').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText(messages['TidsperiodeSpørsmål.tom']);
        await userEvent.type(tilOgMedDato, dayjs('2025-10-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText(messages['uttaksplan.valgPanel.label'])).toBeInTheDocument();
        await userEvent.click(screen.getByText(messages['uttaksplan.valgPanel.leggTilFerie']));

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        expect(screen.getByText(messages['uttaksplan.overskriderEøs'])).toBeInTheDocument();

        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2025-10-09').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText(messages['uttaksplan.ferdig']));

        // Annen parts EØS-perioder ligger låst senere i planen, så «Endre uten å
        // flytte resten av planen» er eneste valg. Da skal spørsmålet ikke vises,
        // og ferien legges til direkte uten å flytte resten av planen.
        expect(screen.queryByText(messages['RedigeringPanel.HvaSkalSkje'])).not.toBeInTheDocument();

        await waitFor(() => expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1));
    });

    it('Bare far har rett - avslåtte perioder skal ikke vise "med aktivitetskrav" i listevisningen', async () => {
        const { BareFarHarRettMedAvslåttePerioder } = composeStories(stories);
        render(<BareFarHarRettMedAvslåttePerioder />);

        // Avslåtte perioder vert no skilde ut i eiga rad, så me får 3 rader:
        // - Rad 1 (09. mars - 15. mai): innvilget, morsAktivitet=IKKE_OPPGITT → "Foreldrepenger uten aktivitetskrav"
        // - Rad 2 (18. mai - 12. juni): avslått, morsAktivitet=ARBEID → skal vise "Trekte dager" (ikkje "med aktivitetskrav")
        // - Rad 3 (15. juni - 10. juli): innvilget, morsAktivitet=ARBEID → "Foreldrepenger med aktivitetskrav"
        await userEvent.click(screen.getByTestId('2026-03-09 - 2026-05-15'));
        await userEvent.click(screen.getByTestId('2026-05-18 - 2026-06-12'));
        await userEvent.click(screen.getByTestId('2026-06-15 - 2026-07-10'));

        // Innvilget med IKKE_OPPGITT skal vise "uten aktivitetskrav"
        expect(screen.getByText(messages['uttaksplan.stønadskvotetype.AKTIVITETSFRI_KVOTE'])).toBeInTheDocument();

        // Innvilget med ARBEID skal vise "med aktivitetskrav" (bare 1 gang – avslått periode skal ikke ha det)
        expect(screen.getAllByText(messages['uttaksplan.stønadskvotetype.AKTIVITETSKRAV_KVOTE_BFHR'])).toHaveLength(1);

        // Avslått periode skal ikke vise "Foreldrepenger" som tekst i innhaldet
        expect(screen.queryByText(/^Foreldrepenger$/)).not.toBeInTheDocument();
    });
});
