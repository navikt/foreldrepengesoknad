import { useState } from 'react';

import { useKalenderRedigeringContext } from '../../kalender/redigering/context/KalenderRedigeringContext';

export const useVisForskyvEllerErstattPanel = () => {
    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [openedFor, setOpenedFor] = useState<typeof sammenslåtteValgtePerioder | null>(null);

    const visEndreEllerForskyvPanel = openedFor === sammenslåtteValgtePerioder;

    return {
        visEndreEllerForskyvPanel,
        setVisEndreEllerForskyvPanel: (skalVisPanel: boolean) =>
            setOpenedFor(skalVisPanel ? sammenslåtteValgtePerioder : null),
    };
};
