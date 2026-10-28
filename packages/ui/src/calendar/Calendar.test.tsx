import { composeStories } from '@storybook/react-vite';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './Calendar.stories';

const { Default, PeriodsThatSpanOverAYear, VisKalenderMedValgAvPerioder } = composeStories(stories);

describe('<Calendar>', () => {
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

    it('skal ikke flytte fokus inn i kalenderen ved visning og skal kun ha ett tabstopp', async () => {
        const { container } = render(<VisKalenderMedValgAvPerioder />);

        expect(document.body).toHaveFocus();
        expect(container.querySelectorAll('button[tabindex="0"]')).toHaveLength(1);

        await userEvent.tab();
        const førsteDag = document.activeElement;
        expect(førsteDag?.tagName).toBe('BUTTON');

        for (let i = 0; i < 25; i++) {
            await userEvent.keyboard('{ArrowRight}');
        }

        expect(document.activeElement).not.toBe(førsteDag);
        expect(container.querySelectorAll('button[tabindex="0"]')).toHaveLength(1);
        expect(document.activeElement).toHaveAttribute('tabindex', '0');
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
