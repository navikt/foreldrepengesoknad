import dayjs from 'dayjs';
import { useState } from 'react';

type Periode = {
    fom: string;
    tom: string;
};

export const useVisUtsettelsePanel = (valgtePerioder: Periode[]) => {
    const [lagretPerioder, setLagretPerioder] = useState<Periode[] | null>(null);

    const visUtsettelsePanel = lagretPerioder !== null && erLikePerioder(lagretPerioder, valgtePerioder);

    return {
        visUtsettelsePanel,
        setVisUtsettelsePanel: (skalVisPanel: boolean) => setLagretPerioder(skalVisPanel ? valgtePerioder : null),
    };
};

const erLikePerioder = (periode1: Periode[], periode2: Periode[]): boolean => {
    if (periode1.length !== periode2.length) {
        return false;
    }

    return !periode1.some((periodeA, index) => {
        const periodeB = periode2[index];

        if (!periodeB) {
            return true;
        }

        return !(dayjs(periodeA.fom).isSame(periodeB.fom, 'day') && dayjs(periodeA.tom).isSame(periodeB.tom, 'day'));
    });
};
