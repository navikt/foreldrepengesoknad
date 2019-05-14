import {
    StønadskontoType,
    OppholdÅrsakType,
    SaksperiodeUtsettelseÅrsakType,
    UtsettelseÅrsakType,
    PeriodeHullAvslåttPeriode,
    Periodetype
} from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Avgrensninger, Tidsperiode } from 'common/types';
import { uttaksplanDatoavgrensninger } from '../validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden, isValidTidsperiode } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { getSisteMuligeUttaksdag, getFørsteUttaksdagPåEllerEtterFødsel } from './uttaksdatoer';
import { Perioden } from './Perioden';

const standardAvgrensningerForUttakEtterFødsel = (familiehendelsesdato: Date): Avgrensninger => {
    return {
        helgedagerIkkeTillatt: true,
        minDato: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
        maksDato: getSisteMuligeUttaksdag(familiehendelsesdato)
    };
};

export const getUtsettelseÅrsakFromSaksperiode = (
    årsak: SaksperiodeUtsettelseÅrsakType | undefined
): UtsettelseÅrsakType | undefined => {
    switch (årsak) {
        case SaksperiodeUtsettelseÅrsakType.Arbeid:
            return UtsettelseÅrsakType.Arbeid;
        case SaksperiodeUtsettelseÅrsakType.Ferie:
            return UtsettelseÅrsakType.Ferie;
        case SaksperiodeUtsettelseÅrsakType.InstitusjonBarnet:
            return UtsettelseÅrsakType.InstitusjonBarnet;
        case SaksperiodeUtsettelseÅrsakType.InstitusjonSøker:
            return UtsettelseÅrsakType.InstitusjonSøker;
        case SaksperiodeUtsettelseÅrsakType.Sykdom:
            return UtsettelseÅrsakType.Sykdom;
        default:
            return undefined;
    }
};

export const getOppholdsÅrsakFromStønadskonto = (konto: StønadskontoType): OppholdÅrsakType | undefined => {
    if (konto === StønadskontoType.Fedrekvote) {
        return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
    } else if (konto === StønadskontoType.Mødrekvote) {
        return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
    } else if (konto === StønadskontoType.Fellesperiode) {
        return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
    } else if (konto === StønadskontoType.Flerbarnsdager) {
        return OppholdÅrsakType.UttakFlerbarnsukerAnnenForelder;
    } else {
        return undefined;
    }
};

export const getStønadskontoFromOppholdsårsak = (årsak: OppholdÅrsakType): StønadskontoType | undefined => {
    if (årsak === OppholdÅrsakType.UttakFedrekvoteAnnenForelder) {
        return StønadskontoType.Fedrekvote;
    } else if (årsak === OppholdÅrsakType.UttakMødrekvoteAnnenForelder) {
        return StønadskontoType.Mødrekvote;
    } else if (årsak === OppholdÅrsakType.UttakFellesperiodeAnnenForelder) {
        return StønadskontoType.Fellesperiode;
    } else if (årsak === OppholdÅrsakType.UttakFlerbarnsukerAnnenForelder) {
        return StønadskontoType.Flerbarnsdager;
    } else {
        return undefined;
    }
};

export function getDatoavgrensningerForStønadskonto(
    konto: StønadskontoType | undefined,
    familiehendelsesdato: Date,
    tidsperiode: Partial<Tidsperiode> | undefined,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger | undefined {
    if (konto === undefined) {
        return getDatoavgrensningerForPeriodeUtenKonto(familiehendelsesdato, tidsperiode, ugyldigeTidsperioder);
    }
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato, ugyldigeTidsperioder);
    }
    if (isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(familiehendelsesdato)) {
        return getDatoavgrensningerForEkstrauttakFørTermin(familiehendelsesdato, ugyldigeTidsperioder);
    }
    const felles = standardAvgrensningerForUttakEtterFødsel(familiehendelsesdato);

    return {
        fra: {
            ...felles,
            ugyldigeTidsperioder
        },
        til: {
            ...felles,
            minDato: tidsperiode && tidsperiode.fom ? tidsperiode.fom : felles.minDato,
            ugyldigeTidsperioder
        }
    };
}

function getDatoavgrensningerForPeriodeUtenKonto(
    familiehendelsesdato: Date,
    tidsperiode: Partial<Tidsperiode> | undefined,
    ugyldigeTidsperioder: Tidsperiode[]
) {
    const minDato = getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato);
    return {
        fra: {
            minDato,
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true
        },
        til: {
            minDato: tidsperiode !== undefined && tidsperiode.fom ? (tidsperiode.fom as Date) : minDato,
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true
        }
    };
}

function getDatoavgrensningerForForeldrepengerFørFødsel(
    familiehendelsesdato: Date,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger {
    const avgrensninger: Avgrensninger = {
        ...standardAvgrensningerForUttakEtterFødsel,
        ...uttaksplanDatoavgrensninger.startdatoFørTerminForeldrepengerFørFødselKonto(familiehendelsesdato),
        ugyldigeTidsperioder
    };
    return {
        fra: avgrensninger,
        til: avgrensninger
    };
}
function getDatoavgrensningerForEkstrauttakFørTermin(
    familiehendelsesdato: Date,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger {
    const avgrensninger: Avgrensninger = {
        ...standardAvgrensningerForUttakEtterFødsel,
        ...uttaksplanDatoavgrensninger.ekstrauttakFørFødsel(familiehendelsesdato),
        ugyldigeTidsperioder
    };
    return {
        fra: avgrensninger,
        til: avgrensninger
    };
}

export interface PeriodeHullUttaksinfo {
    uttaksdager: number;
    konto: StønadskontoType;
    gjelderAnnenPart: boolean;
}

export const getUttaksinfoForPeriodeHullAvslåttPeriode = (
    periode: PeriodeHullAvslåttPeriode
): PeriodeHullUttaksinfo | undefined => {
    if (periode.avslåttPeriodeType === Periodetype.Utsettelse) {
        return {
            gjelderAnnenPart: periode.gjelderAnnenPart,
            konto: periode.konto,
            uttaksdager: Perioden(periode).getAntallUttaksdager()
        };
    }
    return undefined;
};
