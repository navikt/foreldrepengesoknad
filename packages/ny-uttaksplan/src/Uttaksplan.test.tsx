import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import * as stories from './Uttaksplan.stories';

const { Default, MorOgMedmor, MorOgFarMedFerieopphold } = composeStories(stories);

describe('Uttaksplan', () => {
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

        expect(await screen.findByText('Hvilken del av foreldrepengene vil du bruke?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Fellesperiode')[1]!);

        expect(await screen.findByText('Hvem gjelder fellesperioden?')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Mor'));

        expect(await screen.findByText('Hvilke datoer skal perioden være?')).toBeInTheDocument();
        const fraOgMedDato = screen.getByLabelText('Fra og med dato');
        await userEvent.type(fraOgMedDato, dayjs('2025-06-30').format('DD.MM.YYYY'));
        await userEvent.tab();
        const tilOgMedDato = screen.getByLabelText('Til og med dato');
        await userEvent.type(tilOgMedDato, dayjs('2025-08-28').format('DD.MM.YYYY'));
        await userEvent.tab();

        expect(await screen.findByText('Skal dere ha foreldrepenger samtidig?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[0]!);

        expect(await screen.findByText('Hvor mange prosent?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent?'), '50');

        expect(await screen.findByText('Skal du kombinere foreldrepengene med arbeid?')).toBeInTheDocument();
        await userEvent.click(screen.getAllByText('Ja')[1]!);

        expect(await screen.findByText('Hvor mange prosent skal du jobbe?')).toBeInTheDocument();
        await userEvent.type(screen.getByLabelText('Hvor mange prosent skal du jobbe?'), '50');

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
        expect(screen.getByText('Hva vil du endre til?')).toBeInTheDocument();

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
});
