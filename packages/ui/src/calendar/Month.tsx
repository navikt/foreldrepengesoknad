import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useMemo } from 'react';

import { Box, HGrid, Heading, VStack } from '@navikt/ds-react';

import styles from './month.module.css';

dayjs.extend(isoWeek);

type Props = {
    year: number;
    month: number;
    children: React.ReactNode[];
    headerLevel: '4' | '5';
    showWeekNumbers: boolean;
};

export const Month = ({ year, month, children, headerLevel, showWeekNumbers }: Props) => {
    const monthDate = dayjs().year(year).month(month).startOf('month');
    const startWeekDay = monthDate.isoWeekday();
    const endWeekDay = monthDate.endOf('month').isoWeekday();
    const daysInMonth = monthDate.daysInMonth();
    const firstWeekNrOfMonth = monthDate.isoWeek();
    const nrOfWeeks = Math.ceil((daysInMonth + (startWeekDay - 1) + (7 - endWeekDay)) / 7);

    const nrOfColumns = showWeekNumbers ? 8 : 7;

    // Precompute weekday headers
    const weekdayHeaders = Array.from({ length: 7 }, (_, i) => monthDate.isoWeekday(i + 1).format('dd'));

    // Precompute all week rows
    const weeks = useMemo(() => {
        const weekRows: React.ReactNode[][] = [];
        let childIndex = 0;

        for (let week = 0; week < nrOfWeeks; week++) {
            const row: React.ReactNode[] = [];
            if (showWeekNumbers) {
                row.push(
                    <div key={`weeknr-${week}`} className={styles.weeknr}>
                        {firstWeekNrOfMonth + week}
                    </div>,
                );
            }

            for (let day = 0; day < 7; day++) {
                const cellIndex = week * 7 + day;
                const isBeforeMonth = week === 0 && day < startWeekDay - 1;
                const isAfterMonth = week === nrOfWeeks - 1 && day >= 7 - (7 - endWeekDay);

                if (isBeforeMonth || isAfterMonth) {
                    row.push(<div key={`empty-${cellIndex}`} />);
                } else {
                    row.push(children[childIndex++] || <div key={`empty-${cellIndex}`} />);
                }
            }

            weekRows.push(row);
        }

        return weekRows;
    }, [children, nrOfWeeks, showWeekNumbers, startWeekDay, endWeekDay, firstWeekNrOfMonth]);

    return (
        <Box.New
            borderWidth="1"
            width="300px"
            padding="5"
            borderRadius="4"
            borderColor="neutral-subtle"
            data-testid={`year:${year};month:${month}`}
            aria-hidden
        >
            <VStack gap="space-12">
                <Heading size="small" level={headerLevel} align="center">
                    {`${monthDate.format('MMMM')} ${year}`}
                </Heading>

                <div>
                    <HGrid columns={nrOfColumns}>
                        {showWeekNumbers && <div className={styles.weeknr} />}
                        {weekdayHeaders.map((dayLabel) => (
                            <div key={dayLabel} className={styles.weekday}>
                                {dayLabel}
                            </div>
                        ))}
                    </HGrid>

                    {weeks.map((weekRow, i) => (
                        <HGrid key={`week-${i}`} columns={nrOfColumns}>
                            {weekRow}
                        </HGrid>
                    ))}
                </div>
            </VStack>
        </Box.New>
    );
};
