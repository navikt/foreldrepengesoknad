import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { Avgrensninger } from 'nav-datovelger';
import { Tidsperiode } from 'common/types';
import { uttaksplanDatoavgrensninger } from '../validation/uttaksplan/uttaksplanDatoavgrensninger';

const fellesUttakAvgrensninger: Avgrensninger = {
    helgedagerIkkeTillatt: true
};

export function getDatoavgrensningerForStønadskonto(
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    permisjonsregler: Permisjonsregler,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger | undefined {
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato, ugyldigeTidsperioder);
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
