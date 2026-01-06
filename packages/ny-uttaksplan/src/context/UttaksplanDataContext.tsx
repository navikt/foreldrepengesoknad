import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    Barn,
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    KontoBeregningDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

import { ForeldreInfo } from '../types/ForeldreInfo';
import { PeriodeHullType, Planperiode } from '../types/Planperiode';
import { UttaksplanHull, Uttaksplanperiode } from '../types/UttaksplanPeriode';
import { utledKomplettPlan } from '../utils/periodeUtils';

type Props = {
    barn: Barn;
    foreldreInfo: ForeldreInfo;
    valgtStønadskonto: KontoBeregningDto;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    saksperioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    children: React.ReactNode;
};

type ContextValues = Omit<Props, 'children'> & {
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    uttaksplan: Planperiode[];
    saksperioderInkludertHull: Uttaksplanperiode[];
};

const UttaksplanDataContext = createContext<ContextValues | null>(null);

export const UttaksplanDataProvider = (props: Props) => {
    const { children, ...otherProps } = props;

    const value = useMemo(() => {
        const familiehendelsedato = getFamiliehendelsedato(otherProps.barn);
        const familiesituasjon = getFamiliesituasjon(otherProps.barn);
        const søkersPerioder = getSøkersPerioder(otherProps.foreldreInfo, otherProps.saksperioder);
        const annenPartsPerioder = getAnnenpartsPerioder(otherProps.foreldreInfo, otherProps.saksperioder);

        const sortertePerioder = [...otherProps.saksperioder].sort(sorterPerioder);

        return {
            ...otherProps,
            familiehendelsedato,
            familiesituasjon,
            saksperioder: sortertePerioder,
            // TODO (TOR) Denne bør ikkje utledes her sidan det truleg er forskjellar i type hol for kalender vs liste. Utled der den trengs
            saksperioderInkludertHull: [
                ...sortertePerioder,
                ...leggTilHull(sortertePerioder, familiehendelsedato, familiesituasjon, otherProps.foreldreInfo),
            ].sort(sorterPerioder),
            // TODO (TOR) Slett denne når listevisning er refaktorert til å bruke saksperioderInkludertHull
            uttaksplan: utledKomplettPlan({
                familiehendelsedato,
                foreldreInfo: otherProps.foreldreInfo,
                søkersPerioder: søkersPerioder,
                annenPartsPerioder: annenPartsPerioder,
                gjelderAdopsjon: familiesituasjon === 'adopsjon',
                harAktivitetskravIPeriodeUtenUttak: otherProps.harAktivitetskravIPeriodeUtenUttak,
                //TODO (TOR) Trengs denne? Var alltid undefined før eg refaktorerte
                førsteUttaksdagNesteBarnsSak: undefined,
            }),
        };
    }, [otherProps]);

    return <UttaksplanDataContext value={value}>{children}</UttaksplanDataContext>;
};

export const useUttaksplanData = () => {
    const context = useContext(UttaksplanDataContext);
    if (!context) {
        throw new Error('UttaksplanDataContext.Provider er ikke satt opp');
    }
    return context;
};

const getSøkersPerioder = (
    foreldreInfo: ForeldreInfo,
    gjeldendeUttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
): UttakPeriode_fpoversikt[] => {
    return foreldreInfo.rettighetType === 'BEGGE_RETT'
        ? gjeldendeUttaksplan.filter(
              (p) =>
                  !('trekkdager' in p) &&
                  (foreldreInfo.søker === 'FAR_ELLER_MEDMOR' ? p.forelder === 'FAR_MEDMOR' : p.forelder === 'MOR'),
          )
        : gjeldendeUttaksplan;
};

const getAnnenpartsPerioder = (
    foreldreInfo: ForeldreInfo,
    gjeldendeUttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    return foreldreInfo.rettighetType === 'BEGGE_RETT'
        ? gjeldendeUttaksplan.filter(
              (p) =>
                  'trekkdager' in p ||
                  (foreldreInfo.søker === 'FAR_ELLER_MEDMOR' ? p.forelder === 'MOR' : p.forelder === 'FAR_MEDMOR'),
          )
        : [];
};

const sorterPerioder = (a: Uttaksplanperiode, b: Uttaksplanperiode): number => {
    const aFom = dayjs(a.fom);
    const bFom = dayjs(b.fom);

    if (aFom.isBefore(bFom)) {
        return -1;
    }
    if (aFom.isAfter(bFom)) {
        return 1;
    }
    return 0;
};

// TODO (TOR) Flytt hull-logikk til eigen fil når listevisning er refaktorert
export const leggTilHull = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiehendelsedato: string,
    familiesituasjon: Familiesituasjon,
    foreldreInfo: ForeldreInfo,
): UttaksplanHull[] => {
    if (
        foreldreInfo.søker === 'FAR_ELLER_MEDMOR' &&
        (foreldreInfo.rettighetType === 'ALENEOMSORG' || foreldreInfo.rettighetType === 'BARE_SØKER_RETT')
    ) {
        const førstePeriode = sortertePerioder.at(0);
        if (førstePeriode?.fom) {
            const periodeSomSkalSjekkesForHull = {
                fom: dayjs(familiehendelsedato).add(6, 'week').add(1, 'day').format(ISO_DATE_FORMAT),
                tom: førstePeriode.fom,
            };
            return leggTilHullForPeriode(
                sortertePerioder,
                familiesituasjon,
                'FAR_MEDMOR',
                periodeSomSkalSjekkesForHull,
            );
        }
    } else {
        const periodeSomSkalSjekkesForHull = {
            fom: familiehendelsedato,
            tom: dayjs(familiehendelsedato).add(6, 'week').format(ISO_DATE_FORMAT),
        };
        const forelder = foreldreInfo.søker === 'MOR' ? 'MOR' : 'FAR_MEDMOR';
        return leggTilHullForPeriode(sortertePerioder, familiesituasjon, forelder, periodeSomSkalSjekkesForHull);
    }

    return [];
};

export const leggTilHullForPeriode = (
    sortertePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    familiesituasjon: Familiesituasjon,
    forelder: BrukerRolleSak_fpoversikt,
    periodeSomSkalSjekkesForHull: { fom: string; tom: string },
): UttaksplanHull[] => {
    if (familiesituasjon === 'adopsjon') {
        return [];
    }

    const start = dayjs(periodeSomSkalSjekkesForHull.fom);
    const slutt = dayjs(periodeSomSkalSjekkesForHull.tom);

    const hull: UttaksplanHull[] = [];

    let pågåandeHullStart: dayjs.Dayjs | null = null;

    for (let dato = start; dato.isBefore(slutt, 'day'); dato = dato.add(1, 'day')) {
        if (erUkedag(dato)) {
            const erDatoDekket = sortertePerioder.some(
                (p) => dato.isSameOrAfter(p.fom, 'day') && dato.isSameOrBefore(p.tom, 'day'),
            );

            if (!erDatoDekket) {
                if (!pågåandeHullStart) {
                    pågåandeHullStart = dato;
                }
            } else if (pågåandeHullStart) {
                hull.push({
                    fom: pågåandeHullStart.format(ISO_DATE_FORMAT),
                    tom: dato.subtract(1, 'day').format(ISO_DATE_FORMAT),
                    hullType: PeriodeHullType.TAPTE_DAGER,
                    forelder,
                });
                pågåandeHullStart = null;
            }
        }
    }

    // Avslutt hull som ikkje er avslutta av andre periodar
    if (pågåandeHullStart) {
        hull.push({
            fom: pågåandeHullStart.format(ISO_DATE_FORMAT),
            tom: slutt.subtract(1, 'day').format(ISO_DATE_FORMAT),
            hullType: PeriodeHullType.TAPTE_DAGER,
            forelder,
        });
    }

    return hull;
};

const erUkedag = (dato: dayjs.Dayjs) => {
    const dag = dato.day();
    return dag !== 0 && dag !== 6;
};
