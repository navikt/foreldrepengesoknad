import type {
    BrukerRolleSak_fpoversikt,
    Familiesituasjon,
    KontoTypeUttak,
    RettighetType_fpoversikt,
} from '@navikt/fp-types';
import { getFloatFromString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode } from '../types';
import { ForelderValg, Synlighetsregel } from './types';

export const useFeltSynlighet = (valgtePerioder: Periode[], formVerdier: FormVerdier) => {
    const {
        foreldreInfo: { rettighetType, søker, erFarOgFar },
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
        erFarOgFar,
    });
};

type FeltSynlighetKontekst = {
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
    valgtePerioder: Periode[];
    familiehendelsedato: string;
    erFarOgFar?: boolean;
};

const morSøkerOmOverføring = (k: FeltSynlighetKontekst) => k.kontoTypeMor === 'FEDREKVOTE' && k.forelder === 'MOR';

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
    id: 'feltSynlighet.visFlerbarnsdager',
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
    id: 'feltSynlighet.visMorOverføring',
    beskrivelse:
        'Overføring av fedrekvote til mor vises som eget infoavsnitt og spørsmål om overføringsårsak når ' +
        'mor er valgt forelder og kontotypen er fedrekvote.',
    skalVises: morSøkerOmOverføring,
};

export const VIS_FAR_MEDMOR_OVERFØRING: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'feltSynlighet.visFarMedmorOverføring',
    beskrivelse:
        'Overføring av mødrekvote til far/medmor vises som eget infoavsnitt og spørsmål om overføringsårsak ' +
        'når far/medmor er valgt forelder og kontotypen er mødrekvote.',
    skalVises: farMedmorSøkerOmOverføring,
};

export const VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'feltSynlighet.visMorsAktivitetskravVedSamtidigUttak',
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
    id: 'feltSynlighet.visAktivitetskravFordiFedrekvoteFørsteSeksUker',
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
    id: 'feltSynlighet.visAktivitetskravFelt',
    beskrivelse:
        'Spørsmålet om mors aktivitet vises når far/medmor tar ut foreldrepenger eller fellesperiode uten ' +
        'aleneomsorg (og uten flerbarnsdager), eller når aktivitetskravet trigges av samtidig uttak, eller ' +
        'når fedrekvote tas i de første seks ukene etter fødsel. Vises aldri når begge foreldrene er fedre ' +
        '(erFarOgFar) – da finnes det ingen «mor» hvis aktivitet kan dokumenteres.',
    skalVises: (k) =>
        !k.erFarOgFar &&
        (erFarMedmorUtenAleneomsorg(k) ||
            VIS_MORS_AKTIVITETSKRAV_VED_SAMTIDIG_UTTAK.skalVises(k) ||
            VIS_AKTIVITETSKRAV_FORDI_FEDREKVOTE_FØRSTE_SEKS_UKER.skalVises(k)),
};

export const VIS_SAMTIDIG_UTTAK_FELTER: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'feltSynlighet.visSamtidigUttakFelter',
    beskrivelse:
        'Feltene for samtidig uttaksprosent (både mor og far/medmor) vises når brukeren har valgt at ' +
        'perioden gjelder begge foreldre.',
    skalVises: (k) => k.forelder === 'BEGGE',
};

export const VIS_KOMBINERE_ARBEID_OG_UTTAK_MOR: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'feltSynlighet.visKombinereArbeidOgUttakMor',
    beskrivelse:
        'Spørsmålet om mor skal kombinere arbeid og uttak vises når mor er valgt forelder (Mor eller Begge), ' +
        'kvotetype er valgt, og mor ikke søker om overføring av fedrekvote.',
    skalVises: (k) => k.kontoTypeMor !== undefined && k.forelder !== 'FAR_MEDMOR' && !morSøkerOmOverføring(k),
};

export const VIS_KOMBINERE_ARBEID_OG_UTTAK_FAR_MEDMOR: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'feltSynlighet.visKombinereArbeidOgUttakFarMedmor',
    beskrivelse:
        'Spørsmålet om far/medmor skal kombinere arbeid og uttak vises når far/medmor er valgt forelder ' +
        '(Far/medmor eller Begge), og far/medmor ikke søker om overføring av mødrekvote.',
    skalVises: (k) => k.forelder !== 'MOR' && !farMedmorSøkerOmOverføring(k),
};

const erValgtPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel = (k: FeltSynlighetKontekst) =>
    k.valgtePerioder.some((p) =>
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            p,
            k.familiehendelsedato,
            undefined,
        ),
    );

export const VIS_INFO_FEDREKVOTE_RUNDT_FØDSEL: Synlighetsregel<FeltSynlighetKontekst> = {
    id: 'feltSynlighet.visInfoFedrekvoteRundtFødsel',
    beskrivelse:
        'Infotekst om at far/medmor må bruke fedrekvotedager i perioden rundt fødsel vises når far/medmor ' +
        'er valgt forelder, kvotetypen er fedrekvote og minst én av de valgte dagene ligger i intervallet ' +
        'to uker før fødsel til seks uker etter fødsel.',
    skalVises: (k) =>
        k.forelder === 'FAR_MEDMOR' &&
        k.kontoTypeFarMedmor === 'FEDREKVOTE' &&
        erValgtPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(k),
};

const synlighetForFelter = (kontekst: FeltSynlighetKontekst) => ({
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
    visInfoFedrekvoteRundtFødsel: VIS_INFO_FEDREKVOTE_RUNDT_FØDSEL.skalVises(kontekst),
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
