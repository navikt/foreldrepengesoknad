import { useState } from 'react';

import { useKalenderRedigeringContext } from '../../kalender/redigering/context/KalenderRedigeringContext';

export const useVisForskyvEllerErstattPanel = () => {
    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const [åpnedeValgtePerioder, setÅpnedeValgtePerioder] = useState<typeof sammenslåtteValgtePerioder | null>(null);

    const visEndreEllerForskyvPanel = åpnedeValgtePerioder === sammenslåtteValgtePerioder;

    return {
        visEndreEllerForskyvPanel,
        setVisEndreEllerForskyvPanel: (skalVisPanel: boolean) =>
            setÅpnedeValgtePerioder(skalVisPanel ? sammenslåtteValgtePerioder : null),
    };
};
