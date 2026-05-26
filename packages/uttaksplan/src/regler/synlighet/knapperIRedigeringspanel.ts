import type { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

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

export const VIS_UTSETTELSESKNAPP: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.visUtsettelse',
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

export const VIS_PAUSEKNAPP: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.visPause',
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

export const VIS_FERIEKNAPP: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.visFerie',
    beskrivelse:
        '«Legg til ferie»-knappen vises som hovedalternativ når verken utsettelse eller pause er tilgjengelig. ' +
        'For far/medmor med BARE_SØKER_RETT skjules den likevel hvis minst én valgt periode ligger på eller ' +
        'etter seks uker etter familiehendelsesdato — der er pause det riktige valget i stedet for ferie.',
    skalVises: (k) =>
        !VIS_UTSETTELSESKNAPP.skalVises(k) &&
        !VIS_PAUSEKNAPP.skalVises(k) &&
        !(
            harBareFarRett(k) &&
            UttaksperiodeValidatorer.erNoenPerioderLikEllerEtter6UkerEtterFamiliehendelsedato(
                [...k.sammenslåtteValgtePerioder],
                k.familiehendelsedato,
            )
        ),
};

export const BRUK_LEGG_TIL_TEKST_PÅ_FERIEKNAPP: Synlighetsregel<KnapperIRedigeringspanelKontekst> = {
    id: 'knapperIRedigeringspanel.brukLeggTilTekstPåFerieknapp',
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

export const KNAPPER_I_REDIGERINGSPANEL_REGLER = [
    VIS_UTSETTELSESKNAPP,
    VIS_PAUSEKNAPP,
    VIS_FERIEKNAPP,
    BRUK_LEGG_TIL_TEKST_PÅ_FERIEKNAPP,
] as const;

export type KnapperIRedigeringspanelSynlighet = {
    visUtsettelsesknapp: boolean;
    visPauseknapp: boolean;
    visFerieknapp: boolean;
    brukLeggTilTekstPåFerieknapp: boolean;
};

/**
 * Avgjer kva «legg til»-knappar som skal vises i redigeringspanelet,
 * og kva tekst som brukes på ferie-knappen, gitt søker, rettighet,
 * familiesituasjon og dei valgte periodene.
 */
export const synlighetForKnapperIRedigeringspanel = (
    kontekst: KnapperIRedigeringspanelKontekst,
): KnapperIRedigeringspanelSynlighet => ({
    visUtsettelsesknapp: VIS_UTSETTELSESKNAPP.skalVises(kontekst),
    visPauseknapp: VIS_PAUSEKNAPP.skalVises(kontekst),
    visFerieknapp: VIS_FERIEKNAPP.skalVises(kontekst),
    brukLeggTilTekstPåFerieknapp: BRUK_LEGG_TIL_TEKST_PÅ_FERIEKNAPP.skalVises(kontekst),
});
