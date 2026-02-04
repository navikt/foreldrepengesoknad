import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';
import {
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';

import { erUttaksperiode } from './uttaksplanInfoUtils';

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

    if (!('trekkdager' in periode) && erUttaksperiode(periode)) {
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

//FIXME (TOR) Er dette korrekt? Den gamle koden sjekkar fleire ting her INSTITUSJONSOPPHOLD_ANNEN_FORELDER og SYKDOM_ANNEN_FORELDER
const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UttakUtsettelseÅrsak_fpoversikt) =>
    årsak === 'SØKER_SYKDOM' || årsak === 'SØKER_INNLAGT' || årsak === 'BARN_INNLAGT';

const dokumentasjonBehøvesForUttaksperiode = (periode: UttakPeriode_fpoversikt): boolean => {
    const harIkkeAktivitetskrav = periode.kontoType === 'FORELDREPENGER' && periode.morsAktivitet === 'IKKE_OPPGITT';
    if (harIkkeAktivitetskrav) {
        return false;
    }

    return (
        periode.morsAktivitet !== undefined && periode.morsAktivitet !== 'UFØRE'
        // FIXME (TOR) TFP-6577  || (periode.kontoType === 'FEDREKVOTE' && periode.erMorForSyk === true)
    );
};
