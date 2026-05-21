export type { Alertregel, Alertområde } from './types';
export type { BlokkerandeAlertKontekst, KontekstuellAlertKontekst } from './skjemaAlerts';
export {
    BLOKKERANDE_ALERTS,
    KONTEKSTUELLE_ALERTS,
    BLOKKERANDE_ALERT_OMRÅDE,
    KONTEKSTUELL_ALERT_OMRÅDE,
    finnFørsteBlokkerandeAlert,
    useBlokkerandeAlert,
    skalViseGraderingAlert,
} from './skjemaAlerts';

import { Alertområde } from './types';
import { BLOKKERANDE_ALERT_OMRÅDE, KONTEKSTUELL_ALERT_OMRÅDE } from './skjemaAlerts';

/**
 * Alle alertregler i uttaksplan. Brukes av Storybook-siden for å
 * vise reglene samlet for designere, produkteiere og saksbehandlere.
 */
export const ALLE_ALERTREGLER: readonly Alertområde[] = [BLOKKERANDE_ALERT_OMRÅDE, KONTEKSTUELL_ALERT_OMRÅDE];
