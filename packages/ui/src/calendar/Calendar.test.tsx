import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

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
        expect(await screen.findAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(67);
    });

    it('skal vise korrekt antall dager med grønn markering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:LIGHTGREEN', { exact: false })).toHaveLength(85);
    });

    it('skal vise korrekt familiehendelse den 21 februar', async () => {
        render(<Default />);
        expect(await screen.findByTestId('dayColor:PINK', { exact: false })).toBeInTheDocument();
        expect(screen.getByTestId('day:21;dayColor:PINK')).toBeInTheDocument();
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
});
