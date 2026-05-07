import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { captureMessage, withScope } from '@navikt/fp-observability';
import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { erEøsUttakPeriode } from '../types/UttaksplanPeriode';
import { finnUgyldigeOverlapp, periodeTilLoggObjekt } from '../utils/UttakPeriodeBuilder';
import { useUttaksplanData } from './UttaksplanDataContext';

type AlleUttakPerioder = UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt;

type Props = {
    harEndretPlan: boolean;
    oppdaterUttaksplan: (uttaksplan: AlleUttakPerioder[] | undefined) => void;
    children: React.ReactNode;
};

type ContextValues = {
    uttaksplanVersjoner: AlleUttakPerioder[][];
    visFjernAltModal: boolean;
    harEndretPlan: boolean;
    setVisFjernAltModal: (open: boolean) => void;
    angreSisteEndring: () => void;
    fjernAltIUttaksplan: () => void;
    oppdaterUttaksplan: (uttaksplan: AlleUttakPerioder[]) => void;
    tilbakestillUttaksplan: () => void;
};

const UttaksplanRedigeringContext = createContext<ContextValues | null>(null);

export const UttaksplanRedigeringProvider = (props: Props) => {
    const { oppdaterUttaksplan: oppdater, harEndretPlan, children } = props;
    const [visFjernAltModal, setVisFjernAltModal] = useState(false);

    const { uttakPerioder, erEndringssøknad } = useUttaksplanData();

    const harLoggetInitielleOverlapp = useRef(false);
    useEffect(() => {
        if (harLoggetInitielleOverlapp.current) {
            return;
        }
        harLoggetInitielleOverlapp.current = true;

        const ugyldigeOverlapp = finnUgyldigeOverlapp(uttakPerioder);
        if (ugyldigeOverlapp.length === 0) {
            return;
        }

        withScope((scope) => {
            scope.setLevel('warning');
            scope.setTag('feiltype', 'uttaksplan-initielle-overlapp');
            scope.setExtra('erEndringssøknad', erEndringssøknad);
            scope.setExtra('antallUgyldigeOverlapp', ugyldigeOverlapp.length);
            scope.setExtra(
                'ugyldigeOverlappPar',
                ugyldigeOverlapp.slice(0, 20).map(([a, b]) => ({
                    a: periodeTilLoggObjekt(a),
                    b: periodeTilLoggObjekt(b),
                })),
            );
            scope.setExtra('opprinneligPerioder', uttakPerioder.map(periodeTilLoggObjekt));
            captureMessage('Uttaksplan har ugyldig overlappende perioder før redigering startet', 'warning');
        });
    }, [uttakPerioder]);

    const [uttaksplanVersjoner, setUttaksplanVersjoner] = useState<AlleUttakPerioder[][]>([]);

    const oppdaterUttaksplan = useCallback(
        (nyUttaksplan: AlleUttakPerioder[]) => {
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
    }, [oppdater]);

    const fjernAltIUttaksplan = useCallback(() => {
        setUttaksplanVersjoner([]);
        oppdater(uttakPerioder.filter((periode) => erEøsUttakPeriode(periode)));
    }, [oppdater, uttakPerioder]);

    const value = useMemo(
        () => ({
            visFjernAltModal,
            uttaksplanVersjoner,
            harEndretPlan,
            oppdaterUttaksplan,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
            setVisFjernAltModal,
        }),
        [
            visFjernAltModal,
            uttaksplanVersjoner,
            harEndretPlan,
            oppdaterUttaksplan,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
        ],
    );

    return <UttaksplanRedigeringContext.Provider value={value}>{children}</UttaksplanRedigeringContext.Provider>;
};

export const useUttaksplanRedigering = () => {
    return useContext(UttaksplanRedigeringContext);
};
