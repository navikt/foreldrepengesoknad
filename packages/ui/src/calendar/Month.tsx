import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, { useMemo } from 'react';

import { Box, HGrid, Heading, VStack } from '@navikt/ds-react';

import { formatDateIso } from '@navikt/fp-utils';

import { Day, isWeekend, logOnLocalhost } from './Day';
import styles from './month.module.css';
import { CalendarPeriod } from './types/CalendarPeriod';
import { CalendarPeriodColor } from './types/CalendarPeriodColor';

dayjs.extend(isoWeek);

type Props = {
    year: number;
    month: number;
    children: React.ReactNode[];
    headerLevel: '4' | '5';
    showWeekNumbers: boolean;
    periods: CalendarPeriod[];
    focusedDate: Dayjs | undefined;
    dateTooltipCallback?: (date: string) => React.ReactElement | string;
    dateClickCallback?: (date: string) => void;
    setFocusedDate: (date: Dayjs) => void;
};

export const Month = ({ year, month, children, headerLevel, showWeekNumbers }: Props) => {
    const monthDate = dayjs().year(year).month(month).startOf('month');

    const periodMap = useMemo(() => buildPeriodMap(periods), [periods]);

    const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
    const daysInMonth = firstDayOfMonth.daysInMonth();
    const startWeekDay = firstDayOfMonth.isoWeekday();
    const endWeekDay = firstDayOfMonth.endOf('month').isoWeekday();
    const firstWeekNrOfMonth = firstDayOfMonth.isoWeek();

    const nrOfWeeks = Math.ceil((daysInMonth + (startWeekDay - 1) + (7 - endWeekDay)) / 7);

    const nrOfColumns = showWeekNumbers ? 8 : 7;

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
                        {[...new Array(nrOfColumns).keys()].map((index) => {
                            if (showWeekNumbers && index === 0) {
                                return <div key={8} className={styles.weeknr}></div>;
                            }

                            return (
                                <div key={index} className={styles.weekday}>
                                    {dayjs()
                                        .isoWeekday(showWeekNumbers ? index : index + 1)
                                        .format('dd')}
                                </div>
                            );
                        })}
                    </HGrid>
                    {nrOfWeeks.map((weeknr) => (
                        <HGrid key={weeknr} columns={nrOfColumns}>
                            {[...new Array(nrOfColumns).keys()].map((index) => {
                                if (showWeekNumbers && index === 0) {
                                    return (
                                        <div key={8} className={styles.weeknr}>
                                            {firstWeekNrOfMonth + weeknr}
                                        </div>
                                    );
                                }

                                const day = showWeekNumbers ? index - 1 : index;
                                if (weeknr === 0 && day < startWeekDay - 1) {
                                    return <div key={day} />;
                                }
                                if (weeknr + 1 === nrOfWeeks.length && day >= endWeekday) {
                                    return <div key={day} />;
                                }
                                return children[arrayCounter++];
                            })}
                        </HGrid>
                    ))}
                </div>
            </VStack>
        </Box.New>
    );
};
