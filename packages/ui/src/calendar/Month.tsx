import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { Box, HGrid, Heading } from '@navikt/ds-react';

import styles from './month.module.css';

dayjs.extend(isoWeek);

const getMonthName = (monthDate: Dayjs, template: string = 'MMMM') => {
    const monthName = monthDate.format(template);
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};

type Props = {
    year: number;
    month: number;
    showYear: boolean;
    children: React.ReactNode[];
    headerLevel: '4' | '5';
    showWeekNumbers: boolean;
};

export const Month = ({ year, month, showYear, children, headerLevel, showWeekNumbers }: Props) => {
    const monthDate = dayjs().year(year).month(month).startOf('month');

    const startWeekDay = monthDate.isoWeekday();
    const endWeekday = monthDate.endOf('month').isoWeekday();
    const totalDays = monthDate.daysInMonth() + (startWeekDay - 1) + (7 - endWeekday);

    const nrOfWeeks = [...Array(totalDays / 7).keys()];
    const firstWeekNrOfMonth = monthDate.isoWeek();

    let arrayCounter = 0;

    const nrOfColumns = showWeekNumbers ? 8 : 7;

    return (
        <Box className={styles.box} data-testid={`year:${year};month:${month}`} aria-hidden>
            <Heading size="small" level={headerLevel}>
                {showYear ? `${getMonthName(monthDate, 'MMM')} (${year})` : getMonthName(monthDate)}
            </Heading>
            {nrOfWeeks.map((weeknr) => (
                <HGrid key={weeknr} columns={nrOfColumns}>
                    {[...Array(nrOfColumns).keys()].map((index) => {
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
        </Box>
    );
};
