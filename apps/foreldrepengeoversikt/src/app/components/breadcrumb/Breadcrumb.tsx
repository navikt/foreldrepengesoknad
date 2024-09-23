import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useNavigate } from 'react-router-dom';

import { assertUnreachable } from '@navikt/fp-validation';

import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';

type Props = {
    selectedRoute: OversiktRoutes;
};

const minSide = {
    title: 'Min side',
    url: 'https://www.nav.no/minside',
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

const tidslinjen = {
    title: 'Hele prosessen',
    url: OversiktRoutes.TIDSLINJEN,
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

export const getBreadcrumbs = (selectedRoute: OversiktRoutes) => {
    switch (selectedRoute) {
        case OversiktRoutes.HOVEDSIDE:
            return [minSide, hovedside];
        case OversiktRoutes.SAKSOVERSIKT:
            return [minSide, hovedside, saksoversikt];
        case OversiktRoutes.DOKUMENTER:
            return [minSide, hovedside, saksoversikt, dokumenter];
        case OversiktRoutes.ETTERSEND:
            return [minSide, hovedside, saksoversikt, dokumenter, ettersend];
        case OversiktRoutes.TIDSLINJEN:
            return [minSide, hovedside, saksoversikt, tidslinjen];
        case OversiktRoutes.DIN_PLAN:
            return [minSide, hovedside, saksoversikt, dinPlan];
        case OversiktRoutes.OPPGAVER:
            return [minSide, hovedside, saksoversikt, oppgaver];
        default:
            return assertUnreachable('En rute mangler brødsmulesti');
    }
};

const getRoute = (route: string, saksnummer: string | undefined): string => {
    const sakRoute = `${OversiktRoutes.SAKSOVERSIKT}/${saksnummer}`;

    if (route === OversiktRoutes.SAKSOVERSIKT && saksnummer) {
        return sakRoute;
    }

    if (route === OversiktRoutes.DOKUMENTER) {
        return `${sakRoute}/${OversiktRoutes.DOKUMENTER}`;
    }
    if (route === OversiktRoutes.ETTERSEND) {
        return `${sakRoute}/${OversiktRoutes.DOKUMENTER}/${OversiktRoutes.ETTERSEND}`;
    }

    return route;
};

const Breadcrumb: React.FunctionComponent<Props> = ({ selectedRoute }) => {
    const breadcrumbs = getBreadcrumbs(selectedRoute);
    const navigate = useNavigate();
    const sak = useGetSelectedSak();

    const mappedPaths = breadcrumbs.map((b) => ({ ...b, url: getRoute(b.url, sak?.saksnummer) }));
    setBreadcrumbs(mappedPaths);

    // Denne trigges for breadcrumbs der handleInApp: true
    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    return null;
};

export default Breadcrumb;
