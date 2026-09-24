import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';

import { PeriodeDto_fpoversikt, UtsettelseÅrsak_fpoversikt, UttakDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan/validators';

/**
 * Finner periodene som faktisk inngår i denne søknaden, og som derfor kan kreve dokumentasjon.
 *
 * Filtrerer bort periodene der søkjar ikkje har eige uttak (periode.søker er ikkje sett, t.d.
 * reine opphaldsperiodar eller periodar som berre gjeld annan part), og – i en endringssøknad mot
 * en eksisterende sak – perioder som allerede er innvilget (de har et `resultat`). Uten dette
 * ville søknaden f.eks. be far om sykdomsdokumentasjon for fellesperiode mor syk som allerede er
 * innvilget, selv om han kun endrer/legger til en ny periode.
 */
export const finnPerioderSomInngårISøknaden = (
    uttaksplan: PeriodeDto_fpoversikt[],
    harEksisterendeSak: boolean,
): PeriodeDto_fpoversikt[] => {
    return uttaksplan.filter((periode) => {
        if (!periode.søker) {
            return false;
        }
        return harEksisterendeSak ? periode.søker.resultat === undefined : true;
    });
};

export const perioderSomKreverVedlegg = (
    uttaksplan: PeriodeDto_fpoversikt[],
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
    periode: PeriodeDto_fpoversikt,
    søkerErFarEllerMedmor: boolean,
    annenForelder: AnnenForelder,
    familiehendelsedato: string,
): boolean => {
    const søker = periode.søker;
    if (!søker) {
        return false;
    }

    if (søker.utsettelseÅrsak) {
        const årsak = søker.utsettelseÅrsak;
        return (
            skalBesvaresVedUtsettelse(søkerErFarEllerMedmor, annenForelder) ||
            erÅrsakSykdomEllerInstitusjonsopphold(årsak) ||
            årsak === 'HV_ØVELSE' ||
            årsak === 'NAV_TILTAK'
        );
    }
    if (søker.overføringÅrsak) {
        return (
            søker.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' ||
            søker.overføringÅrsak === 'SYKDOM_ANNEN_FORELDER' ||
            ((søkerErFarEllerMedmor || søker.overføringÅrsak !== 'ALENEOMSORG') &&
                søker.overføringÅrsak !== 'IKKE_RETT_ANNEN_FORELDER')
        );
    }

    if (Uttaksperioden.erUttaksperiode(søker)) {
        return dokumentasjonBehøvesForUttaksperiode(periode, søker, søkerErFarEllerMedmor, familiehendelsedato);
    }

    return false;
};

const skalBesvaresVedUtsettelse = (søkerErFarEllerMedmor: boolean, annenForelder: AnnenForelder): boolean => {
    const annenForelderHarRett = isAnnenForelderOppgitt(annenForelder)
        ? annenForelder.harRettPåForeldrepengerINorge || annenForelder.harRettPåForeldrepengerIEØS
        : undefined;

    return søkerErFarEllerMedmor && annenForelderHarRett === false;
};

const erÅrsakSykdomEllerInstitusjonsopphold = (årsak: UtsettelseÅrsak_fpoversikt) =>
    ['SØKER_SYKDOM', 'SØKER_INNLAGT', 'BARN_INNLAGT'].includes(årsak);

const dokumentasjonBehøvesForUttaksperiode = (
    periode: PeriodeDto_fpoversikt,
    søker: UttakDto_fpoversikt,
    søkerErFarEllerMedmor: boolean,
    familiehendelsedato: string,
): boolean => {
    const harIkkeAktivitetskrav = søker.kontoType === 'FORELDREPENGER' && søker.morsAktivitet === 'IKKE_OPPGITT';
    if (harIkkeAktivitetskrav) {
        return false;
    }

    const erPeriodeMedFedrekvoteIFødselspermTidsrommet =
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode,
            familiehendelsedato,
            undefined,
        ) &&
        søker.kontoType === 'FEDREKVOTE' &&
        !søker.samtidigUttak;

    // Dokumentasjon av mors aktivitet ("hva skal mor gjøre i denne perioden") skal kun kreves i
    // far/medmor sin søknad. I mors egen søknad skal det aldri kreves dokumentasjon for mors
    // aktivitet, uansett hvilken aktivitet hun velger.
    const krevesDokumentasjonAvMorsAktivitet =
        søkerErFarEllerMedmor && søker.morsAktivitet !== undefined && søker.morsAktivitet !== 'UFØRE';

    return krevesDokumentasjonAvMorsAktivitet || erPeriodeMedFedrekvoteIFødselspermTidsrommet;
};
