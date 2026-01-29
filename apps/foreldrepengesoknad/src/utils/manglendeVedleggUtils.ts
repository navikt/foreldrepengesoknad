import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';
import {
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';

export const perioderSomKreverVedleggNy = (
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
    if ('utsettelseÅrsak' in periode && !!periode.utsettelseÅrsak) {
        const årsak = periode.utsettelseÅrsak;
        return (
            skalBesvaresVedUtsettelse(søkerErFarEllerMedmor, annenForelder) ||
            erÅrsakSykdomEllerInstitusjonsopphold(årsak) ||
            årsak === 'HV_ØVELSE' ||
            årsak === 'NAV_TILTAK'
        );
    }
    if ('overføringÅrsak' in periode && !!periode.overføringÅrsak) {
        return (
            (søkerErFarEllerMedmor || periode.overføringÅrsak !== 'ALENEOMSORG') &&
            periode.overføringÅrsak !== 'IKKE_RETT_ANNEN_FORELDER'
        );
    }

    if (!('trekkdager' in periode) && periode.utsettelseÅrsak === undefined) {
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

//FIXME (TOR) Er dette korrekt? Den gamle koden sjekkar fleire ting her
const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UttakUtsettelseÅrsak_fpoversikt) =>
    årsak === 'SØKER_SYKDOM' || årsak === 'SØKER_INNLAGT';

const dokumentasjonBehøvesForUttaksperiode = (periode: UttakPeriode_fpoversikt): boolean => {
    if (periodek.harIkkeAktivitetskrav) {
        return false;
    }

    return (
        (periode.morsAktivitetIPerioden !== undefined && periode.morsAktivitetIPerioden !== 'UFØRE') ||
        (periode.kontoType === 'FEDREKVOTE' && periode.erMorForSyk === true)
    );
};
