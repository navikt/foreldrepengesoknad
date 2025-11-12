import { createContext, useContext, useMemo } from 'react';

import {
    Barn,
    Familiesituasjon,
    KontoBeregningDto,
    NavnPåForeldre,
    SaksperiodeNy,
    UttaksplanModus,
} from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

import { Planperiode } from '../types/Planperiode';
import { utledKomplettPlan } from '../utils/periodeUtils';

type Props = {
    barn: Barn;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    modus: UttaksplanModus;
    valgtStønadskonto: KontoBeregningDto;
    aleneOmOmsorg: boolean;
    erMedmorDelAvSøknaden: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    bareFarMedmorHarRett: boolean;
    erDeltUttak: boolean;
    saksperioder: SaksperiodeNy[];
    children: React.ReactNode;
};

type ContextValues = Omit<Props, 'children'> & {
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
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

const getSøkersPerioder = (erDeltUttak: boolean, gjeldendeUttaksplan: SaksperiodeNy[], erFarEllerMedmor: boolean) => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter((p) => (erFarEllerMedmor ? p.forelder === 'FAR_MEDMOR' : p.forelder === 'MOR'))
        : gjeldendeUttaksplan;
};

export const getAnnenpartsPerioder = (
    erDeltUttak: boolean,
    gjeldendeUttaksplan: SaksperiodeNy[],
    erFarEllerMedmor: boolean,
) => {
    return erDeltUttak
        ? gjeldendeUttaksplan.filter((p) => (erFarEllerMedmor ? p.forelder === 'MOR' : p.forelder === 'FAR_MEDMOR'))
        : [];
};
