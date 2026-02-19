import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isoWeekday from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';

import {
    BrukerRolleSak_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { UttaksdagenString, slutterTidsperiodeInnen6UkerEtterFødsel } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    erEøsUttakPeriode,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../types/UttaksplanPeriode';

dayjs.extend(isSameOrAfter);
dayjs.extend(minMax);
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

export const erPerioderEkslFomTomLike = (
    periode1: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    periode2: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    if (
        (erEøsUttakPeriode(periode1) && !erEøsUttakPeriode(periode2)) ||
        (!erEøsUttakPeriode(periode1) && erEøsUttakPeriode(periode2))
    ) {
        return false;
    }

    if (erEøsUttakPeriode(periode1) && erEøsUttakPeriode(periode2)) {
        return periode1.kontoType === periode2.kontoType && periode1.trekkdager === periode2.trekkdager;
    }

    if (erVanligUttakPeriode(periode1) && erVanligUttakPeriode(periode2)) {
        return (
            periode1.flerbarnsdager === periode2.flerbarnsdager &&
            periode1.kontoType === periode2.kontoType &&
            periode1.forelder === periode2.forelder &&
            periode1.gradering?.arbeidstidprosent === periode2.gradering?.arbeidstidprosent &&
            periode1.gradering?.aktivitet === periode2.gradering?.aktivitet &&
            periode1.morsAktivitet === periode2.morsAktivitet &&
            periode1.oppholdÅrsak === periode2.oppholdÅrsak &&
            periode1.utsettelseÅrsak === periode2.utsettelseÅrsak &&
            periode1.overføringÅrsak === periode2.overføringÅrsak &&
            periode1.resultat?.innvilget === periode2.resultat?.innvilget &&
            periode1.resultat?.trekkerDager === periode2.resultat?.trekkerDager &&
            periode1.resultat?.trekkerMinsterett === periode2.resultat?.trekkerMinsterett &&
            periode1.resultat?.årsak === periode2.resultat?.årsak &&
            periode1.samtidigUttak === periode2.samtidigUttak
        );
    }

    return false;
};

// TODO (TOR) DEtte er en duplikat - rydd
export const erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato = (
    valgtePerioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) =>
    valgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(
            UttaksdagenString.denneEllerNeste(familiehendelsedato).getDatoAntallUttaksdagerSenere(30),
        ),
    );

export const erDetEksisterendePerioderEtterValgtePerioder = (
    allePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isSameOrAfter(sisteValgteDag));
    return perioderEtterValgte.length > 0;
};

export const erDetReadonlyPerioderEtterValgtePerioder = (
    allePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
    forelderSomHarLåstePerioder: BrukerRolleSak_fpoversikt | undefined,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isSameOrAfter(sisteValgteDag));

    const harEøsEllerPleiepenger = perioderEtterValgte.some(
        (p) => erEøsUttakPeriode(p) || (erVanligUttakPeriode(p) && p.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'),
    );
    const harAnnenPartSomErLåst = forelderSomHarLåstePerioder
        ? perioderEtterValgte.some((p) => erVanligUttakPeriode(p) && p.forelder === forelderSomHarLåstePerioder)
        : false;

    return harEøsEllerPleiepenger || harAnnenPartSomErLåst;
};

export const erSøkersPerioder = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    erFarMedmor: boolean,
) => {
    return erVanligUttakPeriode(periode) && periode.forelder === (erFarMedmor ? 'FAR_MEDMOR' : 'MOR');
};
