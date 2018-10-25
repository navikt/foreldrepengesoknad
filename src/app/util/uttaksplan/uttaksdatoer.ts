import moment from 'moment';
import { Uttaksdagen } from './Uttaksdagen';
import { getPermisjonsregler } from './permisjonsregler';

const permisjonsregler = getPermisjonsregler();

export const uttaksdatoer = (familiehendelsesdato: Date) => ({
    førsteUttaksdagForeldrepengerFørFødsel: getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato),
    førsteUttaksdagPåEllerEtterFødsel: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
    førsteMuligeUttaksdag: getFørsteMuligeUttaksdag(familiehendelsesdato),
    sisteMuligeUttaksdag: getSisteMuligeUttaksdag(familiehendelsesdato)
});

export function getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato: Date) {
    return Uttaksdagen(familiehendelsesdato).denneEllerNeste();
}

export function getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato: Date): Date {
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        permisjonsregler.antallUkerForeldrepengerFørFødsel * 5
    );
}

export function getFørsteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5
    );
}

export function getSisteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(
        moment(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato))
            .add(permisjonsregler.maksPermisjonslengdeIÅr, 'year')
            .toDate()
    ).denneEllerNeste();
}
