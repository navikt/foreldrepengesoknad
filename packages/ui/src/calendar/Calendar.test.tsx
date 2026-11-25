import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';

import { Calendar } from './Calendar';
import * as stories from './Calendar.stories';

const { Default, PeriodsThatSpanOverAYear } = composeStories(stories);

describe('<Calendar>', () => {
    it('lar nettleseren håndtere zoom og andre snarveier når første kalenderdag har fokus', () => {
        render(<Calendar periods={[]} firstDateInCalendar="2024-01-01" setSelectedPeriods={() => undefined} />);

        const førsteDag = screen.getByRole('button', { name: '1. januar 2024' });
        expect(førsteDag).toHaveFocus();

        for (const options of [
            { key: '+', ctrlKey: true },
            { key: '=', ctrlKey: true },
            { key: '+', metaKey: true },
            { key: 'a' },
            { key: 'ArrowRight', ctrlKey: true },
        ]) {
            const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...options });
            førsteDag.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(false);
        }

        const pilHøyre = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
        førsteDag.dispatchEvent(pilHøyre);
        expect(pilHøyre.defaultPrevented).toBe(true);
    });

    it('skal vise riktige dagmarkeringer og familiehendelse', () => {
        const { container } = render(<Default />);

        expect(container.querySelectorAll('[data-periode-color="NONE"]')).toHaveLength(22);
        expect(container.querySelectorAll('[data-periode-color="GRAY"]')).toHaveLength(69);
        expect(container.querySelectorAll('[data-periode-color="BLUE"]')).toHaveLength(68);
        expect(container.querySelectorAll('[data-periode-color="LIGHTGREEN"]')).toHaveLength(85);
        expect(screen.getByLabelText('21. februar 2024, Termindato')).toHaveAttribute('data-periode-color', 'BLUE');
    });

    it('skal vise korrekt navn på måneder når perioden går over to år', () => {
        render(<PeriodsThatSpanOverAYear />);

        expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(18);
        expect(screen.getByText('Februar 2024')).toBeInTheDocument();
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
