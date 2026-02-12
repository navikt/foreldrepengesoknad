import dayjs from 'dayjs';
import isoWeekday from 'dayjs/plugin/isoWeek';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { UttaksdagenString, slutterTidsperiodeInnen6UkerEtterFødsel } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../types/UttaksplanPeriode';

dayjs.extend(isoWeekday);

export const isUttaksperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.utsettelseÅrsak === undefined;
};

export const isPrematuruker = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.kontoType !== undefined &&
        periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const isUtsettelsesperiode = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.utsettelseÅrsak !== undefined &&
        periode.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const isOverføringsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.overføringÅrsak !== undefined;
};

export const isOppholdsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.oppholdÅrsak !== undefined;
};

export const isAvslåttPeriode = (periode: Uttaksplanperiode) => {
    return 'resultat' in periode && periode.resultat && periode.resultat.innvilget !== true;
};

export const isTapteDager = (periode: Uttaksplanperiode) => {
    return erTapteDagerHull(periode);
};

export const isPeriodeUtenUttak = (periode: Uttaksplanperiode) => {
    return erPeriodeUtenUttakHull(periode);
};

export const isAvslåttPeriodeFørsteSeksUkerMor = (
    periode: Uttaksplanperiode,
    familiehendelsesdato: string,
): boolean => {
    return (
        !!isAvslåttPeriode(periode) &&
        'forelder' in periode &&
        periode.forelder === 'MOR' &&
        dayjs(periode.fom).isSameOrAfter(dayjs(familiehendelsesdato), 'day') &&
        slutterTidsperiodeInnen6UkerEtterFødsel({ fom: periode.fom, tom: periode.tom }, new Date(familiehendelsesdato))
    );
};

export const sorterPerioder = (a: Uttaksplanperiode, b: Uttaksplanperiode): number => {
    const aFom = dayjs(a.fom);
    const bFom = dayjs(b.fom);

    if (aFom.isBefore(bFom)) {
        return -1;
    }
    if (aFom.isAfter(bFom)) {
        return 1;
    }

    const aTom = dayjs(a.tom);
    const bTom = dayjs(b.tom);

    if (aTom.isBefore(bTom)) {
        return -1;
    }
    if (aTom.isAfter(bTom)) {
        return 1;
    }

    return 0;
};

export const harPeriodeDerMorsAktivitetIkkeErValgt = (
    perioder?: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
) => {
    return (
        !!perioder &&
        perioder.some(
            (periode) =>
                erVanligUttakPeriode(periode) &&
                periode.forelder === 'FAR_MEDMOR' &&
                periode.kontoType === 'FELLESPERIODE' &&
                periode.flerbarnsdager === undefined &&
                periode.morsAktivitet === undefined,
        )
    );
};

export const erPeriodeIMellomToUkerFørFamdatoOgSeksUkerEtter = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsedato: string,
) => {
    const familiehendelse = UttaksdagenString.denneEllerNeste(familiehendelsedato);

    const toUkerFør = familiehendelse.getDatoAntallUttaksdagerTidligere(10);
    const seksUkerEtter = familiehendelse.getDatoAntallUttaksdagerSenere(30);

    const fom = dayjs(periode.fom);
    const tom = dayjs(periode.tom);

    return fom.isBefore(seksUkerEtter) && tom.isSameOrAfter(toUkerFør);
};
