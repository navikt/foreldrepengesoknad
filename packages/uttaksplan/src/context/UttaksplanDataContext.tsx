import { createContext, useContext, useMemo } from 'react';

import {
    Barn,
    EksternArbeidsforholdDto_fpoversikt,
    Familiesituasjon,
    KontoBeregningDto,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isFødtBarn,
} from '@navikt/fp-types';
import { Uttaksperioden, getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

import { ForeldreInfo } from '../types/ForeldreInfo';
import { sorterPerioder } from '../utils/periodeUtils';

type Props = {
    barn: Barn;
    foreldreInfo: ForeldreInfo;
    valgtStønadskonto: KontoBeregningDto;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erPeriodeneTilAnnenPartLåst: boolean;
    uttakPerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    aktiveArbeidsforhold?: EksternArbeidsforholdDto_fpoversikt[];
    children: React.ReactNode;
    erEndringssøknad: boolean;
};

type ContextValues = Omit<Props, 'children'> & {
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    termindato: string | undefined;
};

const UttaksplanDataContext = createContext<ContextValues | null>(null);

export const UttaksplanDataProvider = (props: Props) => {
    const { children, ...otherProps } = props;

    const value = useMemo(() => {
        const familiehendelsedato = getFamiliehendelsedato(otherProps.barn);
        const familiesituasjon = getFamiliesituasjon(otherProps.barn);
        const termindato = isFødtBarn(otherProps.barn) ? otherProps.barn.termindato : undefined;

        const sortertePerioder = filtrerBortPerioderUtenTrekkdager(otherProps.uttakPerioder).sort(sorterPerioder);

        return {
            ...otherProps,
            familiehendelsedato,
            familiesituasjon,
            termindato,
            uttakPerioder: sortertePerioder,
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

// TODO (TOR) Denne fjerninga av avslåtte periodar uten trekkdagar bør ligga i backend
const filtrerBortPerioderUtenTrekkdager = (
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
) =>
    perioder.filter(
        (periode) =>
            Uttaksperioden.erEøsPeriode(periode) ||
            !(periode.resultat?.innvilget === false && periode.resultat.trekkerDager === false),
    );
