import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './OversiktSteg_Fødsel.stories';

const {
    MorOgFarBeggeHarRett,
    MorOgFarKunMorHarRett,
    MorOgFarKunFarHarRettMorUfør,
    MorOgFarKunFarHarRettMorIngenAvDisse,
    MorOgMedmorBeggeHarRett,
    MorOgMedmorKunMorHarRett,
    MorOgMedmorKunMedmorHarRettMorUfør,
    MorOgMedmorKunMedmorHarRettMorIngenAvDisse,
    BareMorSøkerOgHarRett,
    BareFarSøkerOgHarRett,
    FarOgFarBeggeHarRett,
    FarOgFarKunFarHarRett,
    FarOgFarKunMedfarHarRett,
    BarnetErFødtDagenEtterTermindato,
} = composeStories(stories);

describe('<OversiktSteg - fødsel>', () => {
    it('skal vise korrekt data for fødsel - mor og far - begge har rett', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 16 uker til far' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const februar2025 = screen.getByTestId('year:2025;month:1');
        expect(within(februar2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun mor har rett', async () => {
        render(<MorOgFarKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun far har rett fordi mor er ufør', async () => {
        render(<MorOgFarKunFarHarRettMorUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen, uker uten krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen, uker med krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:23;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mai).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:4;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:5;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(3);
        expect(within(september).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun far har rett', async () => {
        render(<MorOgFarKunFarHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen, uker uten krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen, uker med krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:23;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mai).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:17;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:18;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(10);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - begge har rett', async () => {
        render(<MorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 16 uker til medmor' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Helga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun mor har rett', async () => {
        render(<MorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun medmor har rett fordi mor er ufør', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Helga, uker uten krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Helga, uker med krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:23;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mai).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:4;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:5;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(3);
        expect(within(september).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun medmor har rett', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Helga, uker uten krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Helga, uker med krav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:23;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mai).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:17;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:18;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(10);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - mor søker og har rett', async () => {
        render(<BareMorSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - far søker og har rett', async () => {
        render(<BareFarSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - far og far søker - begge har rett', async () => {
        render(<FarOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun biologisk far har rett', async () => {
        render(<FarOgFarKunFarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText(/Dere har oppgitt at kun/)).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2005 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2005).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2005).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun medfar har rett', async () => {
        render(<FarOgFarKunMedfarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText(/Dere har oppgitt at kun/)).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2005 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2005).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2005).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun biologisk far har rett', async () => {
        render(<BarnetErFødtDagenEtterTermindato />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 16 uker til far' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Fødselsdato')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:22;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(6);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:11;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:15;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:25;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:26;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(4);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal endre dekningsgrad til 80%', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        await userEvent.click(screen.getByText('80 % i 59 uker'));

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('80 % i 59 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');

        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 18 uker til far' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:21;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(august).getByTestId('day:22;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(august).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);
        expect(within(august).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(7);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:7;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);
    });

    it('skal endre fordeling av fellesperiode sånn at de får 8 uker hver', async () => {
        const utils = render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByDisplayValue('Fellesperioden: 16 uker til far'), '8');

        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 8 til mor, 8 til far' }) as HTMLOptionElement)
                .selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(7);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:19;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);
        expect(within(september).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(8);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });
});
