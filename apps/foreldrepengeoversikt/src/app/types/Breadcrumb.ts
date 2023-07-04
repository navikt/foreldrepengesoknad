import OversiktRoutes from 'app/routes/routes';
import { assertUnreachable } from 'app/utils/globalUtils';

export interface Breadcrumb {
    displayName: string;
    route: string;
    isExternalLink: boolean;
}

export interface BreadcrumbMap {
    [key: string]: Breadcrumb[];
}

const nav: Breadcrumb = {
    displayName: 'nav.no',
    route: 'https://nav.no',
    isExternalLink: true,
};

const minSide: Breadcrumb = {
    displayName: 'Min side',
    route: 'https://www.nav.no/minside',
    isExternalLink: true,
};

const hovedside: Breadcrumb = {
    displayName: 'Foreldrepenger',
    route: OversiktRoutes.HOVEDSIDE,
    isExternalLink: false,
};

const saksoversikt: Breadcrumb = {
    displayName: 'Din sak',
    route: OversiktRoutes.SAKSOVERSIKT,
    isExternalLink: false,
};

const dokumenter: Breadcrumb = {
    displayName: 'Dokumenter',
    route: OversiktRoutes.DOKUMENTER,
    isExternalLink: false,
};

const ettersend: Breadcrumb = {
    displayName: 'Last opp',
    route: OversiktRoutes.ETTERSEND,
    isExternalLink: false,
};

const tidslinjen: Breadcrumb = {
    displayName: 'Hele prosessen',
    route: OversiktRoutes.TIDSLINJEN,
    isExternalLink: false,
};

const dinPlan: Breadcrumb = {
    displayName: 'Søknaden din',
    route: OversiktRoutes.DIN_PLAN,
    isExternalLink: false,
};

const oppgaver: Breadcrumb = {
    displayName: 'Din oppgave',
    route: OversiktRoutes.OPPGAVER,
    isExternalLink: false,
};

export const getBreadcrumbs = (selectedRoute: OversiktRoutes) => {
    switch (selectedRoute) {
        case OversiktRoutes.HOVEDSIDE:
            return [nav, minSide, hovedside];
        case OversiktRoutes.SAKSOVERSIKT:
            return [nav, minSide, hovedside, saksoversikt];
        case OversiktRoutes.DOKUMENTER:
            return [nav, minSide, hovedside, saksoversikt, dokumenter];
        case OversiktRoutes.ETTERSEND:
            return [nav, minSide, hovedside, saksoversikt, dokumenter, ettersend];
        case OversiktRoutes.TIDSLINJEN:
            return [nav, minSide, hovedside, saksoversikt, tidslinjen];
        case OversiktRoutes.DIN_PLAN:
            return [nav, minSide, hovedside, saksoversikt, dinPlan];
        case OversiktRoutes.OPPGAVER:
            return [nav, minSide, hovedside, saksoversikt, oppgaver];
        default:
            return assertUnreachable(selectedRoute, 'En rute mangler brødsmulesti');
    }
};
