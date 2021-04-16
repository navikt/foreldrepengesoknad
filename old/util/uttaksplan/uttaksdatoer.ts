import moment from 'moment';
import { Uttaksdagen } from './Uttaksdagen';
import { Uttaksdatoer } from '../../selectors/types';
import { getTidsperiode } from './Tidsperioden';
import uttaksConstants from '../../constants';

export const uttaksdatoer = (familiehendelsesdato: Date) => ({
    førsteUttaksdagForeldrepengerFørFødsel: getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato),
    førsteUttaksdagPåEllerEtterFødsel: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
    førsteMuligeUttaksdagFørTermin: getFørsteMuligeUttaksdag(familiehendelsesdato),
    sisteMuligeUttaksdagEtterTermin: getSisteMuligeUttaksdag(familiehendelsesdato),
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
            førsteUttaksdagForeldrepengerFørFødsel,
        },
        etterFødsel: {
            sisteUttaksdagInnenforSeksUker,
            førsteUttaksdagEtterSeksUker: Uttaksdagen(sisteUttaksdagInnenforSeksUker).neste(),
            sisteMuligeUttaksdag,
        },
    };
};

export function getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato: Date) {
    return Uttaksdagen(familiehendelsesdato).denneEllerNeste();
}

export function getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato: Date): Date {
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5
    );
}

export function getFørsteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5
    );
}

export function getSisteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(
        moment(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato))
            .add(uttaksConstants.MAKS_PERMISJONSLENGDE_I_ÅR, 'year')
            .toDate()
    ).denneEllerNeste();
}
