import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useHentGyldigeKvotetyper } from '../kvotetype/kvoteRegler';
import { erEøsUttakPeriode } from '../../types/UttaksplanPeriode';
import { ForelderValg } from './feltSynlighet';
import { Synlighetsområde, Synlighetsregel } from './types';

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

export const FORELDER_VALG_OMRÅDE: Synlighetsområde = {
    id: 'ForelderValg',
    område: 'Hvilke alternativ vises i «Hvem gjelder perioden»-radiogruppen?',
    beskrivelse:
        'Når brukeren legger til eller endrer en periode, må det velges hvilken forelder perioden gjelder. ' +
        'Reglene under bestemmer hvilke alternativ (Mor, Far/medmor, Begge) som er tilgjengelige.',
    regler: FORELDER_VALG_REGLER,
};

export type ForelderValgSynlighet = {
    visMor: boolean;
    visFarMedmor: boolean;
    visBegge: boolean;
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    gyldigeStønadskontoerForMor: ReturnType<typeof useHentGyldigeKvotetyper>['gyldigeStønadskontoerForMor'];
    gyldigeStønadskontoerForFarMedmor: ReturnType<
        typeof useHentGyldigeKvotetyper
    >['gyldigeStønadskontoerForFarMedmor'];
};

/**
 * Hook som regner ut synlighet for Mor/Far/Begge-radioknappene i
 * skjemaet for å legge til eller endre en periode. Henter gyldige
 * kvotetyper direkte via {@link useHentGyldigeKvotetyper} og kombinerer
 * det med EØS- og låst-status fra UttaksplanDataContext.
 */
export const useForelderValgSynlighet = (input: {
    valgtePerioder: Array<{ fom: string; tom: string }>;
    forelder: ForelderValg;
    ønskerFlerbarnsdager: boolean | undefined;
}): ForelderValgSynlighet => {
    const {
        foreldreInfo: { søker },
        erPeriodeneTilAnnenPartLåst,
        uttakPerioder,
    } = useUttaksplanData();

    const { gyldigeStønadskontoerForMor, gyldigeStønadskontoerForFarMedmor } = useHentGyldigeKvotetyper(
        input.valgtePerioder,
        input.forelder === 'BEGGE',
        input.ønskerFlerbarnsdager,
    );

    const erMorGyldigForelder = gyldigeStønadskontoerForMor.length > 0;
    const erFarMedmorGyldigForelder = gyldigeStønadskontoerForFarMedmor.length > 0;
    const erMinstEnEøsPeriode = uttakPerioder.some((periode) => erEøsUttakPeriode(periode));
    const erFarMedmorLåst = erPeriodeneTilAnnenPartLåst && søker === 'MOR';
    const erMorLåst = erPeriodeneTilAnnenPartLåst && søker === 'FAR_MEDMOR';

    const kontekst: ForelderValgKontekst = {
        erMorGyldigForelder,
        erFarMedmorGyldigForelder,
        erMorLåst,
        erFarMedmorLåst,
        erMinstEnEøsPeriode,
    };

    return {
        visMor: VIS_MOR_RADIO.skalVises(kontekst),
        visFarMedmor: VIS_FAR_MEDMOR_RADIO.skalVises(kontekst),
        visBegge: VIS_BEGGE_RADIO.skalVises(kontekst),
        erMorGyldigForelder,
        erFarMedmorGyldigForelder,
        gyldigeStønadskontoerForMor,
        gyldigeStønadskontoerForFarMedmor,
    };
};
