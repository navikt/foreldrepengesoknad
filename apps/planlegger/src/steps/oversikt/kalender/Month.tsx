import dayjs from 'dayjs';

import { Box, HGrid, Heading } from '@navikt/ds-react';

import styles from './month.module.css';

type Props = {
    year: number;
    month: number;
    children: React.ReactNode[];
};

const Month: React.FunctionComponent<Props> = ({ year, month, children }) => {
    const monthDate = dayjs().year(year).month(month).startOf('month');
    const monthName = monthDate.format('MMMM');
    const monthNameUppercase = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    const startWeekDay = monthDate.isoWeekday();
    const endWeekday = monthDate.endOf('month').isoWeekday();
    const totalDays = monthDate.daysInMonth() + (startWeekDay - 1) + (7 - endWeekday);

    const nrOfWeeks = [...Array(totalDays / 7).keys()];

    let arrayCounter = 0;

    return (
        <Box className={styles.box}>
            <Heading size="small">{monthNameUppercase}</Heading>
            {nrOfWeeks.map((weeknr) => (
                <HGrid key={weeknr} columns={7}>
                    {[...Array(7).keys()].map((dag) => {
                        if (weeknr === 0 && dag < startWeekDay - 1) {
                            return <div key={dag} />;
                        }
                        if (weeknr + 1 === nrOfWeeks.length && dag >= endWeekday) {
                            return <div key={dag} />;
                        }
                        return <div key={dag}>{children[arrayCounter++]}</div>;
                    })}
                </HGrid>
            ))}
        </Box>
    );
};
export default Month;
