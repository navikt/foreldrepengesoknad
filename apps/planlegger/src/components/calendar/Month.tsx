import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { Box, HGrid, Heading } from '@navikt/ds-react';

import styles from './month.module.css';

dayjs.extend(isoWeek);

type Props = {
    year: number;
    month: number;
    showYear: boolean;
    children: React.ReactNode[];
};

const Month: React.FunctionComponent<Props> = ({ year, month, showYear, children }) => {
    const monthDate = dayjs().year(year).month(month).startOf('month');
    const monthName = monthDate.format('MMM');
    const monthNameUppercase = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const startWeekDay = monthDate.isoWeekday();
    const endWeekday = monthDate.endOf('month').isoWeekday();
    const totalDays = monthDate.daysInMonth() + (startWeekDay - 1) + (7 - endWeekday);

    const nrOfWeeks = [...Array(totalDays / 7).keys()];

    let arrayCounter = 0;

    return (
        <Box className={styles.box}>
            <Heading size="small">{showYear ? `${monthNameUppercase} (${year})` : monthNameUppercase}</Heading>
            {nrOfWeeks.map((weeknr) => (
                <HGrid key={weeknr} columns={7}>
                    {[...Array(7).keys()].map((day) => {
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
export default Month;
