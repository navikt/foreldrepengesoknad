import moment from 'moment';
import { StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Avgrensninger } from 'nav-datovelger';
import { Tidsperiode } from 'common/types';
import { uttaksplanDatoavgrensninger } from '../validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden, isValidTidsperiode } from './Tidsperioden';
import { Uttaksdagen } from './Uttaksdagen';
import { getPermisjonsregler } from './permisjonsregler';

const standardAvgrensningerForUttakEtterFødsel = (familiehendelsesdato: Date): Avgrensninger => {
    return {
        helgedagerIkkeTillatt: true,
        minDato: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
        maksDato: getSisteMuligePermisjonsdag(familiehendelsesdato)
    };
};

export function getFørsteMuligePermisjonsdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(familiehendelsesdato).trekkFra(getPermisjonsregler().maksAntallUkerForeldrepengerFørFødsel * 5);
}

export function getSisteMuligePermisjonsdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(
        moment(familiehendelsesdato)
            .add(getPermisjonsregler().maksPermisjonslengdeIÅr, 'year')
            .toDate()
    ).denneEllerNeste();
}

export function getDatoavgrensningerForStønadskonto(
    konto: StønadskontoType,
    familiehendelsesdato: Date,
    tidsperiode: Partial<Tidsperiode> | undefined,
    ugyldigeTidsperioder: Tidsperiode[]
): DatoAvgrensninger | undefined {
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
