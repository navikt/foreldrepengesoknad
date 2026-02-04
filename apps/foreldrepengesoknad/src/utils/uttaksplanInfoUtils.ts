import dayjs from 'dayjs';

import { AnnenForelder, Periode, isAnnenForelderOppgitt } from '@navikt/fp-common';
import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import {
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

export const erUttaksperiode = (periode: UttakPeriode_fpoversikt) => {
    return !periode.overføringÅrsak && !periode.overføringÅrsak && !periode.utsettelseÅrsak;
};

export const erIkkeEøsPeriode = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
): periode is UttakPeriode_fpoversikt => {
    return !('trekkdager' in periode);
};

export const getSamtidigUttaksprosent = (
    gradertPeriode: boolean | undefined,
    stillingsprosent: string | undefined,
): string => {
    return gradertPeriode && stillingsprosent ? (100 - Number.parseInt(stillingsprosent, 10)).toString() : '100';
};

export const getRelevantePerioder = (
    perioder: Periode[],
    endringssøknadPerioder: Periode[] | undefined,
    erEndringssøknad: boolean,
) => {
    if (erEndringssøknad && endringssøknadPerioder !== undefined) {
        return endringssøknadPerioder;
    }

    return perioder;
};

export const prettifyProsent = (nbr: number | undefined): number | undefined => {
    if (nbr === undefined) {
        return undefined;
    }

    if (Number.isNaN(nbr)) {
        return undefined;
    }
    if (Math.round(nbr) === nbr) {
        return Math.round(nbr);
    }
    return nbr;
};

export const getUttaksprosentFromStillingsprosent = (
    stillingsPst: number | undefined,
    samtidigUttakPst: number | undefined,
): number | undefined => {
    if (samtidigUttakPst) {
        return samtidigUttakPst;
    }
    if (stillingsPst) {
        let prosent = (100 - stillingsPst) * 100;
        prosent = Math.round(prosent) / 100;

        return prosent;
    }
    return undefined;
};

export const isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
): boolean => {
    return (
        erUttaksperiode(periode) &&
        !('trekkdager' in periode) &&
        periode.forelder === 'FAR_MEDMOR' &&
        periode.kontoType === 'FEDREKVOTE' &&
        // FIXME (TOR) Kva skal ein erstatta dette med?
        // !!periode.erMorForSyk === false &&
        periode.morsAktivitet === undefined &&
        !!periode.flerbarnsdager === false &&
        !!periode.samtidigUttak
    );
};

export const isUttaksperiodeFarMedmorPgaFødsel = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    return (
        isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel(periode) &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(periode.fom, familiehendelsesdato, termindato)
    );
};

export const starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel = (
    fom: string,
    familiehendelsesdato: string,
    termindato: string | undefined,
) => {
    return (
        starterTidsperiodeEtter2UkerFørFødsel(fom, familiehendelsesdato, termindato) &&
        dayjs(fom).isSameOrBefore(getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato), 'day')
    );
};

const getSisteUttaksdag6UkerEtterFødsel = (familiehendelsesdato: string): string => {
    return UttaksdagenString.denneEllerNeste(familiehendelsesdato).getDatoAntallUttaksdagerSenere(30);
};

const starterTidsperiodeEtter2UkerFørFødsel = (
    fom: string,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    return dayjs(fom).isSameOrAfter(førsteUttaksdagToUkerFørFødsel, 'day');
};

const getFørsteUttaksdag2UkerFørFødsel = (familiehendelsesdato: string, termindato: string | undefined): string => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato !== undefined
            ? dayjs(termindato).subtract(14, 'day')
            : dayjs(familiehendelsesdato).subtract(14, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato));
    return UttaksdagenString.denneEllerNeste(datoÅRegneFra.format(ISO_DATE_FORMAT)).getDato();
};

export const kreverUttaksplanVedleggNy = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
) => {
    const periodeSomManglerVedlegg = perioderSomKreverVedlegg(uttaksplan, erFarEllerMedmor, annenForelder);

    return periodeSomManglerVedlegg.length > 0;
};

export const perioderSomKreverVedlegg = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
) => {
    const perioderSomManglerVedlegg = uttaksplan.filter((p) =>
        shouldPeriodeHaveAttachment(p, erFarEllerMedmor, annenForelder),
    );

    return perioderSomManglerVedlegg;
};

const shouldPeriodeHaveAttachment = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
): boolean => {
    if (erIkkeEøsPeriode(periode) && periode.overføringÅrsak) {
        return dokumentasjonBehøvesForOverføringsperiode(søkerErFarEllerMedmor, periode);
    }
    if (erIkkeEøsPeriode(periode) && periode.utsettelseÅrsak) {
        return dokumentasjonBehøvesForUtsettelsesperiode(
            periode,
            skalBesvaresVedUtsettelse(søkerErFarEllerMedmor, annenForelder),
        );
    }
    if (erIkkeEøsPeriode(periode) && erUttaksperiode(periode)) {
        return dokumentasjonBehøvesForUttaksperiode(periode);
    }

    return false;
};

const skalBesvaresVedUtsettelse = (søkerErFarEllerMedmor: boolean, annenForelder: AnnenForelder): boolean => {
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge || annenForelder.harRettPåForeldrepengerIEØS
        : undefined;

    return søkerErFarEllerMedmor && annenForelderHarRett === false;
};

export const dokumentasjonBehøvesForOverføringsperiode = (
    erFarEllerMedmor: boolean,
    periode: UttakPeriode_fpoversikt,
): boolean =>
    (erFarEllerMedmor || periode.overføringÅrsak !== 'ALENEOMSORG') &&
    periode.overføringÅrsak !== 'IKKE_RETT_ANNEN_FORELDER';

const dokumentasjonBehøvesForUtsettelsesperiode = (
    periode: UttakPeriode_fpoversikt,
    harMorAktivitetskrav: boolean,
): boolean => {
    return (
        harMorAktivitetskrav ||
        erÅrsakSykdomEllerInstitusjonsopphold(periode.utsettelseÅrsak) ||
        periode.utsettelseÅrsak === 'HV_ØVELSE' ||
        periode.utsettelseÅrsak === 'NAV_TILTAK'
    );
};

const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UttakUtsettelseÅrsak_fpoversikt | undefined) =>
    årsak === 'SØKER_SYKDOM' || årsak === 'BARN_INNLAGT' || årsak === 'SØKER_INNLAGT';
// FIXME (TOR) Kor finn ein desse to?
// ||
// årsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' ||
// årsak === 'SYKDOM_ANNEN_FORELDER';

const dokumentasjonBehøvesForUttaksperiode = (periode: UttakPeriode_fpoversikt): boolean => {
    // FIXME (TOR) Treng ein denne?
    // if (periode.harIkkeAktivitetskrav) {
    //     return false;
    // }

    return (
        (periode.morsAktivitet !== undefined && periode.morsAktivitet !== 'UFØRE') || periode.kontoType === 'FEDREKVOTE'
        // FIXME (TOR) Fiks felt for erMorForSyk
        /// && periode.erMorForSyk === true)
    );
};
