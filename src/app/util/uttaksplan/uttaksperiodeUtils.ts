import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Uttaksdagen } from './Uttaksdagen';
import { Permisjonsregler } from '../../types/uttaksplan/permisjonsregler';
import { Avgrensninger } from 'nav-datovelger';

export function getDatoavgrensningerForStønadskonto(
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    permisjonsregler: Permisjonsregler
): DatoAvgrensninger | undefined {
    if (konto === StønadskontoType.ForeldrepengerFørFødsel) {
        return getDatoavgrensningerForForeldrepengerFørFødsel(familiehendelsesdato, permisjonsregler);
    }
    return undefined;
}

function getDatoavgrensningerForForeldrepengerFørFødsel(
    familiehendelsesdato: Date,
    permisjonsregler: Permisjonsregler
): DatoAvgrensninger {
    const avgrensninger: Avgrensninger = {
        minDato: Uttaksdagen(familiehendelsesdato).trekkFra(permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5),
        maksDato: Uttaksdagen(familiehendelsesdato).forrige()
    };
    return {
        fra: avgrensninger,
        til: avgrensninger
    };
}
