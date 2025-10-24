import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

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
    const endWeekday = monthDate.endOf('month').isoWeekday();
    const totalDays = monthDate.daysInMonth() + (startWeekDay - 1) + (7 - endWeekday);

    const nrOfWeeks = [...new Array(totalDays / 7).keys()];
    const firstWeekNrOfMonth = monthDate.isoWeek();

    let arrayCounter = 0;

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
