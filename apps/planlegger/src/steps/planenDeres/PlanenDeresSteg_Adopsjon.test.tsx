import { composeStories } from '@storybook/react';
import { render, screen, within } from '@testing-library/react';

import * as stories from './PlanenDeresSteg_Adopsjon.stories';

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

describe('<PlanenDeresSteg - adopsjon>', () => {
    it('skal vise korrekt data for adopsjon - mor og far - begge har rett', async () => {
        render(<MorOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 16 uker til far' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:21;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
        expect(within(oktober).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(9);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(17);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun mor har rett', async () => {
        render(<MorOgFarKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:23;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun far har rett fordi mor er ufør', async () => {
        render(<MorOgFarKunFarHarRettMorErUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:22;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);
        expect(within(oktober).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(8);

        const april2025 = screen.getByTestId('year:2025;month:3');
        expect(
            within(april2025).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(april2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);
    });

    it('skal vise korrekt data for adopsjon - mor og far - kun far har rett', async () => {
        render(<MorOgFarKunFarHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:16;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:17;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(11);
        expect(within(september).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);

        const april2025 = screen.getByTestId('year:2025;month:3');
        expect(
            within(april2025).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(april2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - begge har rett', async () => {
        render(<MorOgMedmorBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(
            (screen.getByRole('option', { name: 'Fellesperioden: 16 uker til medmor' }) as HTMLOptionElement).selected,
        ).toBe(true);

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Helga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:21;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
        expect(within(oktober).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(9);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(17);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun mor har rett', async () => {
        render(<MorOgMedmorKunMorHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:23;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun medmor har rett fordi mor er ufør', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorErUfør />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:21;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:22;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).queryAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(15);
        expect(within(oktober).queryAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(8);

        const april2025 = screen.getByTestId('year:2025;month:3');
        expect(
            within(april2025).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(april2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun medmor har rett', async () => {
        render(<MorOgMedmorKunMedmorHarRettMorIngenAvDisse />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:16;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:17;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(11);
        expect(within(september).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);

        const april2025 = screen.getByTestId('year:2025;month:3');
        expect(
            within(april2025).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(april2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);
    });

    it('skal vise korrekt data for adopsjon - mor søker og har rett', async () => {
        render(<BareMorSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:23;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);
    });

    it('skal vise korrekt data for adopsjon - far søker og har rett', async () => {
        render(<BareFarSøkerOgHarRett />);

        expect(await screen.findByText('Planen din')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:23;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);
    });

    it('skal vise korrekt data for fødsel - far og far søker - begge har rett', async () => {
        render(<FarOgFarBeggeHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(
            (screen.getAllByRole('option', { name: 'Fellesperioden: 16 uker til Anders' })[0] as HTMLOptionElement)
                .selected,
        ).toBe(true);

        expect(screen.getByText('Espen')).toBeInTheDocument();
        expect(screen.getByText('Anders')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const oktober = screen.getByTestId('year:2024;month:9');
        expect(within(oktober).getByTestId('day:18;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(oktober).getByTestId('day:21;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(oktober).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(14);
        expect(within(oktober).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(9);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:23;dayColor:LIGHTGREEN;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(17);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun far har rett', async () => {
        render(<FarOgFarKunFarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:16;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:17;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(11);
        expect(within(september).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);

        const april2025 = screen.getByTestId('year:2025;month:3');
        expect(
            within(april2025).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(april2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);
    });

    it('skal vise korrekt data for fødsel - far og far søker - kun medfar har rett', async () => {
        render(<FarOgFarKunMedfarHarRett />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 40 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 52 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Uten aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Med aktivitetskrav')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:7;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:9;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);

        const september = screen.getByTestId('year:2024;month:8');
        expect(within(september).getByTestId('day:16;dayColor:BLUE;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(september).getByTestId('day:17;dayColor:LIGHTGREEN;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(september).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(11);
        expect(within(september).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);

        const april2025 = screen.getByTestId('year:2025;month:3');
        expect(
            within(april2025).getByTestId('day:14;dayColor:LIGHTGREEN;dayType:FIRST_AND_LAST_DAY'),
        ).toBeInTheDocument();
        expect(within(april2025).getAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(10);
    });

    it('skal vise korrekt data for adopsjon - mor og medmor - kun mor har rett med omsorgsovertakelse i helgen', async () => {
        render(<MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen />);

        expect(await screen.findByText('Planen deres')).toBeInTheDocument();

        expect(screen.getByText('100 % i 46 uker').closest('button')?.getAttribute('aria-checked')).toBe('true');
        expect(screen.getByText('80 % i 58 uker + 1 dag').closest('button')?.getAttribute('aria-checked')).toBe(
            'false',
        );
        expect(screen.queryByRole('option')).not.toBeInTheDocument();

        expect(screen.getByText('Olga')).toBeInTheDocument();
        expect(screen.getByText('Omsorgsovertakelse')).toBeInTheDocument();

        const juli = screen.getByTestId('year:2024;month:6');
        expect(within(juli).getByTestId('day:5;dayColor:NONE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:7;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
        expect(within(juli).getByTestId('day:8;dayColor:BLUE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(juli).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(18);

        const mai2025 = screen.getByTestId('year:2025;month:4');
        expect(within(mai2025).getByTestId('day:23;dayColor:BLUE;dayType:LAST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getByTestId('day:26;dayColor:NONE;dayType:FIRST_DAY')).toBeInTheDocument();
        expect(within(mai2025).getAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(17);
    });
});
