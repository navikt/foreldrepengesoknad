import { useState } from 'react';

import { Box } from '@navikt/ds-react';

import { CalendarPeriod } from '@navikt/fp-ui';

import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { DagerValgtPanel } from './paneler/DagerValgtPanel';
import { IngenDagerValgtPanel } from './paneler/IngenDagerValgtPanel';

type Props = {
    valgtePerioder: CalendarPeriod[];
    labels: React.ReactNode;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setEndredePerioder: React.Dispatch<React.SetStateAction<Array<{ fom: string; tom: string }>>>;
    scrollToKvoteOppsummering: () => void;
};

export const RedigerKalenderIndex = ({
    valgtePerioder,
    labels,
    setValgtePerioder,
    setEndredePerioder,
    scrollToKvoteOppsummering,
}: Props) => (
    <KalenderRedigeringProvider
        valgtePerioder={valgtePerioder}
        setValgtePerioder={setValgtePerioder}
        setEndredePerioder={setEndredePerioder}
    >
        <RedigerKalender scrollToKvoteOppsummering={scrollToKvoteOppsummering} labels={labels} />
    </KalenderRedigeringProvider>
);

const RedigerKalender = ({
    scrollToKvoteOppsummering,
    labels,
}: {
    scrollToKvoteOppsummering: () => void;
    labels: React.ReactNode;
}) => {
    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);

    const harValgtePerioderOgErIRedigeringsmodus = sammenslåtteValgtePerioder.length > 0 && erIRedigeringsmodus;

    return (
        <Box
            borderWidth="1"
            borderRadius="4"
            borderColor="neutral-subtle"
            height="fit-content"
            maxHeight={harValgtePerioderOgErIRedigeringsmodus ? '100vh' : 'none'}
            overflow={harValgtePerioderOgErIRedigeringsmodus ? 'auto' : 'hidden'}
            background="default"
        >
            {sammenslåtteValgtePerioder.length === 0 && (
                <IngenDagerValgtPanel scrollToKvoteOppsummering={scrollToKvoteOppsummering} labels={labels} />
            )}
            {sammenslåtteValgtePerioder.length > 0 && (
                <DagerValgtPanel
                    labels={labels}
                    erIRedigeringsmodus={harValgtePerioderOgErIRedigeringsmodus}
                    setErIRedigeringsmodus={setErIRedigeringsmodus}
                />
            )}
        </Box>
    );
};
