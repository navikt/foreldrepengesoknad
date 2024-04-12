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
} = composeStories(stories);

//TODO Skriv testar for farOgFar-bareFarHarRett og farOgFar-bareMedfarHarRett

describe('<OversiktSteg - adopsjon>', () => {
    it('skal vise korrekt data for adopsjon - mor og far - begge har rett', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getByRole('option', { name: '16 uker til far' }) as HTMLOptionElement).selected).toBe(true);

        expect(screen.getByText('Mor, 15 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        expect(screen.getByText('Far, 31 uker, starter Friday 26 Jul')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:25;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:26;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(4);

        const februar2025 = screen.getByTestId('year:2025;month:1');
        expect(within(februar2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(20);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun mor har rett', async () => {
        render(<MorOgFarKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Mor, 46 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun far har rett', async () => {
        render(<MorOgFarKunFarHarRettMorErUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Far, 15 uker uten krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Far, 25 uker med krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(4);
        expect(within(september).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun far har rett fordi mor er ufør', async () => {
        render(<MorOgFarKunFarHarRettMorErUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Far, 15 uker uten krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Far, 25 uker med krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(4);
        expect(within(september).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun far har rett', async () => {
        render(<MorOgFarKunFarHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Far, 8 uker uten krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Far, 32 uker med krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:19;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(9);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - begge har rett', async () => {
        render(<MorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getByRole('option', { name: '16 uker til medmor' }) as HTMLOptionElement).selected).toBe(true);

        expect(screen.getByText('Mor, 15 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        expect(screen.getByText('Medmor, 31 uker, starter Friday 26 Jul')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:25;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:26;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(4);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(20);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun mor har rett', async () => {
        render(<MorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Mor, 46 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun medmor har rett fordi mor er ufør', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorErUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Medmor, 15 uker uten krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Medmor, 25 uker med krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:5;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:6;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(4);
        expect(within(september).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun medmor har rett', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Medmor, 8 uker uten krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Medmor, 32 uker med krav til mor')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:19;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(9);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - mor søker og har rett', async () => {
        render(<BareMorSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Mor, 46 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for adopsjon - far søker og har rett', async () => {
        render(<BareFarSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Far, 46 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
    });

    it('skal vise korrekt data for fødsel - far og far søker - begge har rett', async () => {
        render(<FarOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100% foreldrepenger i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'true',
        );
        expect(screen.getByText('80% foreldrepenger i 56 uker').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect((screen.getAllByRole('option', { name: '16 uker til far' })[0] as HTMLOptionElement).selected).toBe(
            true,
        );

        expect(screen.getByText('Far, 15 uker, starter Thursday 11 Apr')).toBeInTheDocument();
        expect(screen.getByText('Far, 31 uker, starter Friday 26 Jul')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelsesdato 11. Apr')).toBeInTheDocument();

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:10;dayColor:NONE;dayType:BETWEEN_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:11;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(13);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:25;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:26;dayColor:GREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(4);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:28;dayColor:GREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(20);
    });
});
