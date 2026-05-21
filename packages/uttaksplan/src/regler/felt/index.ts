import { Feltregelområde } from '../types';
import { HVA_VIL_DU_GJØRE_OMRÅDE } from './hvaVilDuGjøre';
import { SAMTIDIG_UTTAKSPROSENT_OMRÅDE } from './samtidigUttaksprosent';
import { STILLINGSPROSENT_OMRÅDE } from './stillingsprosent';

export { lagStillingsprosentValidator } from './stillingsprosent';
export { lagSamtidigUttaksprosentValidator } from './samtidigUttaksprosent';
export { lagHvaVilDuGjøreValidatorer } from './hvaVilDuGjøre';
export type { HvaVilDuGjøreInput } from './hvaVilDuGjøre';
export type { StillingsprosentInput } from './stillingsprosent';
export type { SamtidigUttaksprosentInput } from './samtidigUttaksprosent';

/**
 * Alle feltregler i uttaksplan. Brukes av Storybook-siden til å vise reglene
 * samlet for designere, produkteiere og saksbehandlere.
 */
export const ALLE_FELTREGLER: readonly Feltregelområde[] = [
    STILLINGSPROSENT_OMRÅDE,
    SAMTIDIG_UTTAKSPROSENT_OMRÅDE,
    HVA_VIL_DU_GJØRE_OMRÅDE,
];
