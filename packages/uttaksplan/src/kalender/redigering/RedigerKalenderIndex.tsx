import { useEffect, useState } from 'react';

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

    useEffect(() => {
        // Reset redigeringmodus hvis alle perioder fjernes
        if (sammenslåtteValgtePerioder.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setErIRedigeringsmodus(false);
        }
    }, [sammenslåtteValgtePerioder]);

    return (
        <Box
            borderWidth="1"
            borderRadius="4"
            borderColor="neutral-subtle"
            height="fit-content"
            maxHeight={erIRedigeringsmodus ? '100vh' : 'none'}
            overflow={erIRedigeringsmodus ? 'auto' : 'hidden'}
            background="default"
        >
            {sammenslåtteValgtePerioder.length === 0 && (
                <IngenDagerValgtPanel scrollToKvoteOppsummering={scrollToKvoteOppsummering} labels={labels} />
            )}
            {sammenslåtteValgtePerioder.length > 0 && (
                <DagerValgtPanel
                    labels={labels}
                    erIRedigeringsmodus={erIRedigeringsmodus}
                    setErIRedigeringsmodus={setErIRedigeringsmodus}
                />
            )}
        </Box>
    );
};
