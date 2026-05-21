import { Synlighetskapittel, Synlighetsregel } from './types';

export type ForelderValgKontekst = {
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    erMorLåst: boolean;
    erFarMedmorLåst: boolean;
    erMinstEnEøsPeriode: boolean;
};

/**
 * Vis Mor-radioknappen: brukeren kan velge mor som forelder for perioden.
 */
export const VIS_MOR_RADIO: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visMor',
    beskrivelse:
        'Mor-alternativet vises når mor er en gyldig forelder for den valgte perioden (mor har minst én ' +
        'gyldig stønadskontotype) og mor ikke er låst av annen parts plan.',
    skalVises: (k) => k.erMorGyldigForelder && !k.erMorLåst,
};

/**
 * Vis Far/medmor-radioknappen.
 */
export const VIS_FAR_MEDMOR_RADIO: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visFarMedmor',
    beskrivelse:
        'Far/medmor-alternativet vises når far/medmor er en gyldig forelder for den valgte perioden ' +
        '(far/medmor har minst én gyldig stønadskontotype) og far/medmor ikke er låst av annen parts plan.',
    skalVises: (k) => k.erFarMedmorGyldigForelder && !k.erFarMedmorLåst,
};

/**
 * Vis Begge-radioknappen (samtidig uttak).
 */
export const VIS_BEGGE_RADIO: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visBegge',
    beskrivelse:
        'Begge-alternativet (samtidig uttak) vises bare når både mor og far/medmor er gyldige foreldre ' +
        'for perioden, og det ikke finnes noen EØS-perioder i planen — samtidig uttak støttes ikke ' +
        'sammen med EØS-perioder.',
    skalVises: (k) => k.erMorGyldigForelder && k.erFarMedmorGyldigForelder && !k.erMinstEnEøsPeriode,
};

export const FORELDER_VALG_REGLER = [VIS_MOR_RADIO, VIS_FAR_MEDMOR_RADIO, VIS_BEGGE_RADIO] as const;

export const FORELDER_VALG_KAPITTEL: Synlighetskapittel = {
    id: 'ForelderValg',
    område: 'Hvilke alternativ vises i «Hvem gjelder perioden»-radiogruppen?',
    beskrivelse:
        'Når brukeren legger til eller endrer en periode, må det velges hvilken forelder perioden gjelder. ' +
        'Reglene under bestemmer hvilke alternativ (Mor, Far/medmor, Begge) som er tilgjengelige.',
    regler: FORELDER_VALG_REGLER,
};

/**
 * Helper som returnerer synlighetsflagg for alle tre Forelder-radioknappene
 * fra én kontekst. Gjør kallstedet kort og lesbart.
 */
export const synlighetForForelderValg = (kontekst: ForelderValgKontekst) => ({
    visMor: VIS_MOR_RADIO.skalVises(kontekst),
    visFarMedmor: VIS_FAR_MEDMOR_RADIO.skalVises(kontekst),
    visBegge: VIS_BEGGE_RADIO.skalVises(kontekst),
});
