import { TidsperiodeDate } from '@navikt/fp-common';
import uttaksConstants from 'app/constants';
import { getTidsperiode, isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import { Situasjon } from 'app/types/Situasjon';
import { getFørsteUttaksdag2UkerFørFødsel } from 'app/utils/wlbUtils';
import dayjs from 'dayjs';

export interface Uttaksdatoer {
    førsteUttaksdag: Date;
    førFødsel: {
        førsteMuligeUttaksdag: Date;
        førsteUttaksdagForeldrepengerFørFødsel: Date;
        sisteUttaksdagFørFødsel: Date;
    };
    etterFødsel: {
        sisteUttaksdagInnenforSeksUker: Date;
        førsteUttaksdagEtterSeksUker: Date;
        sisteMuligeUttaksdag: Date;
    };
}

export const uttaksdatoer = (familiehendelsesdato: Date, erFarEllerMedmor: boolean, termindato: Date | undefined) => ({
    førsteUttaksdagForeldrepengerFørFødsel: getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato),
    førsteUttaksdagPåEllerEtterFødsel: Uttaksdagen(familiehendelsesdato).denneEllerNeste(),
    førsteMuligeUttaksdagFørTermin: getFørsteMuligeUttaksdag(familiehendelsesdato, erFarEllerMedmor, termindato),
    sisteMuligeUttaksdagEtterTermin: getSisteMuligeUttaksdag(familiehendelsesdato),
});

export const getUttaksdatoer = (
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined
): Uttaksdatoer => {
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

    const førsteUttaksdagForeldrepengerFørFødsel = getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato);
    const førsteMuligeUttaksdag = getFørsteMuligeUttaksdag(familiehendelsesdato, erFarEllerMedmor, termindato);
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

export function getFørsteMuligeUttaksdag(
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined
): Date {
    if (erFarEllerMedmor) {
        return getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    }
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5
    );
}

export function getSisteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(
        dayjs(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato))
            .add(uttaksConstants.MAKS_PERMISJONSLENGDE_I_ÅR, 'year')
            .subtract(1, 'day')
            .toDate()
    ).denneEllerNeste();
}

export const erInnenFørsteSeksUkerFødselFarMedmor = (
    tidsperiode: TidsperiodeDate,
    situasjon: Situasjon,
    søkerErFarEllerMedmor: boolean,
    førsteUttaksdagEtterSeksUker: Date
): boolean => {
    if (
        situasjon !== 'fødsel' ||
        !søkerErFarEllerMedmor ||
        tidsperiode === undefined ||
        isValidTidsperiode(tidsperiode) === false
    ) {
        return false;
    }
    return dayjs(tidsperiode.fom).isBefore(dayjs(førsteUttaksdagEtterSeksUker), 'day');
};
