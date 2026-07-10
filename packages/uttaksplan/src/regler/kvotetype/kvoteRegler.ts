import type { BrukerRolleSak_fpoversikt, Familiesituasjon, KontoTypeUttak, RettighetType_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode } from '../types';
import { Kvoteregel } from './types';

/**
 * Hook som henter kontekst fra UttaksplanDataContext og returnerer
 * gyldige kvotetyper for mor og far/medmor basert på reglene i
 * `kvoteRegler.ts`.
 */
export const useGyldigeKvotetyper = (input: {
    valgtePerioder: Periode[];
    harValgtSamtidigUttak: boolean;
    ønskerFlerbarnsdager: boolean | undefined;
}): GyldigeKvoter => {
    const {
        foreldreInfo: { søker, rettighetType },
        familiehendelsedato,
        familiesituasjon,
        termindato,
        valgtStønadskvote,
    } = useUttaksplanData();

    const tilgjengelige = valgtStønadskvote.kontoer.map((k) => k.konto);

    const kontekst: KvoteKontekst = {
        søker,
        rettighetType,
        familiesituasjon,
        familiehendelsedato,
        termindato,
        valgtePerioder: input.valgtePerioder,
        harValgtSamtidigUttak: input.harValgtSamtidigUttak,
        ønskerFlerbarnsdager: input.ønskerFlerbarnsdager,
    };

    return {
        gyldigeStønadskontoerForMor: filtrer(MOR_KVOTE_REGLER, tilgjengelige, kontekst),
        gyldigeStønadskontoerForFarMedmor: filtrer(FAR_MEDMOR_KVOTE_REGLER, tilgjengelige, kontekst),
    };
};

type KvoteKontekst = {
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    termindato: string | undefined;
    valgtePerioder: Periode[];
    harValgtSamtidigUttak: boolean;
    ønskerFlerbarnsdager: boolean | undefined;
};

/* ---------- Felles helpers ---------- */

const harKunEnPartRett = (k: KvoteKontekst) =>
    k.rettighetType === 'ALENEOMSORG' || k.rettighetType === 'BARE_SØKER_RETT';

const kunFarHarRett = (k: KvoteKontekst) => k.søker === 'FAR_MEDMOR' && harKunEnPartRett(k);
const kunMorHarRett = (k: KvoteKontekst) => k.søker === 'MOR' && harKunEnPartRett(k);

const erAdopsjon = (k: KvoteKontekst) => k.familiesituasjon === 'adopsjon';

const harPeriodeFørFamiliehendelsesdato = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(k.valgtePerioder, k.familiehendelsedato);

const krysserFamiliehendelse = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderFørOgNoenLikEllerEtterFamiliehendelsesdato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );

const harPeriodeFørSeksUkerEtterFamiliehendelsesdato = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );

const harPeriodeMerEnn60DagerFørFamiliehendelsesdato = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderMerEnn60DagerFørFamiliehendelsesdato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );

const harPeriodeInnenforTreUkerFørFamDatoOgFamDato = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );

const harPeriodeInnenforFamDatoOgSeksUkerEtterFamDato = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );

const harPeriodeFørToUkerFørFamiliehendelsesdato = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderFørToUkerFørFamiliehendelsesdato(
        k.valgtePerioder,
        k.familiehendelsedato,
        k.termindato,
    );

const harPeriodeFørTreUkerFørFamDatoEllerEtterLikFamDato = (k: KvoteKontekst) =>
    UttaksperiodeValidatorer.erNoenPerioderFørTreUkerFørFamDatoEllerEtterLikFamDato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );

/** Felles forhåndsbetingelser som gjelder før vi sjekker den enkelte kvoten for mor. */
const morErAktuell = (k: KvoteKontekst): boolean => {
    if (kunFarHarRett(k)) {return false;}
    if (erAdopsjon(k) && harPeriodeFørFamiliehendelsesdato(k)) {return false;}
    if (krysserFamiliehendelse(k)) {return false;}
    return true;
};

/** Felles forhåndsbetingelser som gjelder før vi sjekker den enkelte kvoten for far/medmor. */
const farMedmorErAktuell = (k: KvoteKontekst): boolean => {
    if (kunMorHarRett(k)) {return false;}
    if (erAdopsjon(k) && harPeriodeFørFamiliehendelsesdato(k)) {return false;}
    if (!kunFarHarRett(k) && krysserFamiliehendelse(k)) {return false;}
    return true;
};

/* ---------- Regler for mor ---------- */

const MOR_AKTIVITETSFRI_KVOTE: Kvoteregel<KvoteKontekst> = {
    id: 'morKvoter.aktivitetsfriKvote',
    forelder: 'MOR',
    kontotype: 'AKTIVITETSFRI_KVOTE',
    beskrivelse: 'Aktivitetsfri kvote er aldri tilgjengelig for mor — denne kvotetypen gjelder bare far/medmor.',
    erGyldig: () => false,
};

const MOR_MØDREKVOTE: Kvoteregel<KvoteKontekst> = {
    id: 'morKvoter.mødrekvote',
    forelder: 'MOR',
    kontotype: 'MØDREKVOTE',
    beskrivelse:
        'Mødrekvote kan velges av mor når perioden ligger etter familiehendelsesdatoen og ikke krysser den. ' +
        'Mødrekvote kan ikke tas før fødsel/termin.',
    erGyldig: (k) => morErAktuell(k) && !harPeriodeFørFamiliehendelsesdato(k),
};

const MOR_FEDREKVOTE: Kvoteregel<KvoteKontekst> = {
    id: 'morKvoter.fedrekvote',
    forelder: 'MOR',
    kontotype: 'FEDREKVOTE',
    beskrivelse:
        'Mor kan velge fedrekvote (overføring fra far) når perioden ikke er samtidig uttak, og — utenom ' +
        'adopsjon — ikke ligger innenfor de første seks ukene etter familiehendelsesdatoen.',
    erGyldig: (k) => {
        if (!morErAktuell(k)) {return false;}
        if (k.harValgtSamtidigUttak) {return false;}
        if (!erAdopsjon(k) && harPeriodeFørSeksUkerEtterFamiliehendelsesdato(k)) {return false;}
        return true;
    },
};

const MOR_FORELDREPENGER: Kvoteregel<KvoteKontekst> = {
    id: 'morKvoter.foreldrepenger',
    forelder: 'MOR',
    kontotype: 'FORELDREPENGER',
    beskrivelse:
        'Foreldrepenger kan velges av mor ved adopsjon, eller ellers når perioden følger reglene om ' +
        'foreldrepenger rundt fødsel/termin: ved aleneomsorg/bare-mor-har-rett må perioden være innenfor ' +
        '60 dager før familiehendelsesdato og utenfor intervallet 3 uker før til familiehendelsesdato; ellers ' +
        'kan perioden ikke ligge innenfor de første seks ukene etter familiehendelsesdato.',
    erGyldig: (k) => {
        if (!morErAktuell(k)) {return false;}
        if (erAdopsjon(k)) {return true;}
        if (!harKunEnPartRett(k) && harPeriodeFørSeksUkerEtterFamiliehendelsesdato(k)) {return false;}
        if (harKunEnPartRett(k) && harPeriodeMerEnn60DagerFørFamiliehendelsesdato(k)) {return false;}
        if (harKunEnPartRett(k) && harPeriodeInnenforTreUkerFørFamDatoOgFamDato(k)) {return false;}
        return true;
    },
};

const MOR_FORELDREPENGER_FØR_FØDSEL: Kvoteregel<KvoteKontekst> = {
    id: 'morKvoter.foreldrepengerFørFødsel',
    forelder: 'MOR',
    kontotype: 'FORELDREPENGER_FØR_FØDSEL',
    beskrivelse:
        'Foreldrepenger før fødsel kan bare velges når perioden ligger innenfor de tre siste ukene før ' +
        'familiehendelsesdatoen og før selve datoen. Perioder som ligger lengre unna eller etter ' +
        'familiehendelsen er ikke gyldige.',
    erGyldig: (k) => morErAktuell(k) && !harPeriodeFørTreUkerFørFamDatoEllerEtterLikFamDato(k),
};

const MOR_FELLESPERIODE: Kvoteregel<KvoteKontekst> = {
    id: 'morKvoter.fellesperiode',
    forelder: 'MOR',
    kontotype: 'FELLESPERIODE',
    beskrivelse:
        'Fellesperiode kan velges av mor ved adopsjon, eller ellers når perioden ikke ligger i de seks ' +
        'første ukene etter familiehendelsesdato, ikke i intervallet 3 uker før familiehendelsesdato til ' +
        'familiehendelsesdatoen, og ikke mer enn 60 dager før familiehendelsesdatoen.',
    erGyldig: (k) => {
        if (!morErAktuell(k)) {return false;}
        if (erAdopsjon(k)) {return true;}
        if (harPeriodeInnenforFamDatoOgSeksUkerEtterFamDato(k)) {return false;}
        if (harPeriodeInnenforTreUkerFørFamDatoOgFamDato(k)) {return false;}
        if (harPeriodeMerEnn60DagerFørFamiliehendelsesdato(k)) {return false;}
        return true;
    },
};

/* ---------- Regler for far/medmor ---------- */

const FAR_MEDMOR_FORELDREPENGER_FØR_FØDSEL: Kvoteregel<KvoteKontekst> = {
    id: 'farMedmorKvoter.foreldrepengerFørFødsel',
    forelder: 'FAR_MEDMOR',
    kontotype: 'FORELDREPENGER_FØR_FØDSEL',
    beskrivelse:
        'Foreldrepenger før fødsel gjelder kun mor og er aldri tilgjengelig for far/medmor.',
    erGyldig: () => false,
};

const FAR_MEDMOR_MØDREKVOTE: Kvoteregel<KvoteKontekst> = {
    id: 'farMedmorKvoter.mødrekvote',
    forelder: 'FAR_MEDMOR',
    kontotype: 'MØDREKVOTE',
    beskrivelse:
        'Far/medmor kan velge mødrekvote (overføring fra mor) når perioden ikke er samtidig uttak, ikke ' +
        'ligger i intervallet 3 uker før familiehendelsesdato til familiehendelsesdatoen, og ikke ligger ' +
        'mer enn 2 uker før familiehendelsesdatoen.',
    erGyldig: (k) => {
        if (!farMedmorErAktuell(k)) {return false;}
        if (k.harValgtSamtidigUttak) {return false;}
        if (harPeriodeInnenforTreUkerFørFamDatoOgFamDato(k)) {return false;}
        if (harPeriodeFørToUkerFørFamiliehendelsesdato(k)) {return false;}
        return true;
    },
};

const FAR_MEDMOR_AKTIVITETSFRI_KVOTE: Kvoteregel<KvoteKontekst> = {
    id: 'farMedmorKvoter.aktivitetsfriKvote',
    forelder: 'FAR_MEDMOR',
    kontotype: 'AKTIVITETSFRI_KVOTE',
    beskrivelse:
        'Aktivitetsfri kvote kan velges av far/medmor når perioden ikke ligger mer enn 2 uker før ' +
        'familiehendelsesdatoen.',
    erGyldig: (k) => farMedmorErAktuell(k) && !harPeriodeFørToUkerFørFamiliehendelsesdato(k),
};

const FAR_MEDMOR_FEDREKVOTE: Kvoteregel<KvoteKontekst> = {
    id: 'farMedmorKvoter.fedrekvote',
    forelder: 'FAR_MEDMOR',
    kontotype: 'FEDREKVOTE',
    beskrivelse:
        'Fedrekvote kan velges av far/medmor når perioden ikke ligger mer enn 2 uker før ' +
        'familiehendelsesdatoen.',
    erGyldig: (k) => farMedmorErAktuell(k) && !harPeriodeFørToUkerFørFamiliehendelsesdato(k),
};

const FAR_MEDMOR_FORELDREPENGER: Kvoteregel<KvoteKontekst> = {
    id: 'farMedmorKvoter.foreldrepenger',
    forelder: 'FAR_MEDMOR',
    kontotype: 'FORELDREPENGER',
    beskrivelse:
        'Foreldrepenger kan velges av far/medmor når perioden ikke ligger før familiehendelsesdatoen. ' +
        'Når kun far/medmor har rett (aleneomsorg eller bare søker rett), kan perioden i stedet ligge ' +
        'inntil to uker før familiehendelsesdatoen — samme grense som for de andre kvotetypene til ' +
        'far/medmor — siden det da ikke finnes noen annen forelder som kan dekke dagene før fødsel.',
    erGyldig: (k) => {
        if (!farMedmorErAktuell(k)) {return false;}
        if (kunFarHarRett(k)) {return !harPeriodeFørToUkerFørFamiliehendelsesdato(k);}
        return !harPeriodeFørFamiliehendelsesdato(k);
    },
};

const FAR_MEDMOR_FELLESPERIODE: Kvoteregel<KvoteKontekst> = {
    id: 'farMedmorKvoter.fellesperiode',
    forelder: 'FAR_MEDMOR',
    kontotype: 'FELLESPERIODE',
    beskrivelse:
        'Fellesperiode kan velges av far/medmor: ved flerbarnsdager er den alltid tilgjengelig. Ellers ' +
        'er den ikke gyldig dersom perioden ligger i intervallet 3 uker før familiehendelsesdato til ' +
        'familiehendelsesdatoen, mer enn 60 dager før familiehendelsesdatoen, mer enn 2 uker før ' +
        'familiehendelsesdatoen, eller i de første seks ukene etter familiehendelsesdato samtidig som ' +
        'samtidig uttak er valgt.',
    erGyldig: (k) => {
        if (!farMedmorErAktuell(k)) {return false;}
        if (k.ønskerFlerbarnsdager) {return true;}
        if (harPeriodeInnenforTreUkerFørFamDatoOgFamDato(k)) {return false;}
        if (harPeriodeMerEnn60DagerFørFamiliehendelsesdato(k)) {return false;}
        if (harPeriodeInnenforFamDatoOgSeksUkerEtterFamDato(k) && k.harValgtSamtidigUttak) {return false;}
        if (harPeriodeFørToUkerFørFamiliehendelsesdato(k)) {return false;}
        return true;
    },
};

/* ---------- Eksporterte samlinger ---------- */

export const MOR_KVOTE_REGLER: ReadonlyArray<Kvoteregel<KvoteKontekst>> = [
    MOR_MØDREKVOTE,
    MOR_FEDREKVOTE,
    MOR_FORELDREPENGER,
    MOR_FORELDREPENGER_FØR_FØDSEL,
    MOR_FELLESPERIODE,
    MOR_AKTIVITETSFRI_KVOTE,
];

export const FAR_MEDMOR_KVOTE_REGLER: ReadonlyArray<Kvoteregel<KvoteKontekst>> = [
    FAR_MEDMOR_MØDREKVOTE,
    FAR_MEDMOR_FEDREKVOTE,
    FAR_MEDMOR_FORELDREPENGER,
    FAR_MEDMOR_FELLESPERIODE,
    FAR_MEDMOR_AKTIVITETSFRI_KVOTE,
    FAR_MEDMOR_FORELDREPENGER_FØR_FØDSEL,
];

/* ---------- Helpers og hook ---------- */

/**
 * Filtrer kvotetyper som faktisk eksisterer i søknadens stønadskontoer
 * etter hvilke regler som godkjenner dem for en gitt forelder. Bevarer
 * rekkefølgen fra `valgtStønadskvote.kontoer`.
 */
const filtrer = (
    regler: ReadonlyArray<Kvoteregel<KvoteKontekst>>,
    tilgjengelige: readonly KontoTypeUttak[],
    kontekst: KvoteKontekst,
): KontoTypeUttak[] => {
    const regelForKonto = new Map(regler.map((r) => [r.kontotype, r]));
    return tilgjengelige.filter((konto) => regelForKonto.get(konto)?.erGyldig(kontekst) ?? false);
};

type GyldigeKvoter = {
    gyldigeStønadskontoerForMor: KontoTypeUttak[];
    gyldigeStønadskontoerForFarMedmor: KontoTypeUttak[];
};
