import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useIntl } from 'react-intl';
import { Outlet, useNavigate } from 'react-router-dom';

import { assertUnreachable } from '@navikt/fp-validation';

import { useGetSelectedRoute } from './../../hooks/useSelectedRoute';
import { useGetSelectedSak } from './../../hooks/useSelectedSak';
import { OversiktRoutes } from './../../routes/routes';

export const Breadcrumb = () => {
    const selectedRoute = useGetSelectedRoute();
    const navigate = useNavigate();
    const sak = useGetSelectedSak();
    const intl = useIntl();

    const minSide = {
        title: intl.formatMessage({ id: 'breadcrumb.minSide' }),
        url: 'https://www.nav.no/minside' as const,
        handleInApp: false,
    };

    const hovedside = {
        title: intl.formatMessage({ id: 'breadcrumb.foreldrepenger' }),
        url: OversiktRoutes.HOVEDSIDE,
        handleInApp: true,
    };

    const saksoversikt = {
        title: intl.formatMessage({ id: 'breadcrumb.dinSak' }),
        url: OversiktRoutes.SAKSOVERSIKT,
        handleInApp: true,
    };

    const dokumenter = {
        title: intl.formatMessage({ id: 'breadcrumb.dokumenter' }),
        url: OversiktRoutes.DOKUMENTER,
        handleInApp: true,
    };

    const ettersend = {
        title: intl.formatMessage({ id: 'breadcrumb.lastOpp' }),
        url: OversiktRoutes.ETTERSEND,
        handleInApp: true,
    };

    const dinPlan = {
        title: intl.formatMessage({ id: 'breadcrumb.søknadenDin' }),
        url: OversiktRoutes.DIN_PLAN,
        handleInApp: true,
    };

    const oppgaver = {
        title: intl.formatMessage({ id: 'breadcrumb.dinOppgave' }),
        url: OversiktRoutes.OPPGAVER,
        handleInApp: true,
    };

    const inntektsmelding = {
        title: intl.formatMessage({ id: 'breadcrumb.inntektsmelding' }),
        url: OversiktRoutes.INNTEKTSMELDING,
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

    const breadcrumbs = getBreadcrumbs(selectedRoute);

    const mappedPaths = breadcrumbs.map((b) => ({ ...b, url: getRoute(b.url, sak?.saksnummer) }));
    void setBreadcrumbs(mappedPaths);

    // Denne trigges for breadcrumbs der handleInApp: true
    onBreadcrumbClick((breadcrumb) => {
        void navigate(breadcrumb.url);
    });

    return <Outlet />;
};
