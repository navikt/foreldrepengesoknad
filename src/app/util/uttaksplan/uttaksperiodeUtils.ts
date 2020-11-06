import {
    StønadskontoType,
    OppholdÅrsakType,
    SaksperiodeUtsettelseÅrsakType,
    UtsettelseÅrsakType,
} from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../components/skjema/tidsperiodeBolk/TidsperiodeBolk';
import { Avgrensninger, Tidsperiode } from 'common/types';
import { uttaksplanDatoavgrensninger } from '../validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden, isValidTidsperiode } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { getSisteMuligeUttaksdag, getFørsteUttaksdagPåEllerEtterFødsel } from './uttaksdatoer';

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
        case SaksperiodeUtsettelseÅrsakType.HvØvelse:
            return UtsettelseÅrsakType.HvØvelse;
        case SaksperiodeUtsettelseÅrsakType.NavTiltak:
            return UtsettelseÅrsakType.NavTiltak;
        default:
            return undefined;
    }
};

export const getOppholdsÅrsakFromStønadskonto = (konto: StønadskontoType): OppholdÅrsakType | undefined => {
    switch (konto) {
        case StønadskontoType.Fedrekvote:
            return OppholdÅrsakType.UttakFedrekvoteAnnenForelder;
        case StønadskontoType.Mødrekvote:
            return OppholdÅrsakType.UttakMødrekvoteAnnenForelder;
        case StønadskontoType.Fellesperiode:
            return OppholdÅrsakType.UttakFellesperiodeAnnenForelder;
        default:
            return undefined;
    }
};

export const getStønadskontoFromOppholdsårsak = (årsak: OppholdÅrsakType): StønadskontoType => {
    switch (årsak) {
        case OppholdÅrsakType.UttakFedrekvoteAnnenForelder:
            return StønadskontoType.Fedrekvote;
        case OppholdÅrsakType.UttakMødrekvoteAnnenForelder:
            return StønadskontoType.Mødrekvote;
        case OppholdÅrsakType.UttakFellesperiodeAnnenForelder:
            return StønadskontoType.Fellesperiode;
        case OppholdÅrsakType.UttakForelderpengerFørFødsel:
            return StønadskontoType.ForeldrepengerFørFødsel;
    }
};

export function getDatoavgrensningerForStønadskonto(
    konto: StønadskontoType | undefined,
    familiehendelsesdato: Date,
    tidsperiode: Partial<Tidsperiode> | undefined,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger {
    if (konto === undefined) {
        return getDatoavgrensningerForPeriodeUtenKonto(familiehendelsesdato, tidsperiode, ugyldigeTidsperioder);
    }
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato, ugyldigeTidsperioder);
    }
    if (isValidTidsperiode(tidsperiode) && Tidsperioden(tidsperiode).erFørDato(familiehendelsesdato)) {
        return getDatoavgrensningerForEkstrauttakFørTermin(familiehendelsesdato, ugyldigeTidsperioder);
    }

    const standardAvgrensninger = standardAvgrensningerForUttakEtterFødsel(familiehendelsesdato);
    return {
        fra: {
            ...standardAvgrensninger,
            ugyldigeTidsperioder,
        },
        til: {
            ...standardAvgrensninger,
            minDato: tidsperiode && tidsperiode.fom ? tidsperiode.fom : standardAvgrensninger.minDato,
            ugyldigeTidsperioder,
        },
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
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: tidsperiode !== undefined && tidsperiode.fom ? tidsperiode.fom : minDato,
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
    };
}
const standardAvgrensningerForUttakEtterFødsel = (familiehendelsesdato: Date): Avgrensninger => {
    return {
        helgedagerIkkeTillatt: true,
        minDato: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
        maksDato: getSisteMuligeUttaksdag(familiehendelsesdato),
    };
};

function getDatoavgrensningerForForeldrepengerFørFødsel(
    familiehendelsesdato: Date,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger {
    const avgrensninger: Avgrensninger = {
        ...standardAvgrensningerForUttakEtterFødsel,
        ...uttaksplanDatoavgrensninger.startdatoFørTerminForeldrepengerFørFødselKonto(familiehendelsesdato),
        ugyldigeTidsperioder,
    };
    return {
        fra: avgrensninger,
        til: avgrensninger,
    };
}

function getDatoavgrensningerForEkstrauttakFørTermin(
    familiehendelsesdato: Date,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger {
    const avgrensninger: Avgrensninger = {
        ...standardAvgrensningerForUttakEtterFødsel,
        ...uttaksplanDatoavgrensninger.ekstrauttakFørFødsel(familiehendelsesdato),
        ugyldigeTidsperioder,
    };
    return {
        fra: avgrensninger,
        til: avgrensninger,
    };
}
