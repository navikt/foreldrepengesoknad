import type { BrukerRolleSak_fpoversikt, Familiesituasjon, RettighetType_fpoversikt } from '@navikt/fp-types';

import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { Periode } from '../types';
import { Synlighetsregel } from './types';

/**
 * Konteksten knappereglane treng for å avgjere om
 * «Legg til utsettelse / pause / ferie»-knappane skal vises i
 * redigeringspanelet (HvaVilDuEndreTilPanel).
 */
export type KnapperIRedigeringspanelKontekst = {
    søker: BrukerRolleSak_fpoversikt;
    rettighetType: RettighetType_fpoversikt;
    familiesituasjon: Familiesituasjon;
    familiehendelsedato: string;
    sammenslåtteValgtePerioder: readonly Periode[];
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

export const KNAPPER_I_REDIGERINGSPANEL_REGLER = [
    VIS_UTSETTELSESKNAPP,
    VIS_PAUSEKNAPP,
    VIS_FERIEKNAPP,
] as const;

export type KnapperIRedigeringspanelSynlighet = {
    visUtsettelsesknapp: boolean;
    visPauseknapp: boolean;
    visFerieknapp: boolean;
};

/**
 * Avgjer kva «legg til»-knappar som skal vises i redigeringspanelet
 * gitt søker, rettighet, familiesituasjon og dei valgte periodene.
 */
export const synlighetForKnapperIRedigeringspanel = (
    kontekst: KnapperIRedigeringspanelKontekst,
): KnapperIRedigeringspanelSynlighet => ({
    visUtsettelsesknapp: VIS_UTSETTELSESKNAPP.skalVises(kontekst),
    visPauseknapp: VIS_PAUSEKNAPP.skalVises(kontekst),
    visFerieknapp: VIS_FERIEKNAPP.skalVises(kontekst),
});
