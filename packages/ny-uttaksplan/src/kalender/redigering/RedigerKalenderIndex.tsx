import { useEffect, useState } from 'react';

import { Box } from '@navikt/ds-react';

import { CalendarPeriod } from '@navikt/fp-ui';

import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { LeggTilEllerEndrePeriodePanel } from './LeggTilEllerEndrePeriodePanel';
import { PeriodeIkkeValgtPanel } from './PeriodeIkkeValgtPanel';
import { PeriodeOversiktPanel } from './PeriodeOversiktPanel';
import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { harEnValgtPeriodeIKunEnEksisterendePeriode } from './utils/kalenderPeriodeUtils';

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

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    useEffect(() => {
        // Reset redigeringmodus hvis alle perioder fjernes
        if (sammenslåtteValgtePerioder.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setErIRedigeringsmodus(false);
        }
    }, [sammenslåtteValgtePerioder]);

    const erKunEnHelEksisterendePeriodeValgt =
        sammenslåtteValgtePerioder.length === 1 &&
        harEnValgtPeriodeIKunEnEksisterendePeriode(uttakPerioderInkludertTapteDager, sammenslåtteValgtePerioder[0]!);

    return (
        <Box.New
            borderWidth="1"
            borderRadius="4"
            borderColor="neutral-subtle"
            height="fit-content"
            maxHeight={erIRedigeringsmodus ? '100vh' : 'none'}
            overflow={erIRedigeringsmodus ? 'auto' : 'hidden'}
            background="default"
        >
            {sammenslåtteValgtePerioder.length === 0 && (
                <PeriodeIkkeValgtPanel scrollToKvoteOppsummering={scrollToKvoteOppsummering} labels={labels} />
            )}
            {sammenslåtteValgtePerioder.length > 0 && (
                <>
                    {erIRedigeringsmodus && (
                        <LeggTilEllerEndrePeriodePanel
                            key={erKunEnHelEksisterendePeriodeValgt ? 1 : 0} // Reset av form når en går fra endre til legg til og omvendt
                            lukkRedigeringsmodus={() => setErIRedigeringsmodus(false)}
                            labels={labels}
                        />
                    )}
                    {!erIRedigeringsmodus && (
                        <PeriodeOversiktPanel
                            åpneRedigeringsmodus={() => setErIRedigeringsmodus(true)}
                            labels={labels}
                        />
                    )}
                </>
            )}
        </Box.New>
    );
};
