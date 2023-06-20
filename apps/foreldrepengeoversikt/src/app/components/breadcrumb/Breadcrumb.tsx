import { Home } from '@navikt/ds-icons';
import { BodyShort, Link as DSLink } from '@navikt/ds-react';
import { bemUtils, hasValue } from '@navikt/fp-common';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router-dom';

import OversiktRoutes from 'app/routes/routes';
import { BREADCRUMBS } from 'app/types/Breadcrumb';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';

import './breadcrumb.css';

interface Props {
    selectedRoute: OversiktRoutes;
    oppgaveId: string | undefined;
}

const getBreadcrumbPath = (selectedRoute: OversiktRoutes) => {
    return BREADCRUMBS[selectedRoute];
};

const getRoute = (route: string, saksnummer: string | undefined, oppgaveId: string | undefined): string => {
    if (route === OversiktRoutes.SAKSOVERSIKT && hasValue(saksnummer)) {
        return `${OversiktRoutes.SAKSOVERSIKT}/${saksnummer}`;
    }
    if (route === OversiktRoutes.OPPGAVER && hasValue(oppgaveId)) {
        return `${OversiktRoutes.OPPGAVER}/${oppgaveId}`;
    }

    return route;
};

const Breadcrumb: React.FunctionComponent<Props> = ({ selectedRoute, oppgaveId }) => {
    const bem = bemUtils('breadcrumb');
    const path = getBreadcrumbPath(selectedRoute);

    const sak = useGetSelectedSak();
    const saksnummer = sak ? sak.saksnummer : undefined;

    return (
        <div className={bem.block}>
            {path.map((p, index) => {
                const lastBreadcrumb = index === path.length - 1;
                const erNavHomeLink = p.displayName === 'nav.no';

                if (lastBreadcrumb) {
                    return <BodyShort>{p.displayName}</BodyShort>;
                }

                return (
                    <div className={bem.element('flex-align')}>
                        {p.isExternalLink ? (
                            <DSLink key={p.displayName} className={bem.element('flex-align')} href={p.route}>
                                {erNavHomeLink && <Home />}
                                <BodyShort>{p.displayName}</BodyShort>
                            </DSLink>
                        ) : (
                            <Link
                                key={p.displayName}
                                className={bem.element('flex-align')}
                                to={getRoute(p.route, saksnummer, oppgaveId)}
                            >
                                <BodyShort>{p.displayName}</BodyShort>
                            </Link>
                        )}
                        {!lastBreadcrumb && <ChevronRightIcon className={bem.element('chevron')} />}
                    </div>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
