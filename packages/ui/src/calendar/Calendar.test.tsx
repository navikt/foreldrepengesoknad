import { composeStories } from '@storybook/react-vite';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Calendar } from './Calendar';
import * as stories from './Calendar.stories';

const { Default, PeriodsThatSpanOverAYear } = composeStories(stories);

const finnDagerMedTabIndex0 = (container: HTMLElement) => container.querySelectorAll('button[tabindex="0"]');

describe('<Calendar>', () => {
    it('skal ikke flytte fokus inn i kalenderen når den vises', () => {
        const { rerender } = render(
            <Calendar periods={[]} firstDateInCalendar="2024-01-01" setSelectedPeriods={() => undefined} />,
        );

        expect(document.body).toHaveFocus();

        rerender(<Calendar periods={[]} firstDateInCalendar="2024-02-01" setSelectedPeriods={() => undefined} />);

        expect(document.body).toHaveFocus();
    });

    it('skal ikke flytte fokus inn i kalenderen i lesemodus', () => {
        render(<Default />);

        expect(document.body).toHaveFocus();
    });

    it('skal ha nøyaktig én dag i tab-rekkefølgen på tvers av måneder', async () => {
        const { container } = render(
            <Calendar
                periods={[]}
                firstDateInCalendar="2024-06-01"
                lastDateInCalendar="2024-08-31"
                setSelectedPeriods={() => undefined}
            />,
        );

        expect(finnDagerMedTabIndex0(container)).toHaveLength(1);
        expect(finnDagerMedTabIndex0(container)[0]).toHaveAccessibleName('3. juni 2024');

        await userEvent.tab();
        expect(screen.getByRole('button', { name: '3. juni 2024' })).toHaveFocus();

        fireEvent.focus(screen.getByRole('button', { name: '1. juli 2024' }));

        expect(finnDagerMedTabIndex0(container)).toHaveLength(1);
        expect(finnDagerMedTabIndex0(container)[0]).toHaveAccessibleName('1. juli 2024');
    });

    it('skal flytte fokus med piltaster, også til neste måned', async () => {
        render(
            <Calendar
                periods={[]}
                firstDateInCalendar="2024-01-01"
                lastDateInCalendar="2024-02-29"
                setSelectedPeriods={() => undefined}
            />,
        );

        await userEvent.tab();
        expect(screen.getByRole('button', { name: '1. januar 2024' })).toHaveFocus();

        await userEvent.keyboard('{ArrowRight}');
        expect(screen.getByRole('button', { name: '2. januar 2024' })).toHaveFocus();

        screen.getByRole('button', { name: '31. januar 2024' }).focus();
        await userEvent.keyboard('{ArrowDown}');
        expect(screen.getByRole('button', { name: '7. februar 2024' })).toHaveFocus();
    });

    it('skal beholde fokus når piltast peker utenfor kalenderen', async () => {
        const { container } = render(
            <Calendar periods={[]} firstDateInCalendar="2024-01-01" setSelectedPeriods={() => undefined} />,
        );

        await userEvent.tab();
        await userEvent.keyboard('{ArrowUp}');

        expect(screen.getByRole('button', { name: '1. januar 2024' })).toHaveFocus();
        expect(finnDagerMedTabIndex0(container)).toHaveLength(1);
    });

    it('lar nettleseren håndtere zoom og andre snarveier når første kalenderdag har fokus', async () => {
        render(<Calendar periods={[]} firstDateInCalendar="2024-01-01" setSelectedPeriods={() => undefined} />);

        await userEvent.tab();
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
