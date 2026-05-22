import type {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    KontoTypeUttak,
    RettighetType_fpoversikt,
} from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Synlighetsområde, Synlighetsregel } from './types';

export type ForelderValg = BrukerRolleSak_fpoversikt | 'BEGGE' | undefined;

export type FeltSynlighetKontekst = {
    forelder: ForelderValg;
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    kontoTypeMor: KontoTypeUttak | undefined;
    kontoTypeFarMedmor: KontoTypeUttak | undefined;
    ønskerFlerbarnsdager: boolean | undefined;
    antallBarn: number;
    samtidigUttaksprosentMor: string | undefined;
    stillingsprosentMor: string | undefined;
    familiesituasjon: Familiesituasjon;
    valgtePerioder: Array<{ fom: string; tom: string }>;
    familiehendelsedato: string;
};

const morSøkerOmOverføring = (k: FeltSynlighetKontekst) =>
    k.kontoTypeMor === 'FEDREKVOTE' && k.forelder === 'MOR';

const farMedmorSøkerOmOverføring = (k: FeltSynlighetKontekst) =>
    k.kontoTypeFarMedmor === 'MØDREKVOTE' && k.forelder === 'FAR_MEDMOR';

const erFarMedmorUtenAleneomsorg = (k: FeltSynlighetKontekst) =>
    k.forelder === 'FAR_MEDMOR' &&
    k.rettighetType !== 'ALENEOMSORG' &&
    (k.kontoTypeFarMedmor === 'FORELDREPENGER' || k.kontoTypeFarMedmor === 'FELLESPERIODE') &&
    !k.ønskerFlerbarnsdager;

const morsTotaleProsent = (k: FeltSynlighetKontekst) => {
    const samtidigUttak = k.forelder === 'BEGGE' ? (getFloatFromString(k.samtidigUttaksprosentMor) ?? 0) : 0;
    const stilling = k.forelder === 'BEGGE' ? (getFloatFromString(k.stillingsprosentMor) ?? 0) : 0;
    return samtidigUttak + stilling;
};

export const VIS_FLERBARNSDAGER_SPØRSMÅL: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visFlerbarnsdager',
    beskrivelse:
        'Spørsmålet «Ønsker du å bruke flerbarnsdager?» vises bare ved flerbarnssituasjon (antall barn > 1), ' +
        'når forelderen ikke er mor, og når kontotypen for far/medmor ikke er mødrekvote eller aktivitetsfri kvote.',
    skalVises: (k) =>
        k.antallBarn > 1 &&
        k.forelder !== 'MOR' &&
        k.kontoTypeFarMedmor !== 'MØDREKVOTE' &&
        k.kontoTypeFarMedmor !== 'AKTIVITETSFRI_KVOTE',
};

export const VIS_MOR_OVERFØRING: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visMorOverføring',
    beskrivelse:
        'Overføring av fedrekvote til mor vises som eget infoavsnitt og spørsmål om overføringsårsak når ' +
        'mor er valgt forelder og kontotypen er fedrekvote.',
    skalVises: morSøkerOmOverføring,
};

export const VIS_FAR_MEDMOR_OVERFØRING: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visFarMedmorOverføring',
    beskrivelse:
        'Overføring av mødrekvote til far/medmor vises som eget infoavsnitt og spørsmål om overføringsårsak ' +
        'når far/medmor er valgt forelder og kontotypen er mødrekvote.',
    skalVises: farMedmorSøkerOmOverføring,
};

export const VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visMorsAktivitetskravVedSamtidigUttak',
    beskrivelse:
        'Ved samtidig uttak (forelder = Begge) på fellesperiode må mor utløse aktivitetskravet dersom hun ikke ' +
        'samlet er minst 100 % på arbeid + samtidig uttak. Vises ikke hvis flerbarnsdager er valgt — da gjelder ' +
        'ikke aktivitetskravet på samme måte.',
    skalVises: (k) =>
        !k.ønskerFlerbarnsdager &&
        k.forelder === 'BEGGE' &&
        k.kontoTypeFarMedmor === 'FELLESPERIODE' &&
        morsTotaleProsent(k) < 100,
};

const erValgtPeriodeInnenforFørsteSeksUkerEtterFødsel = (k: FeltSynlighetKontekst) =>
    k.familiesituasjon !== 'adopsjon' &&
    UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
        k.valgtePerioder,
        k.familiehendelsedato,
    );

export const VIS_AKTIVITETSKRAV_FORDI_FEDREKVOTE_FØRSTE_SEKS_UKER: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visAktivitetskravFordiFedrekvoteFørsteSeksUker',
    beskrivelse:
        'Far/medmor som tar ut fedrekvote i de første seks ukene etter fødsel/termin må dokumentere mors ' +
        'aktivitet. Gjelder ikke ved aleneomsorg, og ikke ved adopsjon.',
    skalVises: (k) =>
        k.forelder === 'FAR_MEDMOR' &&
        k.rettighetType !== 'ALENEOMSORG' &&
        k.kontoTypeFarMedmor === 'FEDREKVOTE' &&
        erValgtPeriodeInnenforFørsteSeksUkerEtterFødsel(k),
};

export const VIS_AKTIVITETSKRAV_FELT: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visAktivitetskravFelt',
    beskrivelse:
        'Spørsmålet om mors aktivitet vises når far/medmor tar ut foreldrepenger eller fellesperiode uten ' +
        'aleneomsorg (og uten flerbarnsdager), eller når aktivitetskravet trigges av samtidig uttak, eller ' +
        'når fedrekvote tas i de første seks ukene etter fødsel.',
    skalVises: (k) =>
        erFarMedmorUtenAleneomsorg(k) ||
        VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK.skalVises(k) ||
        VIS_AKTIVITETSKRAV_FORDI_FEDREKVOTE_FØRSTE_SEKS_UKER.skalVises(k),
};

export const VIS_SAMTIDIG_UTTAK_FELTER: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visSamtidigUttakFelter',
    beskrivelse:
        'Feltene for samtidig uttaksprosent (både mor og far/medmor) vises når brukeren har valgt at ' +
        'perioden gjelder begge foreldre.',
    skalVises: (k) => k.forelder === 'BEGGE',
};

export const VIS_KOMBINERE_ARBEID_OG_UTTAK_MOR: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visKombinereArbeidOgUttakMor',
    beskrivelse:
        'Spørsmålet om mor skal kombinere arbeid og uttak vises når mor er valgt forelder (Mor eller Begge), ' +
        'kvotetype er valgt, og mor ikke søker om overføring av fedrekvote.',
    skalVises: (k) =>
        k.kontoTypeMor !== undefined && k.forelder !== 'FAR_MEDMOR' && !morSøkerOmOverføring(k),
};

export const VIS_KOMBINERE_ARBEID_OG_UTTAK_FAR_MEDMOR: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'felt.visKombinereArbeidOgUttakFarMedmor',
    beskrivelse:
        'Spørsmålet om far/medmor skal kombinere arbeid og uttak vises når far/medmor er valgt forelder ' +
        '(Far/medmor eller Begge), og far/medmor ikke søker om overføring av mødrekvote.',
    skalVises: (k) => k.forelder !== 'MOR' && !farMedmorSøkerOmOverføring(k),
};

export const FELT_SYNLIGHET_REGLER = [
    VIS_FLERBARNSDAGER_SPØRSMÅL,
    VIS_MOR_OVERFØRING,
    VIS_FAR_MEDMOR_OVERFØRING,
    VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK,
    VIS_AKTIVITETSKRAV_FORDI_FEDREKVOTE_FØRSTE_SEKS_UKER,
    VIS_AKTIVITETSKRAV_FELT,
    VIS_SAMTIDIG_UTTAK_FELTER,
    VIS_KOMBINERE_ARBEID_OG_UTTAK_MOR,
    VIS_KOMBINERE_ARBEID_OG_UTTAK_FAR_MEDMOR,
] as const;

export const FELT_SYNLIGHET_OMRÅDE: Synlighetsområde = {
    id: 'FeltSynlighet',
    område: 'Hvilke felter, infobokser og oppfølgingsspørsmål vises i skjemaet?',
    beskrivelse:
        'Avhengig av hvilken forelder, kvotetype og rettighet brukeren har, blir ulike felter relevante. ' +
        'Reglene under er det som bestemmer hva som vises etter forelderen er valgt.',
    regler: FELT_SYNLIGHET_REGLER,
};

export const synlighetForFelter = (kontekst: FeltSynlighetKontekst) => ({
    visFlerbarnsdager: VIS_FLERBARNSDAGER_SPØRSMÅL.skalVises(kontekst),
    visMorOverføring: VIS_MOR_OVERFØRING.skalVises(kontekst),
    visFarMedmorOverføring: VIS_FAR_MEDMOR_OVERFØRING.skalVises(kontekst),
    visMorsAktivitetskravVedSamtidigUttak: VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK.skalVises(kontekst),
    visAktivitetskravFordiFedrekvoteFørsteSeksUker:
        VIS_AKTIVITETSKRAV_FORDI_FEDREKVOTE_FØRSTE_SEKS_UKER.skalVises(kontekst),
    visAktivitetskravFelt: VIS_AKTIVITETSKRAV_FELT.skalVises(kontekst),
    visSamtidigUttakFelter: VIS_SAMTIDIG_UTTAK_FELTER.skalVises(kontekst),
    visKombinereArbeidOgUttakMor: VIS_KOMBINERE_ARBEID_OG_UTTAK_MOR.skalVises(kontekst),
    visKombinereArbeidOgUttakFarMedmor: VIS_KOMBINERE_ARBEID_OG_UTTAK_FAR_MEDMOR.skalVises(kontekst),
    erValgtPeriodeInnenforFørsteSeksUkerEtterFødsel: erValgtPeriodeInnenforFørsteSeksUkerEtterFødsel(kontekst),
});

type FormVerdier = {
    forelder: ForelderValg;
    kontoTypeMor: KontoTypeUttak | undefined;
    kontoTypeFarMedmor: KontoTypeUttak | undefined;
    ønskerFlerbarnsdager: boolean | undefined;
    samtidigUttaksprosentMor: string | undefined;
    stillingsprosentMor: string | undefined;
};

export const useFeltSynlighet = (valgtePerioder: Array<{ fom: string; tom: string }>, formVerdier: FormVerdier) => {
    const {
        foreldreInfo: { rettighetType, søker },
        familiehendelsedato,
        familiesituasjon,
        barn,
    } = useUttaksplanData();

    return synlighetForFelter({
        ...formVerdier,
        søker,
        rettighetType,
        antallBarn: barn.antallBarn,
        familiesituasjon,
        valgtePerioder,
        familiehendelsedato,
    });
};
