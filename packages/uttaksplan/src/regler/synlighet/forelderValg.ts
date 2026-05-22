import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useGyldigeKvotetyper } from '../kvotetype/kvoteRegler';
import { erEøsUttakPeriode } from '../../types/UttaksplanPeriode';
import { Periode } from '../types';
import { ForelderValg } from './feltSynlighet';
import { Synlighetsområde, Synlighetsregel } from './types';

export type ForelderValgKontekst = {
    forelder: ForelderValg;
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    erMorLåst: boolean;
    erFarMedmorLåst: boolean;
    erMinstEnEøsPeriode: boolean;
    harGyldigeKontoerForMor: boolean;
    harGyldigeKontoerForFarMedmor: boolean;
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

/**
 * Vis kvotetype-radiogruppen for mor.
 */
export const VIS_KONTO_MOR_RADIOGRUPPE: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visKontoMorRadiogruppe',
    beskrivelse:
        'Radiogruppen for å velge kvotetype for mor vises når den valgte forelderen er Mor eller Begge, ' +
        'og det finnes minst én gyldig stønadskontotype for mor.',
    skalVises: (k) => (k.forelder === 'MOR' || k.forelder === 'BEGGE') && k.harGyldigeKontoerForMor,
};

/**
 * Vis kvotetype-radiogruppen for far/medmor.
 */
export const VIS_KONTO_FAR_MEDMOR_RADIOGRUPPE: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visKontoFarMedmorRadiogruppe',
    beskrivelse:
        'Radiogruppen for å velge kvotetype for far/medmor vises når den valgte forelderen er Far/medmor ' +
        'eller Begge, og det finnes minst én gyldig stønadskontotype for far/medmor.',
    skalVises: (k) =>
        (k.forelder === 'FAR_MEDMOR' || k.forelder === 'BEGGE') && k.harGyldigeKontoerForFarMedmor,
};

export const FORELDER_VALG_REGLER = [
    VIS_MOR_RADIO,
    VIS_FAR_MEDMOR_RADIO,
    VIS_BEGGE_RADIO,
    VIS_KONTO_MOR_RADIOGRUPPE,
    VIS_KONTO_FAR_MEDMOR_RADIOGRUPPE,
] as const;

export const FORELDER_VALG_OMRÅDE: Synlighetsområde = {
    id: 'forelderValg',
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
    visKontoMorRadiogruppe: boolean;
    visKontoFarMedmorRadiogruppe: boolean;
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    erMorLåst: boolean;
    erFarMedmorLåst: boolean;
    gyldigeStønadskontoerForMor: ReturnType<typeof useGyldigeKvotetyper>['gyldigeStønadskontoerForMor'];
    gyldigeStønadskontoerForFarMedmor: ReturnType<
        typeof useGyldigeKvotetyper
    >['gyldigeStønadskontoerForFarMedmor'];
};

/**
 * Hook som regner ut synlighet for Mor/Far/Begge-radioknappene i
 * skjemaet for å legge til eller endre en periode. Henter gyldige
 * kvotetyper direkte via {@link useGyldigeKvotetyper} og kombinerer
 * det med EØS- og låst-status fra UttaksplanDataContext.
 */
export const useForelderValgSynlighet = (input: {
    valgtePerioder: Periode[];
    forelder: ForelderValg;
    ønskerFlerbarnsdager: boolean | undefined;
}): ForelderValgSynlighet => {
    const {
        foreldreInfo: { søker },
        erPeriodeneTilAnnenPartLåst,
        uttakPerioder,
    } = useUttaksplanData();

    const { gyldigeStønadskontoerForMor, gyldigeStønadskontoerForFarMedmor } = useGyldigeKvotetyper({
        valgtePerioder: input.valgtePerioder,
        harValgtSamtidigUttak: input.forelder === 'BEGGE',
        ønskerFlerbarnsdager: input.ønskerFlerbarnsdager,
    });

    const erMorGyldigForelder = gyldigeStønadskontoerForMor.length > 0;
    const erFarMedmorGyldigForelder = gyldigeStønadskontoerForFarMedmor.length > 0;
    const erMinstEnEøsPeriode = uttakPerioder.some((periode) => erEøsUttakPeriode(periode));
    const erFarMedmorLåst = erPeriodeneTilAnnenPartLåst && søker === 'MOR';
    const erMorLåst = erPeriodeneTilAnnenPartLåst && søker === 'FAR_MEDMOR';

    const kontekst: ForelderValgKontekst = {
        forelder: input.forelder,
        erMorGyldigForelder,
        erFarMedmorGyldigForelder,
        erMorLåst,
        erFarMedmorLåst,
        erMinstEnEøsPeriode,
        harGyldigeKontoerForMor: gyldigeStønadskontoerForMor.length > 0,
        harGyldigeKontoerForFarMedmor: gyldigeStønadskontoerForFarMedmor.length > 0,
    };

    return {
        visMor: VIS_MOR_RADIO.skalVises(kontekst),
        visFarMedmor: VIS_FAR_MEDMOR_RADIO.skalVises(kontekst),
        visBegge: VIS_BEGGE_RADIO.skalVises(kontekst),
        visKontoMorRadiogruppe: VIS_KONTO_MOR_RADIOGRUPPE.skalVises(kontekst),
        visKontoFarMedmorRadiogruppe: VIS_KONTO_FAR_MEDMOR_RADIOGRUPPE.skalVises(kontekst),
        erMorGyldigForelder,
        erFarMedmorGyldigForelder,
        erMorLåst,
        erFarMedmorLåst,
        gyldigeStønadskontoerForMor,
        gyldigeStønadskontoerForFarMedmor,
    };
};
