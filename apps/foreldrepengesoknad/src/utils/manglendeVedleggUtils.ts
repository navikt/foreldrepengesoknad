import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import {
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan';

/**
 * Finner periodene som faktisk inngår i denne søknaden, og som derfor kan kreve dokumentasjon.
 *
 * Filtrerer bort annen parts perioder, og – i en endringssøknad mot en eksisterende sak –
 * perioder som allerede er innvilget (de har et `resultat`). Uten dette ville søknaden f.eks.
 * be far om sykdomsdokumentasjon for fellesperiode mor syk som allerede er innvilget, selv om
 * han kun endrer/legger til en ny periode.
 */
export const finnPerioderSomInngårISøknaden = (
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
    erFarEllerMedmor: boolean,
    harEksisterendeSak: boolean,
): UttakPeriode_fpoversikt[] => {
    return uttaksplan.filter((periode): periode is UttakPeriode_fpoversikt => {
        if (!Uttaksperioden.erIkkeEøsPeriode(periode)) {
            return false;
        }
        const erSøkersPeriode = periode.forelder === (erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR');
        const erDelAvSøknaden = harEksisterendeSak ? periode.resultat === undefined : true;
        return erSøkersPeriode && erDelAvSøknaden;
    });
};

export const perioderSomKreverVedlegg = (
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
        return dokumentasjonBehøvesForUttaksperiode(periode, søkerErFarEllerMedmor, familiehendelsedato);
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
    søkerErFarEllerMedmor: boolean,
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

    // Dokumentasjon av mors aktivitet ("hva skal mor gjøre i denne perioden") skal kun kreves i
    // far/medmor sin søknad. I mors egen søknad skal det aldri kreves dokumentasjon for mors
    // aktivitet, uansett hvilken aktivitet hun velger.
    const krevesDokumentasjonAvMorsAktivitet =
        søkerErFarEllerMedmor && periode.morsAktivitet !== undefined && periode.morsAktivitet !== 'UFØRE';

    return krevesDokumentasjonAvMorsAktivitet || erPeriodeMedFedrekvoteIFødselspermTidsrommet;
};
