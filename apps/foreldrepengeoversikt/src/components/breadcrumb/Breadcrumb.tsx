import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { Outlet, useNavigate } from 'react-router-dom';

import { assertUnreachable } from '@navikt/fp-validation';

import { useGetSelectedRoute } from './../../hooks/useSelectedRoute';
import { useGetSelectedSak } from './../../hooks/useSelectedSak';
import { OversiktRoutes } from './../../routes/routes';

const minSide = {
    title: 'Min side',
    url: 'https://www.nav.no/minside' as const,
    handleInApp: false,
};

const hovedside = {
    title: 'Foreldrepenger',
    url: OversiktRoutes.HOVEDSIDE,
    handleInApp: true,
};

const saksoversikt = {
    title: 'Din sak',
    url: OversiktRoutes.SAKSOVERSIKT,
    handleInApp: true,
};

const dokumenter = {
    title: 'Dokumenter',
    url: OversiktRoutes.DOKUMENTER,
    handleInApp: true,
};

const ettersend = {
    title: 'Last opp',
    url: OversiktRoutes.ETTERSEND,
    handleInApp: true,
};

const dinPlan = {
    title: 'Søknaden din',
    url: OversiktRoutes.DIN_PLAN,
    handleInApp: true,
};

const oppgaver = {
    title: 'Din oppgave',
    url: OversiktRoutes.OPPGAVER,
    handleInApp: true,
};

const inntektsmelding = {
    title: 'Inntektsmelding',
    url: OversiktRoutes.INNTEKTSMELDING,
    handleInApp: true,
};

const beregning = {
    title: 'Beregning',
    url: OversiktRoutes.BEREGNING,
    handleInApp: true,
};

const getBreadcrumbs = (selectedRoute: OversiktRoutes) => {
    switch (selectedRoute) {
        case OversiktRoutes.HOVEDSIDE:
            return [minSide, hovedside];
        case OversiktRoutes.SAKSOVERSIKT:
            return [minSide, hovedside, saksoversikt];
        case OversiktRoutes.DOKUMENTER:
            return [minSide, hovedside, saksoversikt, dokumenter];
        case OversiktRoutes.ETTERSEND:
            return [minSide, hovedside, saksoversikt, dokumenter, ettersend];
        case OversiktRoutes.DIN_PLAN:
            return [minSide, hovedside, saksoversikt, dinPlan];
        case OversiktRoutes.OPPGAVER:
            return [minSide, hovedside, saksoversikt, oppgaver];
        case OversiktRoutes.INNTEKTSMELDING:
            return [minSide, hovedside, saksoversikt, inntektsmelding];
        case OversiktRoutes.BEREGNING:
            return [minSide, hovedside, saksoversikt, beregning];
        default:
            return assertUnreachable('En rute mangler brødsmulesti');
    }
};

const getRoute = (route: OversiktRoutes | 'https://www.nav.no/minside', saksnummer: string | undefined): string => {
    const sakRoute = `${OversiktRoutes.SAKSOVERSIKT}/${saksnummer}`;

    if (route === OversiktRoutes.SAKSOVERSIKT && saksnummer) {
        return sakRoute;
    }

    if (route === OversiktRoutes.DOKUMENTER) {
        return `${sakRoute}/${OversiktRoutes.DOKUMENTER}`;
    }

    if (route === OversiktRoutes.ETTERSEND) {
        return `${sakRoute}/${OversiktRoutes.ETTERSEND}`;
    }
    if (route === OversiktRoutes.INNTEKTSMELDING) {
        return `${sakRoute}/${OversiktRoutes.INNTEKTSMELDING}`;
    }

    return route;
};

export const Breadcrumb = () => {
    const selectedRoute = useGetSelectedRoute();
    const breadcrumbs = getBreadcrumbs(selectedRoute);
    const navigate = useNavigate();
    const sak = useGetSelectedSak();

    const mappedPaths = breadcrumbs.map((b) => ({ ...b, url: getRoute(b.url, sak?.saksnummer) }));
    void setBreadcrumbs(mappedPaths);

    // Denne trigges for breadcrumbs der handleInApp: true
    onBreadcrumbClick((breadcrumb) => {
        void navigate(breadcrumb.url);
    });

    return <Outlet />;
};
