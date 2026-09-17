import { matchPath, useLocation } from 'react-router';

import { OversiktRoutes } from './routes';

// Rekkefølge betyr noe: mest spesifikke mønster (lengst sti) må stå før dei meir generelle,
// sidan me returnerer det første treffet.
const ROUTE_PATTERNS: Array<{ pattern: string; route: OversiktRoutes }> = [
    {
        pattern: `${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.DOKUMENTER}`,
        route: OversiktRoutes.DOKUMENTER,
    },
    {
        pattern: `${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.OPPGAVER}`,
        route: OversiktRoutes.OPPGAVER,
    },
    {
        pattern: `${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.ETTERSEND}`,
        route: OversiktRoutes.ETTERSEND,
    },
    {
        pattern: `${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.INNTEKTSMELDING}/:journalpostId`,
        route: OversiktRoutes.INNTEKTSMELDING,
    },
    {
        pattern: `${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.INNTEKTSMELDING}`,
        route: OversiktRoutes.INNTEKTSMELDING,
    },
    {
        pattern: `${OversiktRoutes.SAKSOVERSIKT}/:saksnummer/${OversiktRoutes.BEREGNING}`,
        route: OversiktRoutes.BEREGNING,
    },
    { pattern: `${OversiktRoutes.SAKSOVERSIKT}/:saksnummer`, route: OversiktRoutes.SAKSOVERSIKT },
    { pattern: OversiktRoutes.HOVEDSIDE, route: OversiktRoutes.HOVEDSIDE },
];

/**
 * Utleier gjeldande OversiktRoutes direkte frå URL-en, i staden for at kvar side må melde
 * frå om kva rute han er via delt state (som lett kjem ut av sync med faktisk navigasjon).
 */
export const useSelectedOversiktRoute = (): OversiktRoutes => {
    const location = useLocation();

    const treff = ROUTE_PATTERNS.find(({ pattern }) => matchPath(pattern, location.pathname));

    return treff?.route ?? OversiktRoutes.HOVEDSIDE;
};

const BACKGROUND_COLOR_BY_ROUTE: Record<OversiktRoutes, 'white' | 'blue'> = {
    [OversiktRoutes.HOVEDSIDE]: 'blue',
    [OversiktRoutes.SAKSOVERSIKT]: 'blue',
    [OversiktRoutes.OPPGAVER]: 'blue',
    [OversiktRoutes.BEREGNING]: 'blue',
    [OversiktRoutes.DOKUMENTER]: 'white',
    [OversiktRoutes.ETTERSEND]: 'white',
    [OversiktRoutes.INNTEKTSMELDING]: 'white',
    [OversiktRoutes.DIN_PLAN]: 'blue',
    [OversiktRoutes.BRUKT_OPPLYSNINGER_OM_ARBEIDSFORHOLD]: 'blue',
};

export const useOversiktBackgroundColor = (): 'white' | 'blue' => {
    const route = useSelectedOversiktRoute();
    return BACKGROUND_COLOR_BY_ROUTE[route];
};
