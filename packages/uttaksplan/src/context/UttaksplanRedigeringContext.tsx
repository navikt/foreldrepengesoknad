import { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { captureException } from '@navikt/fp-observability';
import { UttakPeriodeDto } from '@navikt/fp-types';

import { finnUgyldigeOverlapp, periodeTilLoggObjekt } from '../utils/UttakPeriodeBuilder';
import {
    Datointervall,
    HistoriskEndringstype,
    finnHistoriskEndringstype,
    harHistoriskSletting,
} from '../utils/historiskEndring';
import { useUttaksplanData } from './UttaksplanDataContext';

export type HistoriskEndring = {
    type: HistoriskEndringstype;
    utfør: () => void;
};

type Props = {
    harEndretPlan: boolean;
    oppdaterUttaksplan: (uttaksplan: UttakPeriodeDto[] | undefined) => void;
    children: React.ReactNode;
};

type ContextValues = {
    uttaksplanVersjoner: UttakPeriodeDto[][];
    visFjernAltModal: boolean;
    visTilbakestillModal: boolean;
    visHistoriskEndringModal: boolean;
    historiskEndring: HistoriskEndring | undefined;
    harEndretPlan: boolean;
    setVisFjernAltModal: (open: boolean) => void;
    setVisTilbakestillModal: (open: boolean) => void;
    setVisHistoriskEndringModal: (open: boolean) => void;
    nullstillHistoriskEndring: () => void;
    angreSisteEndring: () => void;
    fjernAltIUttaksplan: () => void;
    oppdaterUttaksplan: (uttaksplan: UttakPeriodeDto[]) => void;
    endreUttaksplanMedVarsel: (nyePerioder: UttakPeriodeDto[], etterEndring?: () => void) => void;
    slettFraUttaksplanMedVarsel: (
        perioderSomSlettes: Datointervall[],
        nyePerioder: UttakPeriodeDto[],
        etterEndring?: () => void,
    ) => void;
    tilbakestillUttaksplan: () => void;
};

const UttaksplanRedigeringContext = createContext<ContextValues | null>(null);

export const UttaksplanRedigeringProvider = (props: Props) => {
    const { oppdaterUttaksplan: oppdater, harEndretPlan, children } = props;
    const [visFjernAltModal, setVisFjernAltModal] = useState(false);
    const [visTilbakestillModal, setVisTilbakestillModal] = useState(false);
    const [historiskEndring, setHistoriskEndring] = useState<HistoriskEndring>();
    const [visHistoriskEndringModal, setVisHistoriskEndringModal] = useState(false);

    const {
        perioder,
        erEndringssøknad,
        foreldreInfo: { søker },
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const harLoggetInitielleOverlappRef = useRef(false);
    useEffect(() => {
        if (harLoggetInitielleOverlappRef.current) {
            return;
        }
        harLoggetInitielleOverlappRef.current = true;

        const ugyldigeOverlapp = finnUgyldigeOverlapp(perioder);
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
                opprinneligPerioder: perioder.map(periodeTilLoggObjekt),
            },
        });
    }, [perioder]);

    const [uttaksplanVersjoner, setUttaksplanVersjoner] = useState<UttakPeriodeDto[][]>([]);

    const oppdaterUttaksplan = useCallback(
        (nyUttaksplan: UttakPeriodeDto[]) => {
            setUttaksplanVersjoner((eksisterendeVersjoner) => [...eksisterendeVersjoner, nyUttaksplan]);
            oppdater(nyUttaksplan);
        },
        [oppdater],
    );

    const oppdaterEllerBekreft = useCallback(
        (type: HistoriskEndringstype | undefined, nyePerioder: UttakPeriodeDto[], etterEndring?: () => void) => {
            const utfør = () => {
                oppdaterUttaksplan(nyePerioder);
                etterEndring?.();
            };

            if (erEndringssøknad && type) {
                setHistoriskEndring({ type, utfør });
                setVisHistoriskEndringModal(true);
            } else {
                utfør();
            }
        },
        [erEndringssøknad, oppdaterUttaksplan],
    );

    const endreUttaksplanMedVarsel = useCallback(
        (nyePerioder: UttakPeriodeDto[], etterEndring?: () => void) =>
            oppdaterEllerBekreft(
                finnHistoriskEndringstype(perioder, nyePerioder, søker, kanVelgeArbeidsgiver),
                nyePerioder,
                etterEndring,
            ),
        [perioder, søker, kanVelgeArbeidsgiver, oppdaterEllerBekreft],
    );

    const slettFraUttaksplanMedVarsel = useCallback(
        (perioderSomSlettes: Datointervall[], nyePerioder: UttakPeriodeDto[], etterEndring?: () => void) =>
            oppdaterEllerBekreft(
                harHistoriskSletting(perioder, perioderSomSlettes) ? 'slettet' : undefined,
                nyePerioder,
                etterEndring,
            ),
        [perioder, oppdaterEllerBekreft],
    );

    const angreSisteEndring = useCallback(() => {
        if (uttaksplanVersjoner.length === 0) {
            return;
        }
        const nyeVersjoner = uttaksplanVersjoner.slice(0, -1);
        setUttaksplanVersjoner(nyeVersjoner);
        oppdater(nyeVersjoner.at(-1));
    }, [oppdater, uttaksplanVersjoner]);

    const tilbakestillUttaksplan = useCallback(() => {
        setUttaksplanVersjoner([]);
        oppdater(undefined);
    }, [oppdater]);

    const fjernAltIUttaksplan = useCallback(() => {
        setUttaksplanVersjoner([]);
        // Behold kun EØS-sida av kvar periode (søker/annenPart sitt uttak fjernes).
        const kunEøsPerioder = perioder
            .filter((periode) => periode.annenPartEøs !== undefined)
            .map((periode): UttakPeriodeDto => ({
                fom: periode.fom,
                tom: periode.tom,
                annenPartEøs: periode.annenPartEøs,
            }));
        oppdater(kunEøsPerioder);
    }, [oppdater, perioder]);

    const nullstillHistoriskEndring = useCallback(() => setHistoriskEndring(undefined), []);

    const value = useMemo(
        () => ({
            visFjernAltModal,
            visTilbakestillModal,
            visHistoriskEndringModal,
            historiskEndring,
            uttaksplanVersjoner,
            harEndretPlan,
            oppdaterUttaksplan,
            endreUttaksplanMedVarsel,
            slettFraUttaksplanMedVarsel,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
            setVisFjernAltModal,
            setVisTilbakestillModal,
            setVisHistoriskEndringModal,
            nullstillHistoriskEndring,
        }),
        [
            visFjernAltModal,
            visTilbakestillModal,
            visHistoriskEndringModal,
            historiskEndring,
            uttaksplanVersjoner,
            harEndretPlan,
            oppdaterUttaksplan,
            endreUttaksplanMedVarsel,
            slettFraUttaksplanMedVarsel,
            angreSisteEndring,
            tilbakestillUttaksplan,
            fjernAltIUttaksplan,
            nullstillHistoriskEndring,
        ],
    );

    return <UttaksplanRedigeringContext value={value}>{children}</UttaksplanRedigeringContext>;
};

export const useUttaksplanRedigering = () => {
    return use(UttaksplanRedigeringContext);
};
