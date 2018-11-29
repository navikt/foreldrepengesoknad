import moment from 'moment';
import { Uttaksdagen } from './Uttaksdagen';
import { getPermisjonsregler } from './permisjonsregler';
import { Uttaksdatoer } from '../../selectors/types';
import { getTidsperiode } from './Tidsperioden';

const permisjonsregler = getPermisjonsregler();

export const uttaksdatoer = (familiehendelsesdato: Date) => ({
    førsteUttaksdagForeldrepengerFørFødsel: getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato),
    førsteUttaksdagPåEllerEtterFødsel: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
    førsteMuligeUttaksdagFørTermin: getFørsteMuligeUttaksdag(familiehendelsesdato),
    sisteMuligeUttaksdagEtterTermin: getSisteMuligeUttaksdag(familiehendelsesdato)
});

export const getUttaksdatoer = (familiehendelsesdato: Date): Uttaksdatoer => {
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

    const førsteUttaksdagForeldrepengerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    const førsteMuligeUttaksdag = getFørsteMuligeUttaksdag(familiehendelsesdato);
    const sisteUttaksdagFørFødsel = Uttaksdagen(førsteUttaksdag).forrige();
    const sisteMuligeUttaksdag = getSisteMuligeUttaksdag(familiehendelsesdato);

    const sisteUttaksdagInnenforSeksUker = getTidsperiode(førsteUttaksdag, 30).tom;
    return {
        førsteUttaksdag,
        førFødsel: {
            førsteMuligeUttaksdag,
            sisteUttaksdagFørFødsel,
            førsteUttaksdagForeldrepengerFørFødsel
        },
        etterFødsel: {
            sisteUttaksdagInnenforSeksUker,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(sisteUttaksdagInnenforSeksUker).neste(),
            sisteMuligeUttaksdag
        }
    };
};

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
