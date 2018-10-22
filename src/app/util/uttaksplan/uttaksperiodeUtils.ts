import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Avgrensninger } from 'nav-datovelger';
import { Tidsperiode } from 'common/types';
import { uttaksplanDatoavgrensninger } from '../validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden, isValidTidsperiode } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { getSisteMuligeUttaksdag, getFørsteUttaksdagPåEllerEtterFødsel } from './uttaksdatoer';

const standardAvgrensningerForUttakEtterFødsel = (familiehendelsesdato: Date): Avgrensninger => {
    return {
        helgedagerIkkeTillatt: true,
        minDato: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
        maksDato: getSisteMuligeUttaksdag(familiehendelsesdato)
    };
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
        til: { ...felles, ugyldigeTidsperioder }
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
