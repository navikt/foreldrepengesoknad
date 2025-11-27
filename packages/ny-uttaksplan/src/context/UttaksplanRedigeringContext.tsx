import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

type Props = {
    oppdaterUttaksplan: (uttaksplan: UttakPeriode_fpoversikt[] | undefined) => void;
    children: React.ReactNode;
};

type ContextValues = {
    oppdaterUttaksplan: (uttaksplan: UttakPeriode_fpoversikt[]) => void;
    angreSisteEndring: () => void;
    tilbakestillUttaksplan: () => void;
    fjernAltIUttaksplan: () => void;
    visFjernAltModal: boolean;
    setVisFjernAltModal: (open: boolean) => void;
    uttaksplanVersjoner: UttakPeriode_fpoversikt[][];
};

const UttaksplanRedigeringContext = createContext<ContextValues | null>(null);

export const UttaksplanRedigeringProvider = (props: Props) => {
    const { oppdaterUttaksplan: oppdater, children } = props;
    const [visFjernAltModal, setVisFjernAltModal] = useState(false);

    const [uttaksplanVersjoner, setUttaksplanVersjoner] = useState<UttakPeriode_fpoversikt[][]>([]);

    const oppdaterUttaksplan = useCallback(
        (nyUttaksplan: UttakPeriode_fpoversikt[]) => {
            setUttaksplanVersjoner((eksisterendeVersjoner) => [...eksisterendeVersjoner, nyUttaksplan]);
            oppdater(nyUttaksplan);
        },
        [oppdater],
    );

    const angreSisteEndring = useCallback(() => {
        setUttaksplanVersjoner((eksisterendeVersjoner) => {
            if (eksisterendeVersjoner.length === 0) {
                return eksisterendeVersjoner;
            }
            const nyeVersjoner = eksisterendeVersjoner.slice(0, -1);

            oppdater(nyeVersjoner.at(-1));

            return nyeVersjoner;
        });
    }, [oppdater]);

    const tilbakestillUttaksplan = useCallback(() => {
        setUttaksplanVersjoner([]);
        oppdater(undefined);
    }, [setUttaksplanVersjoner, oppdater]);

    const fjernAltIUttaksplan = useCallback(() => {
        setUttaksplanVersjoner([]);
        oppdater([]);
    }, [oppdater, setUttaksplanVersjoner]);

    const value = useMemo(
        () => ({
            visFjernAltModal,
            uttaksplanVersjoner,
            oppdaterUttaksplan,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
            setVisFjernAltModal,
        }),
        [
            visFjernAltModal,
            uttaksplanVersjoner,
            oppdaterUttaksplan,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
            setVisFjernAltModal,
        ],
    );

    return <UttaksplanRedigeringContext.Provider value={value}>{children}</UttaksplanRedigeringContext.Provider>;
};

export const useUttaksplanRedigering = () => {
    return useContext(UttaksplanRedigeringContext);
};
