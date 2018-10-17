import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Avgrensninger } from 'nav-datovelger';
import { Tidsperiode } from 'common/types';
import { uttaksplanDatoavgrensninger } from '../validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden } from './Tidsperioden';

const fellesUttakAvgrensninger: Avgrensninger = {
    helgedagerIkkeTillatt: true
};

export function getDatoavgrensningerForStønadskonto(
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    tidsperiode: Tidsperiode | undefined,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger | undefined {
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato, ugyldigeTidsperioder);
    }
    if (tidsperiode && Tidsperioden(tidsperiode).erFørDato(familiehendelsesdato)) {
        return getDatoavgrensningerForEkstrauttakFørTermin(familiehendelsesdato, ugyldigeTidsperioder);
    }
    return {
        fra: {
            ...fellesUttakAvgrensninger,
            ugyldigeTidsperioder
        },
        til: { ...fellesUttakAvgrensninger, ugyldigeTidsperioder }
    };
}

function getDatoavgrensningerForForeldrepengerFørFødsel(
    familiehendelsesdato: Date,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger {
    const avgrensninger: Avgrensninger = {
        ...fellesUttakAvgrensninger,
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
        ...fellesUttakAvgrensninger,
        ...uttaksplanDatoavgrensninger.ekstrauttakFørFødsel(familiehendelsesdato),
        ugyldigeTidsperioder
    };
    return {
        fra: avgrensninger,
        til: avgrensninger
    };
}
