import { createContext, use, useMemo } from 'react';

import {
    Barn,
    EksternArbeidsforholdDto_fpoversikt,
    Familiesituasjon,
    KontoBeregningDto,
    PeriodeDto_fpoversikt,
    isFødtBarn,
} from '@navikt/fp-types';
import { getFamiliehendelsedato, getFamiliesituasjon } from '@navikt/fp-utils';

import { ForeldreInfo } from '../types/ForeldreInfo';
import { sorterPerioder } from '../utils/periodeUtils';

type Props = {
    barn: Barn;
    foreldreInfo: ForeldreInfo;
    valgtStønadskvote: KontoBeregningDto;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    erPeriodeneTilAnnenPartLåst: boolean;
    perioder: PeriodeDto_fpoversikt[];
    aktiveArbeidsforhold?: EksternArbeidsforholdDto_fpoversikt[];
    children: React.ReactNode;
    erEndringssøknad: boolean;
};

type ContextValues = Omit<Props, 'children'> & {
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    termindato: string | undefined;
    /**
     * Sann når appen kjenner søkers arbeidsforhold og dermed kan la brukeren
     * velge graderingsaktivitet (arbeidsgiver/frilans/selvstendig næringsdrivende).
     * Dette er tilfelle i foreldrepengesøknaden, men ikke i planleggeren – der
     * finnes ingen arbeidsforhold, så varsler om manglende graderingsaktivitet
     * skal ikke vises.
     */
    kanVelgeArbeidsgiver: boolean;
};

const UttaksplanDataContext = createContext<ContextValues | null>(null);

export const UttaksplanDataProvider = (props: Props) => {
    const { children, ...otherProps } = props;

    const value = useMemo(() => {
        const familiehendelsedato = getFamiliehendelsedato(otherProps.barn);
        const familiesituasjon = getFamiliesituasjon(otherProps.barn);
        const termindato = isFødtBarn(otherProps.barn) ? otherProps.barn.termindato : undefined;

        const sortertePerioder = filtrerBortSiderUtenTrekkdager(otherProps.perioder).sort(sorterPerioder);

        return {
            ...otherProps,
            familiehendelsedato,
            familiesituasjon,
            termindato,
            perioder: sortertePerioder,
            kanVelgeArbeidsgiver: otherProps.aktiveArbeidsforhold !== undefined,
        };
    }, [otherProps]);

    return <UttaksplanDataContext value={value}>{children}</UttaksplanDataContext>;
};

export const useUttaksplanData = () => {
    const context = use(UttaksplanDataContext);
    if (!context) {
        throw new Error('UttaksplanDataContext.Provider er ikke satt opp');
    }
    return context;
};

// TODO (TOR) Denne fjerninga av avslåtte periodar uten trekkdagar bør ligga i backend
const harTrekkdager = (side: PeriodeDto_fpoversikt['søker']): boolean =>
    !side || !(side.resultat?.innvilget === false && side.resultat.trekkerDager === false);

const filtrerBortSiderUtenTrekkdager = (perioder: PeriodeDto_fpoversikt[]): PeriodeDto_fpoversikt[] =>
    perioder
        .map((periode) => ({
            ...periode,
            søker: harTrekkdager(periode.søker) ? periode.søker : undefined,
            annenPart: harTrekkdager(periode.annenPart) ? periode.annenPart : undefined,
        }))
        .filter((periode) => periode.søker !== undefined || periode.annenPart !== undefined || periode.annenPartEøs);
