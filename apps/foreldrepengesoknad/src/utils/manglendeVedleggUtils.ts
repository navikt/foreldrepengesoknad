import { AnnenForelder, isAnnenForelderOppgitt } from '@navikt/fp-common';
import {
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan';

export const perioderSomKreverVedleggNy = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
    familiehendelsedato: string,
) => {
    const perioderSomManglerVedlegg = uttaksplan.filter((p) =>
        shouldPeriodeHaveAttachment(p, erFarEllerMedmor, annenForelder, familiehendelsedato),
    );

    return perioderSomManglerVedlegg;
};

const shouldPeriodeHaveAttachment = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
    familiehendelsedato: string,
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
            periode.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' ||
            periode.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER' ||
            ((søkerErFarEllerMedmor || periode.overføringÅrsak !== 'ALENEOMSORG') &&
                periode.overføringÅrsak !== 'IKKE_RETT_ANNEN_FORELDER')
        );
    }

    if (Uttaksperioden.erIkkeEøsPeriode(periode) && Uttaksperioden.erUttaksperiode(periode)) {
        return dokumentasjonBehøvesForUttaksperiode(periode, familiehendelsedato);
    }

    return false;
};

const skalBesvaresVedUtsettelse = (søkerErFarEllerMedmor: boolean, annenForelder: AnnenForelder): boolean => {
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge || annenForelder.harRettPåForeldrepengerIEØS
        : undefined;

    return søkerErFarEllerMedmor && annenForelderHarRett === false;
};

const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UttakUtsettelseÅrsak_fpoversikt) =>
    årsak === 'SØKER_SYKDOM' || årsak === 'SØKER_INNLAGT' || årsak === 'BARN_INNLAGT';

const dokumentasjonBehøvesForUttaksperiode = (
    periode: UttakPeriode_fpoversikt,
    familiehendelsedato: string,
): boolean => {
    const harIkkeAktivitetskrav = periode.kontoType === 'FORELDREPENGER' && periode.morsAktivitet === 'IKKE_OPPGITT';
    const erPeriodeMedFedrekvoteIFødselspermTidsrommet =
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode,
            familiehendelsedato,
            undefined,
        ) &&
        periode.kontoType === 'FEDREKVOTE' &&
        !periode.samtidigUttak;

    if (harIkkeAktivitetskrav) {
        return false;
    }

    return (
        (periode.morsAktivitet !== undefined && periode.morsAktivitet !== 'UFØRE') ||
        erPeriodeMedFedrekvoteIFødselspermTidsrommet
    );
};
