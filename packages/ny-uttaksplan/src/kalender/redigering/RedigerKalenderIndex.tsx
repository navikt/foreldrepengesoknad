import { useEffect, useState } from 'react';

import { Box } from '@navikt/ds-react';

import { CalendarPeriod } from '@navikt/fp-ui';

import { LeggTilEllerEndrePeriodePanel } from './LeggTilEllerEndrePeriodePanel';
import { PeriodeIkkeValgtPanel } from './PeriodeIkkeValgtPanel';
import { PeriodeOversiktPanel } from './PeriodeOversiktPanel';
import { KalenderRedigeringProvider, useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

type Props = {
    valgtePerioder: CalendarPeriod[];
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
};

export const RedigerKalenderIndex = (props: Props) => (
    <KalenderRedigeringProvider {...props}>
        <RedigerKalender />
    </KalenderRedigeringProvider>
);

const RedigerKalender = () => {
    const { erKunEnHelEksisterendePeriodeValgt, sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [erIRedigeringsmodus, setErIRedigeringsmodus] = useState(false);

    useEffect(() => {
        // Reset redigeringmodus hvis alle perioder fjernes
        if (sammenslåtteValgtePerioder.length === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setErIRedigeringsmodus(false);
        }
    }, [sammenslåtteValgtePerioder]);

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
            {sammenslåtteValgtePerioder.length === 0 && <PeriodeIkkeValgtPanel />}
            {sammenslåtteValgtePerioder.length > 0 && (
                <>
                    {erIRedigeringsmodus && (
                        <LeggTilEllerEndrePeriodePanel
                            key={erKunEnHelEksisterendePeriodeValgt ? 1 : 0} // Reset av form når en går fra endre til legg til og omvendt
                            lukkRedigeringsmodus={() => setErIRedigeringsmodus(false)}
                        />
                    )}
                    {!erIRedigeringsmodus && (
                        <PeriodeOversiktPanel åpneRedigeringsmodus={() => setErIRedigeringsmodus(true)} />
                    )}
                </>
            )}
        </Box.New>
    );
};
