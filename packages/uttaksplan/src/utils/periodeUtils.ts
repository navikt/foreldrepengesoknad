import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isoWeekday from 'dayjs/plugin/isoWeek';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

import {
    BrukerRolleSak_fpoversikt,
    MorsAktivitet,
    RettighetType_fpoversikt,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { Tidsperioden, Uttaksdagen } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erVanligUttakPeriode,
} from '../types/UttaksplanPeriode';

dayjs.extend(isSameOrAfter);
dayjs.extend(minMax);
dayjs.extend(isoWeekday);

export const ANTALL_UTTAKSDAGER_TRE_UKER = 15;
export const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

// Vinduet er [familiehendelsesdato - 15 uttaksdager, familiehendelsesdato + 30 uttaksdager] –
// dvs. 3 veker før og 6 veker etter (matchar UI-validatoren).
export const getAntallUttaksdagerIVinduRundtFødsel = (
    periodeFom: string,
    periodeTom: string,
    familiehendelsedato: string,
): number => {
    const familiehendelseSomUttaksdag = Uttaksdagen.denneEllerNeste(familiehendelsedato);
    const førsteDagIVindu = familiehendelseSomUttaksdag.getDatoAntallUttaksdagerTidligere(ANTALL_UTTAKSDAGER_TRE_UKER);
    // getDatoAntallUttaksdagerSenere(N) returnerer den (N+1)-te uttaksdagen frå familiehendelse,
    // så vi brukar (30 - 1) for å treffe den 30. (siste) uttaksdagen i seksvekersvinduet.
    const sisteDagIVindu = familiehendelseSomUttaksdag.getDatoAntallUttaksdagerSenere(
        ANTALL_UTTAKSDAGER_SEKS_UKER - 1,
    );

    const overlappFom = dayjs(periodeFom).isAfter(førsteDagIVindu, 'day') ? periodeFom : førsteDagIVindu;
    const overlappTom = dayjs(periodeTom).isBefore(sisteDagIVindu, 'day') ? periodeTom : sisteDagIVindu;

    if (dayjs(overlappFom).isAfter(overlappTom, 'day')) {
        return 0;
    }

    return Uttaksdagen.denneEllerNeste(overlappFom).getUttaksdagerFremTilOgMedDato(overlappTom);
};

export const erUttaksperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.utsettelseÅrsak === undefined;
};

export const erPrematuruker = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.kontoType !== undefined &&
        periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const erUtsettelsesperiode = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.utsettelseÅrsak !== undefined &&
        periode.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const erOverføringsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.overføringÅrsak !== undefined;
};

export const erOppholdsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.oppholdÅrsak !== undefined;
};

export const erAvslåttPeriode = (periode: Uttaksplanperiode) => {
    return 'resultat' in periode && periode.resultat && periode.resultat.innvilget !== true;
};

export const sorterPerioder = (a: { fom: string; tom: string }, b: { fom: string; tom: string }): number => {
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

export const sorterUttakPerioder = (
    p1: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    p2: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
) => {
    const tidsperiode1 = { fom: p1.fom, tom: p1.tom };
    const tidsperiode2 = { fom: p2.fom, tom: p2.tom };

    const tidsperiode1String = Tidsperioden.forPeriode(tidsperiode1);
    const tidsperiode2String = Tidsperioden.forPeriode(tidsperiode2);

    if (tidsperiode1String.erGyldig() === false || tidsperiode2String.erGyldig() === false) {
        return tidsperiode1String.erGyldig() ? 1 : -1;
    }
    if (dayjs(tidsperiode1.fom).isSame(tidsperiode2.fom, 'day')) {
        return 1;
    }

    if (tidsperiode2String.erOmsluttetAv(tidsperiode1)) {
        return 1;
    }

    return dayjs(tidsperiode1.fom).isBefore(tidsperiode2.fom, 'day') ? -1 : 1;
};

export const harPeriodeDerMorsAktivitetIkkeErValgt = (
    rettighetType: RettighetType_fpoversikt,
    perioder?: UttaksplanperiodeMedKunTapteDager[] | Uttaksplanperiode[],
) => {
    if (rettighetType === 'ALENEOMSORG' || !perioder) {
        return false;
    }

    const morHar100ProsentUttakOgGradering = (farPeriode: UttakPeriode_fpoversikt) =>
        perioder.some((morPeriode) => {
            if (!erVanligUttakPeriode(morPeriode) || morPeriode.forelder !== 'MOR') {
                return false;
            }

            const overlapper = Tidsperioden.forPeriode({ fom: farPeriode.fom, tom: farPeriode.tom }).overlapper({
                fom: morPeriode.fom,
                tom: morPeriode.tom,
            });

            const morsTotalprosent = (morPeriode.samtidigUttak ?? 0) + (morPeriode.gradering?.arbeidstidprosent ?? 0);

            return overlapper && morsTotalprosent === 100;
        });

    return perioder.some((periode) => {
        if (!erVanligUttakPeriode(periode)) {
            return false;
        }

        const erFarMedmorsKvote =
            periode.forelder === 'FAR_MEDMOR' &&
            (periode.kontoType === 'FELLESPERIODE' || periode.kontoType === 'FORELDREPENGER');

        const erInnvilgetUtenMorsAktivitet =
            periode.resultat?.innvilget !== false &&
            periode.morsAktivitet === undefined &&
            periode.flerbarnsdager === false;

        return erFarMedmorsKvote && erInnvilgetUtenMorsAktivitet && !morHar100ProsentUttakOgGradering(periode);
    });
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

export const erDetEksisterendePerioderEtterValgtePerioder = (
    allePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isAfter(sisteValgteDag));
    return perioderEtterValgte.length > 0;
};

export const erDetReadonlyPerioderEtterValgtePerioder = (
    allePerioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    valgtePerioder: Array<{ fom: string; tom: string }>,
    forelderSomHarLåstePerioder: BrukerRolleSak_fpoversikt | undefined,
) => {
    const sisteValgteDag = dayjs.max(valgtePerioder.map((p) => dayjs(p.tom)));
    const perioderEtterValgte = allePerioder.filter((p) => dayjs(p.tom).isAfter(sisteValgteDag));

    const harEøsEllerPleiepenger = perioderEtterValgte.some(
        (p) => erEøsUttakPeriode(p) || (erVanligUttakPeriode(p) && p.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'),
    );
    const harAnnenPartSomErLåst = forelderSomHarLåstePerioder
        ? perioderEtterValgte.some((p) => erVanligUttakPeriode(p) && p.forelder === forelderSomHarLåstePerioder)
        : false;

    return harEøsEllerPleiepenger || harAnnenPartSomErLåst;
};

export const getAktivitetskravOptions = (skalViseMorsAktivitetskravVedSamtidigUttak: boolean): MorsAktivitet[] => {
    const aktivitetsKrav = [
        'ARBEID',
        'UTDANNING',
        'KVALPROG',
        'INTROPROG',
        'TRENGER_HJELP',
        'INNLAGT',
        'ARBEID_OG_UTDANNING',
    ] satisfies MorsAktivitet[];

    return skalViseMorsAktivitetskravVedSamtidigUttak
        ? aktivitetsKrav.filter((k) => k !== 'INNLAGT' && k !== 'TRENGER_HJELP')
        : aktivitetsKrav;
};

export const getAktivitetskravTekst = (value: MorsAktivitet, intl: IntlShape) => {
    switch (value) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Arbeid' });
        case 'UTDANNING':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Utdanning' });
        case 'KVALPROG':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Kvalprog' });
        case 'INTROPROG':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Introprog' });
        case 'TRENGER_HJELP':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Trenger_hjelp' });
        case 'INNLAGT':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Innlagt' });
        case 'ARBEID_OG_UTDANNING':
            return intl.formatMessage({ id: 'AktivitetskravSpørsmål.Arbeid_og_utdanning' });
        default:
            return '';
    }
};
