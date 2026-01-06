import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';

import {
    Barn,
    Familiesituasjon,
    KontoBeregningDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

import { ForeldreInfo } from '../types/ForeldreInfo';
import { Planperiode } from '../types/Planperiode';
import { Uttaksplanperiode } from '../types/UttaksplanPeriode';
import { lagHullPerioder } from '../utils/lagHullPerioder';
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
                ...lagHullPerioder(sortertePerioder, familiehendelsedato, familiesituasjon, otherProps.foreldreInfo),
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
