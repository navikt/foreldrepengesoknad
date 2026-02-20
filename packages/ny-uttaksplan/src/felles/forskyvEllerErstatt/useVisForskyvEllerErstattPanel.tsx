import dayjs from 'dayjs';
import { useState } from 'react';

type Periode = {
    fom: string;
    tom: string;
};

export const useVisForskyvEllerErstattPanel = (valgtePerioder: Periode[]) => {
    const [åpnedeValgtePerioder, setÅpnedeValgtePerioder] = useState<typeof valgtePerioder | null>(null);

    const visEndreEllerForskyvPanel =
        åpnedeValgtePerioder !== null && erLikePerioder(åpnedeValgtePerioder, valgtePerioder);

    return {
        visEndreEllerForskyvPanel,
        setVisEndreEllerForskyvPanel: (skalVisPanel: boolean) =>
            setÅpnedeValgtePerioder(skalVisPanel ? valgtePerioder : null),
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
