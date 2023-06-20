import OversiktRoutes from 'app/routes/routes';

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

export const BREADCRUMBS: BreadcrumbMap = {
    [OversiktRoutes.HOVEDSIDE]: [nav, minSide, hovedside],
    [OversiktRoutes.SAKSOVERSIKT]: [nav, minSide, hovedside, saksoversikt],
    [OversiktRoutes.DOKUMENTER]: [nav, minSide, hovedside, saksoversikt, dokumenter],
    [OversiktRoutes.ETTERSEND]: [nav, minSide, hovedside, saksoversikt, dokumenter, ettersend],
    [OversiktRoutes.TIDSLINJEN]: [nav, minSide, hovedside, saksoversikt, tidslinjen],
    [OversiktRoutes.DIN_PLAN]: [nav, minSide, hovedside, saksoversikt, dinPlan],
};
