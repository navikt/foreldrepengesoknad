import dayjs from 'dayjs';

import {
    Situasjon,
    TidsperiodeDate,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    getFørsteUttaksdag2UkerFørFødsel,
    getTidsperiode,
    isValidTidsperiode,
    uttaksConstants,
} from '@navikt/fp-common';

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
    termindato: Date | undefined,
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

export function getFørsteUttaksdagForeldrepengerFørFødsel(familiehendelsesdato: Date | undefined): Date {
    if (!familiehendelsesdato) {
        throw new Error('Mangler informasjon om familiehendelsesdato.');
    }
    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
}

export function getFørsteUttaksdagAnkomstdatoNorge(anksomstdatoNorge: Date | undefined): Date {
    if (!anksomstdatoNorge) {
        throw new Error('Mangler informasjon om ankomstdato til Norge.');
    }
    return Uttaksdagen(anksomstdatoNorge).denneEllerNeste();
}

export function getFørsteUttaksdagOmsorgsovertakelse(omsorgsovertakelse: Date | undefined): Date {
    if (!omsorgsovertakelse) {
        throw new Error('Mangler informasjon om omsorgsovertakelsedato.');
    }
    return Uttaksdagen(omsorgsovertakelse).denneEllerNeste();
}

export function getFørsteMuligeUttaksdag(
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    termindato: Date | undefined,
): Date {
    if (erFarEllerMedmor) {
        if (andreAugust2022ReglerGjelder(familiehendelsesdato)) {
            return getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
        } else {
            return Uttaksdagen(familiehendelsesdato).denneEllerNeste();
        }
    }

    const termindatoMinus12Uker =
        termindato !== undefined
            ? dayjs(termindato).subtract(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1, 'days')
            : undefined;
    const erFødselsdatoFørTermindatoMinus12Uker =
        termindato !== undefined ? dayjs(familiehendelsesdato).isBefore(termindatoMinus12Uker) : false;

    if (erFødselsdatoFørTermindatoMinus12Uker) {
        return Uttaksdagen(familiehendelsesdato).denneEllerForrige();
    }

    const datoÅRegneFra = termindato !== undefined ? termindato : familiehendelsesdato;

    return Uttaksdagen(getFørsteUttaksdagPåEllerEtterFødsel(datoÅRegneFra)).trekkFra(
        uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
}

export function getSisteMuligeUttaksdag(familiehendelsesdato: Date): Date {
    return Uttaksdagen(
        dayjs(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato))
            .add(uttaksConstants.MAKS_PERMISJONSLENGDE_I_ÅR, 'year')
            .subtract(1, 'day')
            .toDate(),
    ).denneEllerNeste();
}

export const erInnenFørsteSeksUkerFødselFarMedmor = (
    tidsperiode: TidsperiodeDate,
    situasjon: Situasjon,
    søkerErFarEllerMedmor: boolean,
    førsteUttaksdagEtterSeksUker: Date,
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
