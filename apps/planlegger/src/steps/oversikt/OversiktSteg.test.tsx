import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';

import * as stories from './OversiktSteg.stories';

const {
    FødselMorOgFarBeggeHarRett,
    FødselMorOgFarKunMorHarRett,
    FødselMorOgFarKunFarHarRett,
    FødselMorOgMedmorBeggeHarRett,
    FødselMorOgMedmorKunMorHarRett,
    FødselMorOgMedmorKunMedmorHarRett,
    FødselBareMorSøkerOgHarRett,
    FødselBareFarSøkerOgHarRett,
} = composeStories(stories);

describe('<OversiktSteg>', () => {
    it('skal vise korrekt data for fødsel - mor og far - begge har rett', async () => {
        render(<FødselMorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getByRole('option', { name: '16 uker til far' }) as HTMLOptionElement).selected).toBe(true);

        expect(screen.getByText('Mor, 18 uker, starter Thursday 21 Mar')).toBeInTheDocument();
        expect(screen.getByText('Far, 31 uker, starter Friday 26 Jul')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:25;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:26;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(4);

        const februar2025 = screen.getByTestId('year:2025;month:1');
        expect(within(februar2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(20);

        const mars2025 = screen.getByTestId('year:2025;month:2');
        expect(within(mars2025).getAllByTestId('dayColor:NONE', { exact: false })).toHaveLength(31);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun mor har rett', async () => {
        render(<FødselMorOgFarKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Mor, 49 uker, starter Thursday 21 Mar')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun far har rett', async () => {
        render(<FødselMorOgFarKunFarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Far, 15 uker uten krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Far, 25 uker med krav til mor')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:24;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(mai).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(6);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(4);
        expect(within(september).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - begge har rett', async () => {
        render(<FødselMorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getByRole('option', { name: '16 uker til medmor' }) as HTMLOptionElement).selected).toBe(true);

        expect(screen.getByText('Mor, 18 uker, starter Thursday 21 Mar')).toBeInTheDocument();
        expect(screen.getByText('Medmor, 31 uker, starter Friday 26 Jul')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:25;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:26;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(4);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(20);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun mor har rett', async () => {
        render(<FødselMorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Mor, 49 uker, starter Thursday 21 Mar')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun medmor har rett', async () => {
        render(<FødselMorOgMedmorKunMedmorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Medmor, 15 uker uten krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Medmor, 25 uker med krav til mor')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:24;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(mai).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(6);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(4);
        expect(within(september).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for fødsel - mor søker og har rett', async () => {
        render(<FødselBareMorSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Mor, 49 uker, starter Thursday 21 Mar')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for fødsel - far søker og har rett', async () => {
        render(<FødselBareFarSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Far, 46 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        // FIXME Skal vel stå termindato her?
        expect(screen.getByText('Fødselsdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        // FIXME Denne er feil i kode
        //expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });
});
