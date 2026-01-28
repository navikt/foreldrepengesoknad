import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DELT_UTTAK_80_TO_BARN, DELT_UTTAK_100_TO_BARN } from '@navikt/fp-utils-test';

import { endreFordelingMedSlider } from '../../../vitest/testHelpers';
import * as stories from './PlanenDeresSteg_Fødsel.stories';

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
    BareFarSøkerAleneOmOmsorg,
    FarOgFarBeggeHarRett,
    FarOgFarKunFarHarRett,
    FarOgFarKunMedfarHarRett,
    BarnetErFødtDagenEtterTermindato,
} = composeStories(stories);

describe('<PlanenDeresSteg - fødsel>', () => {
    it('skal vise korrekt data for fødsel - mor og far - begge har rett', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        // Verifiserer at slideren viser 0 uker for mor og 16 uker for far
        const sliderHeadings = screen.getAllByRole('heading', { level: 4 });
        expect(sliderHeadings.some((heading) => heading.textContent === '0 uker')).toBe(true);
        expect(sliderHeadings.some((heading) => heading.textContent === '16 uker')).toBe(true);

        expect(screen.getByText('Mors periode')).toBeInTheDocument();
        expect(screen.getByText('Fars periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:11;dayColor:BLUE')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:14;dayColor:GREEN')).toBeInTheDocument();
        expect(within(oktober).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(9);
        expect(within(oktober).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(14);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:GREEN')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun mor har rett', async () => {
        render(<MorOgFarKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:BLUE')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun far har rett fordi mor er ufør', async () => {
        render(<MorOgFarKunFarHarRettMorUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én har rett
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Din periode med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:12;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(15);

        const november = screen.getByTestId('year:2024;month:10');
        expect(within(november).getByTestId('day:22;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(november).getByTestId('day:25;dayColor:GREEN')).toBeInTheDocument();
        expect(within(november).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(16);
        expect(within(november).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(16 + 5);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:GREEN')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun far har rett', async () => {
        render(<MorOgFarKunFarHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én har rett
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Din periode med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:12;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(15);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:18;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:21;dayColor:GREEN')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(14);
        expect(within(oktober).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(14 + 9);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:GREEN')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - begge har rett', async () => {
        render(<MorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer fordelingen på slideren
        const sliderHeadings = screen.getAllByRole('heading', { level: 4 });
        expect(sliderHeadings.some((heading) => heading.textContent === '0 uker')).toBe(true);
        expect(sliderHeadings.some((heading) => heading.textContent === '16 uker')).toBe(true);

        expect(screen.getByText('Mors periode')).toBeInTheDocument();
        expect(screen.getByText('Medmors periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:11;dayColor:BLUE')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:14;dayColor:GREEN')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(9);
        expect(within(oktober).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(14);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun mor har rett', async () => {
        render(<MorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én har rett
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:BLUE')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun medmor har rett fordi mor er ufør', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én har rett
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Din periode med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:9;dayColor:NONE')).toBeInTheDocument();
        expect(within(august).getByTestId('day:12;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(15);

        const november = screen.getByTestId('year:2024;month:10');
        expect(within(november).getByTestId('day:1;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(november).getByTestId('day:25;dayColor:GREEN')).toBeInTheDocument();
        expect(within(november).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(16);
        expect(within(november).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(16 + 5);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:GREEN')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun medmor har rett', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én har rett
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Din periode med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:12;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(15);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:18;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:21;dayColor:GREEN')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(14);
        expect(within(oktober).queryAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(14 + 9);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:GREEN')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor søker og har rett', async () => {
        render(<BareMorSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én søker
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juni).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:BLUE')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - far søker og har rett', async () => {
        render(<BareFarSøkerAleneOmOmsorg />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én søker
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:GREEN')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - far og far søker - begge har rett', async () => {
        render(<FarOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én søker
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(22);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun biologisk far har rett', async () => {
        render(<FarOgFarKunFarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Dere har oppgitt at kun én av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én har rett
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(22);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun medfar har rett', async () => {
        render(<FarOgFarKunMedfarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Dere har oppgitt at kun én av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer at slideren ikke vises når kun én har rett
        expect(screen.queryByRole('slider')).not.toBeInTheDocument();

        expect(screen.getByText('Din periode uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();
        expect(screen.getAllByText('Barnehageplass')[0]).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:GREENOUTLINE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:GREENOUTLINE', { exact: false })).toHaveLength(22);
    });

    it('skal vise korrekt data for fødsel - barnet er født dagen etter termindato', async () => {
        render(<BarnetErFødtDagenEtterTermindato />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );

        // Verifiserer fordelingen på slideren
        const sliderHeadings = screen.getAllByRole('heading', { level: 4 });
        expect(sliderHeadings.some((heading) => heading.textContent === '0 uker')).toBe(true);
        expect(sliderHeadings.some((heading) => heading.textContent === '16 uker')).toBe(true);

        expect(screen.getByText('Mors periode')).toBeInTheDocument();
        expect(screen.getByText('Fars periode')).toBeInTheDocument();
        expect(screen.getByText('Fødsel')).toBeInTheDocument();
        expect(screen.getAllByText('Barnehageplass')[0]).toBeInTheDocument();

        const mars = screen.getByTestId('year:2024;month:2');
        expect(within(mars).getByTestId('day:22;dayColor:BLUE')).toBeInTheDocument();
        expect(within(mars).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(6);

        const april = screen.getByTestId('year:2024;month:3');
        expect(within(april).getByTestId('day:11;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getByTestId('day:12;dayColor:PINK')).toBeInTheDocument();
        expect(within(april).getByTestId('day:15;dayColor:BLUE')).toBeInTheDocument();
        expect(within(april).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(21);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:25;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:26;dayColor:GREEN')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(4);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:GREEN')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(19);
    });

    it('skal endre dekningsgrad til 80%', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        await userEvent.click(screen.getByText('80 % i 61 uker + 1 dag'));

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe('true');

        // Verifiserer at slideren viser 0 uker for mor og 16 uker for far
        const sliderHeadings = screen.getAllByRole('heading', { level: 4 });
        expect(sliderHeadings.some((heading) => heading.textContent === '0 uker')).toBe(true);
        expect(sliderHeadings.some((heading) => heading.textContent === '20 uker')).toBe(true);

        expect(screen.getByText('Mors periode')).toBeInTheDocument();
        expect(screen.getByText('Fars periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();
        expect(screen.getAllByText('Barnehageplass')[0]).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const nov = screen.getByTestId('year:2024;month:10');
        expect(within(nov).getByTestId('day:8;dayColor:BLUE')).toBeInTheDocument();
        expect(within(nov).getByTestId('day:11;dayColor:GREEN')).toBeInTheDocument();
        expect(within(nov).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(6);
        expect(within(nov).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(15);
    });

    it('skal endre fordeling av fellesperiode sånn at de får 8 uker hver', async () => {
        const utils = render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        // Endrer fordelingen med slideren til 8 uker hver (40 dager)
        await endreFordelingMedSlider(utils, 40);

        // Verifiserer fordelingen på slideren
        const sliderHeadings = screen.getAllByRole('heading', { level: 4 });
        expect(sliderHeadings.some((heading) => heading.textContent === '8 uker')).toBe(true);
        expect(sliderHeadings.filter((heading) => heading.textContent === '8 uker')).toHaveLength(2);

        expect(screen.getByText('Mors periode')).toBeInTheDocument();
        expect(screen.getByText('Fars periode')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();
        expect(screen.getAllByText('Barnehageplass')[0]).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:31;dayColor:BLUE')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const desember = screen.getByTestId('year:2024;month:11');
        expect(within(desember).getByTestId('day:6;dayColor:BLUE')).toBeInTheDocument();
        expect(within(desember).getByTestId('day:9;dayColor:GREEN')).toBeInTheDocument();
        expect(within(desember).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(5);
        expect(within(desember).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(17);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(12);
    });

    it('Skal ikke vise ekstra dag info når det ikke er restdager', async () => {
        // Med 1 barn og 100% dekningsgrad er det 16 uker = 80 dager, ingen restdager
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(
            screen.queryByText(/ekstra dag.*med fellesperiode vil legge seg inn i planen automatisk/i),
        ).not.toBeInTheDocument();
    });

    it('Skal vise melding om én ekstra dag når det er 1 restdag', async () => {
        // 80% med 1 barn har 101 dager fellesperiode = 20 uker + 1 dag
        const originalArgs = MorOgFarBeggeHarRett.args;
        render(
            <MorOgFarBeggeHarRett
                {...originalArgs}
                hvorLangPeriode={{
                    dekningsgrad: '80',
                }}
            />,
        );

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(
            screen.getByText(
                'Den ene ekstra dagen med fellesperiode vil legge seg inn i planen automatisk. ' +
                    'Hvis du ønsker en annen fordeling, kan du endre dette nedenfor.',
            ),
        ).toBeInTheDocument();
    });

    it('Skal vise melding om flere ekstra dager når det er 2+ restdager', async () => {
        // 80% med 2 barn har 207 dager fellesperiode = 41 uker + 2 dager
        const originalArgs = MorOgFarBeggeHarRett.args;
        render(
            <MorOgFarBeggeHarRett
                {...originalArgs}
                omBarnet={{
                    erFødsel: true,
                    erBarnetFødt: false,
                    termindato: '2024-07-01',
                    antallBarn: '2',
                }}
                hvorLangPeriode={{
                    dekningsgrad: '80',
                }}
                stønadskontoer={{
                    '80': {
                        kontoer: DELT_UTTAK_80_TO_BARN,
                        minsteretter: { farRundtFødsel: 10, toTette: 0 },
                    },
                    '100': {
                        kontoer: DELT_UTTAK_100_TO_BARN,
                        minsteretter: { farRundtFødsel: 10, toTette: 0 },
                    },
                }}
            />,
        );

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(
            screen.getByText(
                'De ekstra dagene med fellesperiode vil legge seg inn i planen automatisk. ' +
                    'Hvis du ønsker en annen fordeling, kan du endre dette nedenfor.',
            ),
        ).toBeInTheDocument();
    });

    it('Skal vise datoer for fordeling i slider-komponent', async () => {
        const utils = render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        // Finn slideren ved å bruke aria-labelledby
        const slider = screen.getByRole('slider', { name: /fordeling/i });
        const sliderContainer = slider.closest('.aksel-vstack') as HTMLElement;

        // Sjekker initielle datoer (0 uker til søker 1) innenfor slider-containeren
        expect(within(sliderContainer).getByText(/10\.\s+juni\s+2024/)).toBeInTheDocument();
        expect(within(sliderContainer).getByText(/11\.\s+okt\.\s+2024/)).toBeInTheDocument();
        expect(within(sliderContainer).getByText(/14\.\s+okt\.\s+2024/)).toBeInTheDocument();
        expect(within(sliderContainer).getByText(/16\.\s+mai\s+2025/)).toBeInTheDocument();

        // Endrer fordeling til 8 uker til søker 1
        await endreFordelingMedSlider(utils, 40);

        // Verifiserer at datoene er oppdatert innenfor slider-containeren
        expect(within(sliderContainer).getByText(/10\.\s+juni\s+2024/)).toBeInTheDocument();
        expect(within(sliderContainer).getByText(/6\.\s+des\.\s+2024/)).toBeInTheDocument();
        expect(within(sliderContainer).getByText(/9\.\s+des\.\s+2024/)).toBeInTheDocument();
        expect(within(sliderContainer).getByText(/16\.\s+mai\s+2025/)).toBeInTheDocument();
    });
});
