import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './UttaksplanListe.stories';

const {
    Default,
    MorOgMedmor,
    FarSøkerEtterAtMorHarSøkt,
    MorOgFarMedFerieopphold,
    HullperiodeOverFamiliehendelsesdato,
    VisPerioderMedOppholdsårsakKorrekt,
    MorSøkerOgFarHarEøsPeriode,
    MarkeringNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt,
} = composeStories(stories);

describe('UttaksplanListe', () => {
    it('skal legge til ny periode - ferie', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('18. Apr - 08. May')).toBeInTheDocument();
        expect(screen.getByText('09. May')).toBeInTheDocument();
        expect(screen.getByText('09. May - 11. Dec')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til ferie'));

        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2025-05-08',
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-06-27',
            },
            {
                fom: '2025-06-30',
                tom: '2025-08-28',
                forelder: 'MOR',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            },
            {
                fom: '2025-08-29',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-12-11',
            },
            {
                fom: '2025-12-12',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2026-03-26',
            },
        ]);
    });

    it('skal legge til ny periode - Periode med foreldrepenger', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('18. Apr - 08. May')).toBeInTheDocument();
        expect(screen.getByText('09. May')).toBeInTheDocument();
        expect(screen.getByText('09. May - 11. Dec')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));
        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til periode med foreldrepenger'));

        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Begge'));

        expect(await screen.findByText('Mor skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Fellesperiode')[1]!);

        expect(await screen.findByText('Far skal ha?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Fars kvote')[0]!);

        expect(await screen.findByText('Hvor mange prosent for mor?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent for mor?'), '50');

        expect(await screen.findByText('Hvor mange prosent for far?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent for far?'), '50');

        expect(await screen.findByText('Skal mor kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(await screen.findByText('Hvor mange prosent skal mor jobbe?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent skal mor jobbe?'), '50');

        expect(await screen.findByText('Skal far kombinere foreldrepenger med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(await screen.findByText('Hvor mange prosent skal far jobbe?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent skal far jobbe?'), '50');

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2025-05-08',
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-06-27',
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
            },
            {
                fom: '2025-06-30',
                forelder: 'FAR_MEDMOR',
                gradering: {
                    aktivitet: {
                        type: 'ORDINÆRT_ARBEID',
                    },
                    arbeidstidprosent: 50,
                },
                kontoType: 'FEDREKVOTE',
                morsAktivitet: undefined,
                samtidigUttak: 50,
                tom: '2025-08-28',
            },
            {
                fom: '2025-08-29',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-12-11',
            },
            {
                fom: '2025-12-12',
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                tom: '2026-03-26',
            },
        ]);
    });

    it('Skal endre periode til ferie', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('12. Dec - 26. Mar')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. Dec - 26. Mar'));

        await userEvent.click(screen.getAllByText('Endre')[2]!);

        expect(await screen.findByText('Endre periode')).toBeInTheDocument();
        expect(screen.getByText('Hva vil du gjøre?')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Ferie'));

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                fom: '2025-04-18',
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                tom: '2025-05-08',
            },
            {
                fom: '2025-05-09',
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                tom: '2025-08-21',
            },
            {
                fom: '2025-08-22',
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                tom: '2025-12-11',
            },
            {
                fom: '2025-12-12',
                forelder: 'MOR',
                tom: '2026-03-26',
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            },
        ]);
    });

    it('Skal endre datoer for ferieperiode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<MorOgFarMedFerieopphold oppdaterUttaksplan={oppdaterUttaksplan} />);
        expect(await screen.findByText('12. Dec - 15. Dec')).toBeInTheDocument();

        await userEvent.click(screen.getByText('12. Dec - 15. Dec'));
        const datoElement = screen.getByText('12. Dec - 15. Dec');
        const periodeContainer = datoElement.closest('.aksel-stack') as HTMLElement;
        const endreKnapp = within(periodeContainer).getByRole('button', { name: /endre/i });

        await userEvent.click(endreKnapp);
        expect(await screen.findByText('Endre periode')).toBeInTheDocument();

        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.clear(fraOgMedDato);
        await userEvent.type(fraOgMedDato, dayjs('2025-12-15').format('DD.MM.YYYY'));
        await userEvent.tab();

        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.clear(tilOgMedDato);
        await userEvent.type(tilOgMedDato, dayjs('2025-12-17').format('DD.MM.YYYY'));
        await userEvent.tab();

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));
        expect(await screen.findByText('15. Dec - 17. Dec')).toBeInTheDocument();
        expect(screen.queryByText('12. Dec - 15. Dec')).not.toBeInTheDocument();
    });

    it('Skal slette periode', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. May - 11. Dec')).toBeInTheDocument();

        await userEvent.click(screen.getByText('09. May - 11. Dec'));

        await userEvent.click(screen.getAllByText('Slett')[1]!);

        await userEvent.click(screen.getByText('09.05.2025 - 21.08.2025 - Olga Utviklers kvote'));

        await userEvent.click(screen.getByText('Slett valgte perioder'));

        expect(oppdaterUttaksplan).toHaveBeenCalledTimes(1);
        expect(oppdaterUttaksplan).toHaveBeenNthCalledWith(1, [
            {
                forelder: 'MOR',
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                fom: '2025-04-18',
                tom: '2025-05-08',
            },
            {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                fom: '2025-08-22',
                tom: '2025-12-11',
            },
            {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FEDREKVOTE',
                fom: '2025-12-12',
                tom: '2026-03-26',
            },
        ]);
    });

    it('Skal vise "Fars kvote" når det er morOgFar', async () => {
        const oppdaterUttaksplan = vi.fn();
        render(<Default oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. May - 11. Dec')).toBeInTheDocument();
        await userEvent.click(screen.getByText('12. Dec - 26. Mar'));
        await userEvent.click(screen.getAllByText('Endre')[2]!);

        expect(screen.getByText('Fars kvote')).toBeInTheDocument();
        expect(screen.queryByText('Medmors kvote')).not.toBeInTheDocument();
    });

    it('Skal vise "Medmors kvote" når det er morOgmor', async () => {
        const oppdaterUttaksplan = vi.fn();

        render(<MorOgMedmor oppdaterUttaksplan={oppdaterUttaksplan} />);

        expect(await screen.findByText('09. May - 11. Dec')).toBeInTheDocument();
        await userEvent.click(screen.getByText('12. Dec - 26. Mar'));
        await userEvent.click(screen.getAllByText('Endre')[2]!);

        expect(screen.getByText('Medmors kvote')).toBeInTheDocument();
        expect(screen.queryByText('Fars kvote')).not.toBeInTheDocument();
    });

    it('Skal vise periode uten foreldrepenger og to perioder for tapte dager', async () => {
        render(<HullperiodeOverFamiliehendelsesdato />);

        expect(await screen.findByText('14. Mar - 01. Apr')).toBeInTheDocument();

        const førsteRad = within(screen.getByTestId('2024-03-14 - 2024-04-01'));
        expect(førsteRad.getByText('14. Mar - 01. Apr')).toBeInTheDocument();
        expect(førsteRad.getByText('2 uker og 3 dager')).toBeInTheDocument();
        expect(førsteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const andreRad = within(screen.getByTestId('2024-04-02 - 2024-04-03'));
        expect(andreRad.getByText('02. Apr - 03. Apr')).toBeInTheDocument();
        expect(andreRad.getByText('2 dager')).toBeInTheDocument();
        expect(andreRad.getAllByText('Uten foreldrepenger')).toHaveLength(2);

        const tredjeRad = within(screen.getByTestId('2024-04-04 - 2024-04-04'));
        expect(tredjeRad.getByText('04. Apr')).toBeInTheDocument();
        expect(tredjeRad.getAllByText('Fødsel')).toHaveLength(2);

        const fjerdeRad = within(screen.getByTestId('2024-04-04 - 2024-05-02'));
        expect(fjerdeRad.getByText('04. Apr - 02. May')).toBeInTheDocument();
        expect(fjerdeRad.getByText('4 uker og 1 dag')).toBeInTheDocument();
        expect(fjerdeRad.getAllByText('Dager du kan tape')).toHaveLength(2);

        const femteRad = within(screen.getByTestId('2024-05-03 - 2024-05-15'));
        expect(femteRad.getByText('03. May - 15. May')).toBeInTheDocument();
        expect(femteRad.getByText('1 uke og 4 dager')).toBeInTheDocument();
        expect(femteRad.getAllByText('Hans har foreldrepenger')).toHaveLength(2);
    });

    it('Skal vise perioder med oppholdsårsak korrekt', async () => {
        render(<VisPerioderMedOppholdsårsakKorrekt />);

        expect(await screen.findByText('18. Nov - 08. Dec')).toBeInTheDocument();

        const førsteRad = within(screen.getByTestId('2024-11-18 - 2024-12-08'));
        expect(førsteRad.getByText('18. Nov - 08. Dec')).toBeInTheDocument();
        expect(førsteRad.getByText('3 uker')).toBeInTheDocument();
        expect(førsteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const andreRad = within(screen.getByTestId('2024-12-09 - 2024-12-09'));
        expect(andreRad.getByText('09. Dec')).toBeInTheDocument();
        expect(andreRad.getAllByText('Fødsel')).toHaveLength(2);

        const fjerdeRad = within(screen.getByTestId('2024-12-09 - 2025-05-16'));
        expect(fjerdeRad.getByText('09. Dec - 16. May')).toBeInTheDocument();
        expect(fjerdeRad.getByText('23 uker')).toBeInTheDocument();
        expect(fjerdeRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        const femteRad = within(screen.getByTestId('2025-05-19 - 2025-09-29'));
        expect(femteRad.getByText('19. May - 29. Sep')).toBeInTheDocument();
        expect(femteRad.getByText('19 uker og 1 dag')).toBeInTheDocument();
        expect(femteRad.getAllByText('Hans har foreldrepenger')).toHaveLength(2);

        const sjetteRad = within(screen.getByTestId('2025-09-30 - 2025-10-15'));
        expect(sjetteRad.getByText('30. Sep - 15. Oct')).toBeInTheDocument();
        expect(sjetteRad.getByText('2 uker og 2 dager')).toBeInTheDocument();
        expect(sjetteRad.getAllByText('Hanne har foreldrepenger')).toHaveLength(2);

        expect(screen.queryByText('Uten Foreldrepenger')).not.toBeInTheDocument();
        expect(screen.queryByText('Dager du kan tape')).not.toBeInTheDocument();
    });
    it('Skal ikke kunne redigere en EØS-periode', async () => {
        render(<MorSøkerOgFarHarEøsPeriode />);

        expect(await screen.findByText('03. Jul - 15. Jul')).toBeInTheDocument();

        const eøsRad = within(screen.getByTestId('2024-07-03 - 2024-07-15'));
        expect(eøsRad.getByText('03. Jul - 15. Jul')).toBeInTheDocument();
        expect(eøsRad.getByText('1 uke og 4 dager')).toBeInTheDocument();
        expect(eøsRad.getAllByText('Hans har foreldrepenger (EU/EØS)')).toHaveLength(2);

        const ekspandertEøsRad = within(
            screen.getByText('Den andre forelderen mottar pengestøtte i et annet EU/EØS-land'),
        );
        expect(
            ekspandertEøsRad.getByText('Den andre forelderen mottar pengestøtte i et annet EU/EØS-land'),
        ).toBeInTheDocument();
        expect(ekspandertEøsRad.queryByText('Endre')).not.toBeInTheDocument();
        expect(ekspandertEøsRad.queryByText('Slett')).not.toBeInTheDocument();
    });

    it('Skal få advarsel om at en må velge mors aktivitet', async () => {
        render(<MarkeringNårFarHarFellesperiodeOgMorsAktivitetMåFyllesUt />);

        expect(await screen.findByText('Du må velge mors aktivitet før du går videre')).toBeInTheDocument();

        expect(screen.getAllByText('Mangler mors aktivitet')).toHaveLength(3);

        await userEvent.click(screen.getAllByText('Mangler mors aktivitet')[0]!);

        const alleEndringsknapper = screen.getAllByText('Endre');
        await userEvent.click(alleEndringsknapper.at(-1)!);

        expect(await screen.findByText('Du må velge mors aktivitet før du kan gå videre.')).toBeInTheDocument();

        await userEvent.selectOptions(screen.getByLabelText('Hva skal mor gjøre i denne perioden?'), 'ARBEID');

        await userEvent.click(screen.getByText('Ferdig, legg til i plan'));

        expect(screen.getByText('Mor er i arbeid')).toBeInTheDocument();

        expect(screen.queryByText('Du må velge mors aktivitet før du går videre')).not.toBeInTheDocument();
    });

    it('Skal kunne slette og endre alle perioder bortsett fra periodene til annen part', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);
        expect(await screen.findAllByText('Hanne har foreldrepenger')).toHaveLength(6);
        expect(screen.getAllByText('Endre')).toHaveLength(3);
        expect(screen.queryByText('Slett')).not.toBeInTheDocument();
    });

    it('Skal ikke kunne legge til annen part som forelder når en legger til ny periode', async () => {
        render(<FarSøkerEtterAtMorHarSøkt />);

        expect(await screen.findByText('14. Mar - 03. Apr')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Legg til periode'));

        expect(await screen.findByText('Hva vil du gjøre?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Legge til periode med foreldrepenger'));

        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(screen.getByText('Hvem skal ha foreldrepenger?')).toBeInTheDocument();
        expect(screen.queryByText('Mor')).not.toBeInTheDocument();
        expect(screen.getByText('Far')).toBeInTheDocument();
        expect(screen.getByText('Begge')).toBeInTheDocument();
    });
});
