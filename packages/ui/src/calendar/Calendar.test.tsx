import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';

import * as stories from './Calendar.stories';

const { Default, PeriodsThatSpanOverAYear } = composeStories(stories);

describe('<Calendar>', () => {
    it('skal vise korrekt antall dager uten markering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:NONE', { exact: false })).toHaveLength(22);
    });

    it('skal vise korrekt antall dager med helgemarkering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:GRAY', { exact: false })).toHaveLength(69);
    });

    it('skal vise korrekt antall dager med blå markering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(68);
    });

    it('skal vise korrekt antall dager med grønn markering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(85);
    });

    it('skal vise korrekt familiehendelse den 21 februar', () => {
        render(<Default />);
        expect(screen.getByTestId('day:21;dayColor:BLUE;with-icon')).toBeInTheDocument();
    });

    it('skal vise korrekt navn på måneder når perioden går over to år', async () => {
        render(<PeriodsThatSpanOverAYear />);

        expect(await screen.findByText('Februar 2024')).toBeInTheDocument();
        expect(screen.getByText('Mars 2024')).toBeInTheDocument();
        expect(screen.getByText('April 2024')).toBeInTheDocument();
        expect(screen.getByText('Mai 2024')).toBeInTheDocument();
        expect(screen.getByText('Juni 2024')).toBeInTheDocument();
        expect(screen.getByText('Juli 2024')).toBeInTheDocument();
    });

    it('skal vise korrekte ukenummer i januar (skal ikke telle videre fra forrige år)', async () => {
        render(<PeriodsThatSpanOverAYear />);

        const januar2025 = await screen.findByTestId('year:2025;month:0');
        const ukenummer = within(januar2025)
            .getAllByTestId('ukenummer')
            .map((el) => el.textContent);

        expect(ukenummer).toEqual(['1', '2', '3', '4', '5']);
    });
});
