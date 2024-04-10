import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './Calendar.stories';

const { Default, PeriodsThatSpanOverAYear } = composeStories(stories);

describe('<Calendar>', () => {
    it('skal vise korrekt antall dager uten markering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:NONE', { exact: false })).toHaveLength(61);
    });

    it('skal vise korrekt antall dager med helgemarkering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:GRAY', { exact: false })).toHaveLength(60);
    });

    it('skal vise korrekt antall dager med blå markering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:BLUE', { exact: false })).toHaveLength(67);
    });

    it('skal vise korrekt antall dager med grønn markering', async () => {
        render(<Default />);
        expect(await screen.findAllByTestId('dayColor:GREEN', { exact: false })).toHaveLength(85);
    });

    it('skal vise korrekt familiehendelse den 21 februar', async () => {
        render(<Default />);
        expect(await screen.findByTestId('dayColor:PINK', { exact: false })).toBeInTheDocument();
        expect(screen.getByTestId('day:21;dayColor:PINK;dayType:FIRST_AND_LAST_DAY')).toBeInTheDocument();
    });

    it('skal vise korrekt navn på måneder når perioden går over to år', async () => {
        render(<PeriodsThatSpanOverAYear />);

        expect(await screen.findByText('Jan')).toBeInTheDocument();
        expect(screen.getAllByText('Feb')).toHaveLength(2);
        expect(screen.getAllByText('Mar')).toHaveLength(2);
        expect(screen.getAllByText('Apr')).toHaveLength(2);
        expect(screen.getAllByText('May')).toHaveLength(2);
        expect(screen.getAllByText('Jun')).toHaveLength(2);
        expect(screen.getAllByText('Jul')).toHaveLength(2);
        expect(screen.getAllByText('Aug')).toHaveLength(2);
        expect(screen.getAllByText('Sep')).toHaveLength(2);
        expect(screen.getByText('Oct')).toBeInTheDocument();
        expect(screen.getByText('Nov')).toBeInTheDocument();
        expect(screen.getByText('Dec')).toBeInTheDocument();
        expect(screen.getByText('Jan (2025)')).toBeInTheDocument();
    });
});
