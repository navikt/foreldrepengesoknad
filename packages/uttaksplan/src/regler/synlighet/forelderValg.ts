import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useGyldigeKvotetyper } from '../kvotetype/kvoteRegler';
import { erEøsUttakPeriode } from '../../types/UttaksplanPeriode';
import { Periode } from '../types';
import { ForelderValg, Synlighetsregel } from './types';

/**
 * Hook som regner ut synlighet for Mor/Far/Begge-radioknappene i
 * skjemaet for å legge til eller endre en periode. Henter gyldige
 * kvotetyper direkte via {@link useGyldigeKvotetyper} og kombinerer
 * det med EØS- og låst-status fra UttaksplanDataContext.
 */
export const useForelderValgSynlighet = (
    valgtePerioder: Periode[],
    input: {
        forelder: ForelderValg;
        ønskerFlerbarnsdager: boolean | undefined;
    },
): ForelderValgSynlighet => {
    const {
        foreldreInfo: { søker, farOgFar },
        erPeriodeneTilAnnenPartLåst,
        uttakPerioder,
    } = useUttaksplanData();

    const { gyldigeStønadskontoerForMor, gyldigeStønadskontoerForFarMedmor } = useGyldigeKvotetyper({
        valgtePerioder,
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
        farOgFar: !!farOgFar,
    };

    return {
        visMorRadio: VIS_MOR_RADIO.skalVises(kontekst),
        visFarMedmorRadio: VIS_FAR_MEDMOR_RADIO.skalVises(kontekst),
        visBeggeRadio: VIS_BEGGE_RADIO.skalVises(kontekst),
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

type ForelderValgKontekst = {
    forelder: ForelderValg;
    erMorGyldigForelder: boolean;
    erFarMedmorGyldigForelder: boolean;
    erMorLåst: boolean;
    erFarMedmorLåst: boolean;
    erMinstEnEøsPeriode: boolean;
    harGyldigeKontoerForMor: boolean;
    harGyldigeKontoerForFarMedmor: boolean;
    farOgFar: boolean;
};

/**
 * Vis Mor-radioknappen: brukeren kan velge mor som forelder for perioden.
 */
export const VIS_MOR_RADIO: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visMorRadio',
    beskrivelse:
        'Mor-alternativet vises når mor er en gyldig forelder for den valgte perioden (mor har minst én ' +
        'gyldig stønadskontotype) og mor ikke er låst av annen parts plan.',
    skalVises: (k) => k.erMorGyldigForelder && !k.erMorLåst,
};

/**
 * Vis Far/medmor-radioknappen.
 */
export const VIS_FAR_MEDMOR_RADIO: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visFarMedmorRadio',
    beskrivelse:
        'Far/medmor-alternativet vises når far/medmor er en gyldig forelder for den valgte perioden ' +
        '(far/medmor har minst én gyldig stønadskontotype) og far/medmor ikke er låst av annen parts plan.',
    skalVises: (k) => k.erFarMedmorGyldigForelder && !k.erFarMedmorLåst,
};

/**
 * Vis Begge-radioknappen (samtidig uttak).
 */
export const VIS_BEGGE_RADIO: Synlighetsregel<ForelderValgKontekst> = {
    id: 'forelderValg.visBeggeRadio',
    beskrivelse:
        'Begge-alternativet (samtidig uttak) vises bare når både mor og far/medmor er gyldige foreldre ' +
        'for perioden, det ikke finnes noen EØS-perioder i planen, og det ikke er en far og far-sak — ' +
        'samtidig uttak støttes ikke i disse tilfellene.',
    skalVises: (k) => k.erMorGyldigForelder && k.erFarMedmorGyldigForelder && !k.erMinstEnEøsPeriode && !k.farOgFar,
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

type ForelderValgSynlighet = {
    visMorRadio: boolean;
    visFarMedmorRadio: boolean;
    visBeggeRadio: boolean;
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
