import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Uttaksdagen } from './Uttaksdagen';
import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { Avgrensninger } from 'nav-datovelger';

const fellesUttakAvgrensninger: Avgrensninger = {
    helgedagerIkkeTillatt: true
};

export function getDatoavgrensningerForStønadskonto(
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    permisjonsregler: Permisjonsregler
): DatoAvgrensninger | undefined {
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato, permisjonsregler);
    }
    return {
        fra: fellesUttakAvgrensninger,
        til: fellesUttakAvgrensninger
    };
}

function getDatoavgrensningerForForeldrepengerFørFødsel(
    familiehendelsesdato: Date,
    permisjonsregler: Permisjonsregler
): DatoAvgrensninger {
    const avgrensninger: Avgrensninger = {
        ...fellesUttakAvgrensninger,
        minDato: Uttaksdagen(familiehendelsesdato).trekkFra(permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5),
        maksDato: Uttaksdagen(familiehendelsesdato).forrige()
    };
    return {
        fra: avgrensninger,
        til: avgrensninger
    };
}
