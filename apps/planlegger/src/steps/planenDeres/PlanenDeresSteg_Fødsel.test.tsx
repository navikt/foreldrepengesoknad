import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    BareFarSøkerOgHarRett,
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
        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 16 uker til far' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:11;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(9);
        expect(within(oktober).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(14);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:LIGHTGREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun mor har rett', async () => {
        render(<MorOgFarKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun far har rett fordi mor er ufør', async () => {
        render(<MorOgFarKunFarHarRettMorUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const november = screen.getByTestId('year:2024;month:10');
        expect(within(november).getByTestId('day:22;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(november).getByTestId('day:25;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(november).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(16);
        expect(within(november).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(5);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:LIGHTGREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og far - kun far har rett', async () => {
        render(<MorOgFarKunFarHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:21;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
        expect(within(oktober).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(9);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:LIGHTGREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - begge har rett', async () => {
        render(<MorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 16 uker til medmor' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Helga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:11;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(9);
        expect(within(oktober).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(14);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun mor har rett', async () => {
        render(<MorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun medmor har rett fordi mor er ufør', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:9;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(august).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const november = screen.getByTestId('year:2024;month:10');
        expect(within(november).getByTestId('day:1;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(november).getByTestId('day:25;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(november).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(16);
        expect(within(november).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(5);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:LIGHTGREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor og medmor - kun medmor har rett', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:NONE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(0);

        const august = screen.getByTestId('year:2024;month:7');
        expect(within(august).getByTestId('day:12;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(august).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:21;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
        expect(within(oktober).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(9);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:LIGHTGREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - mor søker og har rett', async () => {
        render(<BareMorSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getByTestId('day:10;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juni).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - far søker og har rett', async () => {
        render(<BareFarSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - far og far søker - begge har rett', async () => {
        render(<FarOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun biologisk far har rett', async () => {
        render(<FarOgFarKunFarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Dere har oppgitt at kun én av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:16;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun medfar har rett', async () => {
        render(<FarOgFarKunMedfarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();
        expect(screen.getByText('Dere har oppgitt at kun én av dere har rett til foreldrepenger')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Foreldrepenger')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const mai2005 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2005).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(12);
    });

    it('skal vise korrekt data for fødsel - barnet er født dagen etter termindato', async () => {
        render(<BarnetErFødtDagenEtterTermindato />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
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
        expect(within(juli).getByTestId('day:26;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(19);
        expect(within(juli).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(4);

        const feb2025 = screen.getByTestId('year:2025;month:1');
        expect(within(feb2025).getByTestId('day:27;dayColor:LIGHTGREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(feb2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(19);
    });

    it('skal endre dekningsgrad til 80%', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        await userEvent.click(screen.getByText('80 % i 61 uker + 1 dag'));

        expect(screen.getByText('100 % i 49 uker').closest('button')?.getAttribute('aria-checked')).toBe('false');
        expect(screen.getByText('80 % i 61 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe('true');

        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 20 uker og en dag til far' }) as HTMLOptionElement)
                .selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const nov = screen.getByTestId('year:2024;month:10');
        expect(within(nov).getByTestId('day:8;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(nov).getByTestId('day:11;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(nov).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(6);
        expect(within(nov).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(15);

        const aug2025 = screen.getByTestId('year:2025;month:7');
        expect(
            within(aug2025).getByTestId('day:11;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(aug2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(7);
    });

    it('skal endre fordeling av fellesperiode sånn at de får 8 uker hver', async () => {
        const utils = render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        await userEvent.selectOptions(utils.getByDisplayValue('Fellesperioden: 16 uker til far'), '40');

        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 8 til mor, 8 til far' }) as HTMLOptionElement)
                .selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Termin')).toBeInTheDocument();

        const juni = screen.getByTestId('year:2024;month:5');
        expect(within(juni).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:1;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:2;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:31;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(22);

        const desember = screen.getByTestId('year:2024;month:11');
        expect(within(desember).getByTestId('day:6;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(desember).getByTestId('day:9;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(desember).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(5);
        expect(within(desember).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(17);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(12);
    });
});
