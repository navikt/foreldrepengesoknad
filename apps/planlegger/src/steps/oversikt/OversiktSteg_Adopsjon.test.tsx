import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';

import * as stories from './OversiktSteg_Adopsjon.stories';

const {
    MorOgFarBeggeHarRett,
    MorOgFarKunMorHarRett,
    MorOgFarKunFarHarRettMorErUfør,
    MorOgFarKunFarHarRettMorIngenAvDisse,
    MorOgMedmorBeggeHarRett,
    MorOgMedmorKunMorHarRett,
    MorOgMedmorKunMedmorHarRettMorErUfør,
    MorOgMedmorKunMedmorHarRettMorIngenAvDisse,
    BareMorSøkerOgHarRett,
    BareFarSøkerOgHarRett,
    FarOgFarBeggeHarRett,
    FarOgFarKunFarHarRett,
    FarOgFarKunMedfarHarRett,
    MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen,
} = composeStories(stories);

describe('<OversiktSteg - adopsjon>', () => {
    it('skal vise korrekt data for adopsjon - mor og far - begge har rett', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getByRole('option', { name: '16 uker til far' }) as HTMLOptionElement).selected).toBe(true);

        expect(screen.getByText('Olga, 15 uker, starter torsdag 11. apr.')).toBeInTheDocument();
        expect(screen.getByText('Espen, 31 uker, starter torsdag 25. juli')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const februar2025 = screen.getByTestId('year:2025;month:1');
        expect(within(februar2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun mor har rett', async () => {
        render(<MorOgFarKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga, 46 uker, starter torsdag 11. apr.')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun far har rett fordi mor er ufør', async () => {
        render(<MorOgFarKunFarHarRettMorErUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen, 15 uker uten aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen, 25 uker med aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const jan2025 = screen.getByTestId('year:2025;month:0');
        expect(within(jan2025).getByTestId('day:15;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(jan2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(11);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun far har rett', async () => {
        render(<MorOgFarKunFarHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen, 8 uker uten aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen, 32 uker med aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(3);
        expect(within(juni).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const jan2025 = screen.getByTestId('year:2025;month:0');
        expect(within(jan2025).getByTestId('day:15;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(jan2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(11);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - begge har rett', async () => {
        render(<MorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getByRole('option', { name: '16 uker til medmor' }) as HTMLOptionElement).selected).toBe(true);

        expect(screen.getByText('Olga, 15 uker, starter torsdag 11. apr.')).toBeInTheDocument();
        expect(screen.getByText('Helga, 31 uker, starter torsdag 25. juli')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun mor har rett', async () => {
        render(<MorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga, 46 uker, starter torsdag 11. apr.')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun medmor har rett fordi mor er ufør', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorErUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Helga, 15 uker uten aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Helga, 25 uker med aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const jan2025 = screen.getByTestId('year:2025;month:0');
        expect(within(jan2025).getByTestId('day:15;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(jan2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(11);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun medmor har rett', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Helga, 8 uker uten aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Helga, 32 uker med aktivitetskrav til Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(3);
        expect(within(juni).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const jan2025 = screen.getByTestId('year:2025;month:0');
        expect(within(jan2025).getByTestId('day:15;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(jan2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(11);
    });

    it('skal vise korrekt data for adopsjon - mor søker og har rett', async () => {
        render(<BareMorSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga, 46 uker, starter torsdag 11. apr.')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for adopsjon - far søker og har rett', async () => {
        render(<BareFarSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen, 46 uker, starter torsdag 11. apr.')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

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

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getAllByRole('option', { name: '16 uker til Anders' })[0] as HTMLOptionElement).selected).toBe(
            true,
        );

        expect(screen.getByText('Espen, 15 uker, starter torsdag 11. apr.')).toBeInTheDocument();
        expect(screen.getByText('Anders, 31 uker, starter torsdag 25. juli')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:26;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(18);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun far har rett', async () => {
        render(<FarOgFarKunFarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 50 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen, 8 uker uten aktivitetskrav til Anders')).toBeInTheDocument();
        expect(screen.getByText('Espen, 32 uker med aktivitetskrav til Anders')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juni).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(3);
        expect(within(juni).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const jan2025 = screen.getByTestId('year:2025;month:0');
        expect(within(jan2025).getByTestId('day:15;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(jan2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(11);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun medfar har rett', async () => {
        render(<FarOgFarKunMedfarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 48 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Anders, 15 uker uten aktivitetskrav til Espen')).toBeInTheDocument();
        expect(screen.getByText('Anders, 25 uker med aktivitetskrav til Espen')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. apr.')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:24;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:25;dayColor:GREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(5);

        const jan2025 = screen.getByTestId('year:2025;month:0');
        expect(within(jan2025).getByTestId('day:15;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(jan2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(11);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun mor har rett', async () => {
        render(<MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80 % foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga, 46 uker, starter mandag 13. mai')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 12. mai')).toBeInTheDocument();

        const mai = screen.getByTestId('year:2024;month:4');
        expect(within(mai).getByTestId('day:10;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai).getByTestId('day:12;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(mai).getByTestId('day:13;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mai).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const mars2025 = screen.getByTestId('year:2025;month:2');
        expect(within(mars2025).getByTestId('day:28;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mars2025).getByTestId('day:31;dayColor:NONE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(mars2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(20);
    });
});
