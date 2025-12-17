import { createContext, useContext, useMemo } from 'react';

import {
    Barn,
    Familiesituasjon,
    KontoBeregningDto,
    NavnPåForeldre,
    RettighetType_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttaksplanModus,
} from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { Søker } from '../types/Søker';
import { utledKomplettPlan } from '../utils/periodeUtils';

// TODO (TOR) Rydd i props her. Er nok mange som kan slåast i saman

type Props = {
    barn: Barn;
    navnPåForeldre: NavnPåForeldre;
    // TODO (TOR) Vurder om denne kan erstattes med søker
    erFarEllerMedmor: boolean;
    søker: Søker;
    //TODO (TOR) Fjern modus
    modus: UttaksplanModus;
    valgtStønadskonto: KontoBeregningDto;
    aleneOmOmsorg: boolean;
    // TODO (TOR) Denne kan kanskje erstattes med utvida Søker?
    erMedmorDelAvSøknaden: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    bareFarMedmorHarRett: boolean;
    erDeltUttak: boolean;
    saksperioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    children: React.ReactNode;
};

type ContextValues = Omit<Props, 'children'> & {
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    rettighetType: RettighetType_fpoversikt;
    uttaksplan: Planperiode[];
};

const UttaksplanDataContext = createContext<ContextValues | null>(null);

export const UttaksplanDataProvider = (props: Props) => {
    const { children, ...otherProps } = props;

    const value = useMemo(() => {
        const familiehendelsedato = getFamiliehendelsedato(otherProps.barn);
        const familiesituasjon = getFamiliesituasjon(otherProps.barn);
        const søkersPerioder = getSøkersPerioder(
            otherProps.erDeltUttak,
            otherProps.saksperioder,
            otherProps.erFarEllerMedmor,
        );
        const annenPartsPerioder = getAnnenpartsPerioder(
            otherProps.erDeltUttak,
            otherProps.saksperioder,
            otherProps.erFarEllerMedmor,
        );

        return {
            ...otherProps,
            familiehendelsedato,
            familiesituasjon,
            rettighetType: utledRettighetType(otherProps.erDeltUttak, otherProps.aleneOmOmsorg),
            uttaksplan: utledKomplettPlan({
                familiehendelsedato,
                erFarEllerMedmor: otherProps.erFarEllerMedmor,
                søkersPerioder: søkersPerioder,
                annenPartsPerioder: annenPartsPerioder,
                gjelderAdopsjon: familiesituasjon === 'adopsjon',
                bareFarMedmorHarRett: otherProps.bareFarMedmorHarRett,
                harAktivitetskravIPeriodeUtenUttak: otherProps.harAktivitetskravIPeriodeUtenUttak,
                //TODO (TOR) Trengs denne? Var alltid undefined før eg refaktorerte
                førsteUttaksdagNesteBarnsSak: undefined,
                modus: otherProps.modus,
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
    erDeltUttak: boolean,
    gjeldendeUttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
): UttakPeriode_fpoversikt[] => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter(
              (p) => !('trekkdager' in p) && (erFarEllerMedmor ? p.forelder === 'FAR_MEDMOR' : p.forelder === 'MOR'),
          )
        : gjeldendeUttaksplan;
};

export const getAnnenpartsPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter(
              (p) => 'trekkdager' in p || (erFarEllerMedmor ? p.forelder === 'MOR' : p.forelder === 'FAR_MEDMOR'),
          )
        : [];
};

// TODO (TOR) Burde kunne senda rettighetstype inn som prop i staden for erDeltUttak og aleneOmOmsorg
const utledRettighetType = (erDeltUttak: boolean, aleneOmOmsorg: boolean): RettighetType_fpoversikt => {
    if (erDeltUttak) {
        return 'BEGGE_RETT';
    }
    if (aleneOmOmsorg) {
        return 'ALENEOMSORG';
    }

    return 'BARE_SØKER_RETT';
};
