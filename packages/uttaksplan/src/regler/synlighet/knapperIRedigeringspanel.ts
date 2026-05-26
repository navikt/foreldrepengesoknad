import type { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import {
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
    erVanligUttakPeriode,
} from '../../types/UttaksplanPeriode';
import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode } from '../types';
import { Synlighetsregel } from './types';

/**
 * Konteksten knappereglane treng for å avgjere kva «Legg til»-knappar som
 * vises i redigeringspanelet (HvaVilDuEndreTilPanel), og kva tekst som
 * brukes på ferie-knappen.
 */
export type KnapperIRedigeringspanelKontekst = {
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
    erPeriodeneTilAnnenPartLåst: boolean;
};

const harBareFarRett = (k: KnapperIRedigeringspanelKontekst) =>
    k.søker === 'FAR_MEDMOR' && k.rettighetType === 'BARE_SØKER_RETT';

export const SKAL_VISE_UTSETTELSESKNAPP: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.skalViseUtsettelsesknapp',
    beskrivelse:
        '«Legg til utsettelse»-knappen vises kun for mor (ikke ved adopsjon), og bare når minst én av de ' +
        'sammenslåtte valgte periodene ligger innenfor intervallet fra familiehendelsesdato til og med seks ' +
        'uker etter — det er der utsettelsesreglene gjelder.',
    skalVises: (k) =>
        k.søker === 'MOR' &&
        k.familiesituasjon !== 'adopsjon' &&
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
            [...k.sammenslåtteValgtePerioder],
            k.familiehendelsedato,
        ),
};

export const SKAL_VISE_PAUSEKNAPP: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.skalVisePauseknapp',
    beskrivelse:
        '«Legg til pause»-knappen vises kun når far/medmor er aleneom rettigheter (BARE_SØKER_RETT), og når ' +
        'ingen av de valgte periodene ligger før seks uker etter familiehendelsesdato — pause er ikke gyldig ' +
        'i de første seks ukene.',
    skalVises: (k) =>
        harBareFarRett(k) &&
        !UttaksperiodeValidatorer.erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
            [...k.sammenslåtteValgtePerioder],
            k.familiehendelsedato,
        ),
};

export const SKAL_VISE_FERIEKNAPP: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.skalViseFerieknapp',
    beskrivelse:
        '«Legg til ferie»-knappen vises som hovedalternativ når verken utsettelse eller pause er tilgjengelig. ' +
        'For far/medmor med BARE_SØKER_RETT skjules den likevel hvis minst én valgt periode ligger på eller ' +
        'etter seks uker etter familiehendelsesdato — der er pause det riktige valget i stedet for ferie.',
    skalVises: (k) =>
        !SKAL_VISE_UTSETTELSESKNAPP.skalVises(k) &&
        !SKAL_VISE_PAUSEKNAPP.skalVises(k) &&
        !(
            harBareFarRett(k) &&
            UttaksperiodeValidatorer.erNoenPerioderLikEllerEtter6UkerEtterFamiliehendelsedato(
                [...k.sammenslåtteValgtePerioder],
                k.familiehendelsedato,
            )
        ),
};

export const SKAL_VISE_LEGG_TIL_KNAPPETEKST: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.skalViseLeggTilKnappetekst',
    beskrivelse:
        'Ferie-knappen sier «Legg til ferie» når brukeren ikke har valgt eksisterende perioder — da er ' +
        'handlingen reint additiv. Hvis brukeren har valgt eksisterende perioder, sier knappen «Endre til ' +
        'ferie» i staden — med ett unntak: når den andre partens perioder er låst og det er valgt minst én ' +
        'periode som tilhører den andre forelderen, faller vi tilbake til «Legg til ferie» (fordi vi ikke ' +
        'kan endre den andres perioder).',
    skalVises: (k) =>
        k.eksisterendePerioderSomErValgt.length === 0 ||
        (k.erPeriodeneTilAnnenPartLåst &&
            k.eksisterendePerioderSomErValgt.some((p) => erVanligUttakPeriode(p) && p.forelder !== k.søker)),
};

export type KnapperIRedigeringspanelSynlighet = {
    skalViseUtsettelsesknapp: boolean;
    skalVisePauseknapp: boolean;
    skalViseFerieknapp: boolean;
    skalViseLeggTilKnappetekst: boolean;
};

/**
 * Hook som avgjer kva «Legg til»-knappar som vises i redigeringspanelet,
 * og kva tekst som brukes på ferie-knappen. Hentar søker, rettighet,
 * familiesituasjon og familiehendelsedato sjølv frå UttaksplanData; kallaren
 * gir berre periodene som er aktuelle for dette render-passet.
 */
export const useKnapperIRedigeringspanelSynlighet = (input: {
    sammenslåtteValgtePerioder: readonly Periode[];
    eksisterendePerioderSomErValgt: ReadonlyArray<Uttaksplanperiode | UttaksplanperiodeMedKunTapteDager>;
}): KnapperIRedigeringspanelSynlighet => {
    const {
        foreldreInfo: { søker, rettighetType },
        familiesituasjon,
        familiehendelsedato,
        erPeriodeneTilAnnenPartLåst,
    } = useUttaksplanData();

    const kontekst: KnapperIRedigeringspanelKontekst = {
        søker,
        rettighetType,
        familiesituasjon,
        familiehendelsedato,
        erPeriodeneTilAnnenPartLåst,
        sammenslåtteValgtePerioder: input.sammenslåtteValgtePerioder,
        eksisterendePerioderSomErValgt: input.eksisterendePerioderSomErValgt,
    };

    return {
        skalViseUtsettelsesknapp: SKAL_VISE_UTSETTELSESKNAPP.skalVises(kontekst),
        skalVisePauseknapp: SKAL_VISE_PAUSEKNAPP.skalVises(kontekst),
        skalViseFerieknapp: SKAL_VISE_FERIEKNAPP.skalVises(kontekst),
        skalViseLeggTilKnappetekst: SKAL_VISE_LEGG_TIL_KNAPPETEKST.skalVises(kontekst),
    };
};
