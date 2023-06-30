import { Home } from '@navikt/ds-icons';
import { BodyShort, Link as DSLink } from '@navikt/ds-react';
import { bemUtils, hasValue } from '@navikt/fp-common';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { Link } from 'react-router-dom';

import OversiktRoutes from 'app/routes/routes';
import { getBreadcrumbs } from 'app/types/Breadcrumb';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';

import './breadcrumb.css';

interface Props {
    selectedRoute: OversiktRoutes;
    oppgaveId: string | undefined;
}

const getRoute = (route: string, saksnummer: string | undefined, oppgaveId: string | undefined): string => {
    const sakRoute = `${OversiktRoutes.SAKSOVERSIKT}/${saksnummer}`;

    if (route === OversiktRoutes.SAKSOVERSIKT && hasValue(saksnummer)) {
        return sakRoute;
    }

    if (route === OversiktRoutes.OPPGAVER && hasValue(oppgaveId)) {
        return `${OversiktRoutes.OPPGAVER}/${oppgaveId}`;
    }

    if (route === OversiktRoutes.DOKUMENTER) {
        return `${sakRoute}/${OversiktRoutes.DOKUMENTER}`;
    }

    return route;
};

const Breadcrumb: React.FunctionComponent<Props> = ({ selectedRoute, oppgaveId }) => {
    const bem = bemUtils('breadcrumb');
    const path = getBreadcrumbs(selectedRoute);

    const sak = useGetSelectedSak();
    const saksnummer = sak ? sak.saksnummer : undefined;

    return (
        <div className={bem.block}>
            {path.map((p, index) => {
                const lastBreadcrumb = index === path.length - 1;
                const erNavHomeLink = p.displayName === 'nav.no';

                if (lastBreadcrumb) {
                    return <BodyShort className={bem.element('flex-align')}>{p.displayName}</BodyShort>;
                }

                return (
                    <div className={bem.element('flex-align')}>
                        {p.isExternalLink ? (
                            <DSLink key={p.displayName} className={bem.element('link-wrapper')} href={p.route}>
                                {erNavHomeLink && <Home width="24" height="24" style={{ marginRight: '0.5rem' }} />}
                                <BodyShort>{p.displayName}</BodyShort>
                            </DSLink>
                        ) : (
                            <Link
                                key={p.displayName}
                                className={bem.element('link-wrapper')}
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
