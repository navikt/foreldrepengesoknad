import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { captureException } from '@navikt/fp-observability';
import { PeriodeDto_fpoversikt } from '@navikt/fp-types';

import { finnUgyldigeOverlapp, periodeTilLoggObjekt } from '../utils/UttakPeriodeBuilder';
import { useUttaksplanData } from './UttaksplanDataContext';

type Props = {
    harEndretPlan: boolean;
    oppdaterUttaksplan: (uttaksplan: PeriodeDto_fpoversikt[] | undefined) => void;
    children: React.ReactNode;
};

type ContextValues = {
    uttaksplanVersjoner: PeriodeDto_fpoversikt[][];
    visFjernAltModal: boolean;
    visTilbakestillModal: boolean;
    harEndretPlan: boolean;
    setVisFjernAltModal: (open: boolean) => void;
    setVisTilbakestillModal: (open: boolean) => void;
    angreSisteEndring: () => void;
    fjernAltIUttaksplan: () => void;
    oppdaterUttaksplan: (uttaksplan: PeriodeDto_fpoversikt[]) => void;
    tilbakestillUttaksplan: () => void;
};

const UttaksplanRedigeringContext = createContext<ContextValues | null>(null);

export const UttaksplanRedigeringProvider = (props: Props) => {
    const { oppdaterUttaksplan: oppdater, harEndretPlan, children } = props;
    const [visFjernAltModal, setVisFjernAltModal] = useState(false);
    const [visTilbakestillModal, setVisTilbakestillModal] = useState(false);

    const { perioder: uttakPerioder, erEndringssøknad } = useUttaksplanData();

    const harLoggetInitielleOverlappRef = useRef(false);
    useEffect(() => {
        if (harLoggetInitielleOverlappRef.current) {
            return;
        }
        harLoggetInitielleOverlappRef.current = true;

        const ugyldigeOverlapp = finnUgyldigeOverlapp(uttakPerioder);
        if (ugyldigeOverlapp.length === 0) {
            return;
        }

        captureException(new Error('Uttaksplan har ugyldig overlappende perioder før redigering startet'), {
            context: {
                feiltype: 'uttaksplan-initielle-overlapp',
                erEndringssøknad,
                antallUgyldigeOverlapp: ugyldigeOverlapp.length,
                ugyldigeOverlappPar: ugyldigeOverlapp.slice(0, 20).map(([a, b]) => ({
                    a: periodeTilLoggObjekt(a),
                    b: periodeTilLoggObjekt(b),
                })),
                opprinneligPerioder: uttakPerioder.map(periodeTilLoggObjekt),
            },
        });
    }, [uttakPerioder]);

    const [uttaksplanVersjoner, setUttaksplanVersjoner] = useState<PeriodeDto_fpoversikt[][]>([]);

    const oppdaterUttaksplan = useCallback(
        (nyUttaksplan: PeriodeDto_fpoversikt[]) => {
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
        // Behold kun EØS-sida av kvar periode (søker/annenPart sitt uttak fjernes).
        const kunEøsPerioder = uttakPerioder
            .filter((periode) => periode.annenPartEøs !== undefined)
            .map((periode): PeriodeDto_fpoversikt => ({ fom: periode.fom, tom: periode.tom, annenPartEøs: periode.annenPartEøs }));
        oppdater(kunEøsPerioder);
    }, [oppdater, uttakPerioder]);

    const value = useMemo(
        () => ({
            visFjernAltModal,
            visTilbakestillModal,
            uttaksplanVersjoner,
            harEndretPlan,
            oppdaterUttaksplan,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
            setVisFjernAltModal,
            setVisTilbakestillModal,
        }),
        [
            visFjernAltModal,
            visTilbakestillModal,
            uttaksplanVersjoner,
            harEndretPlan,
            oppdaterUttaksplan,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
        ],
    );

    return <UttaksplanRedigeringContext value={value}>{children}</UttaksplanRedigeringContext>;
};

export const useUttaksplanRedigering = () => {
    return use(UttaksplanRedigeringContext);
};
