import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import { getFamiliehendelseDato, utledFamiliesituasjon } from 'app/utils/sakerUtils';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import React from 'react';
import { getHeading } from '../har-saker/HarSaker';
import PreviousLink from '../previous-link/PreviousLink';
import StatusTag from '../status-tag/StatusTag';

import './header.css';

const getHeaderRouteInfo = (path: string, minidialogerIds: string[], selectedRoute: OversiktRoutes) => {
    if (selectedRoute === OversiktRoutes.DOKUMENTER) {
        const previousPage = path.split('/dokumenter')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.ETTERSEND) {
        const previousPage = path.split('/ettersend')[0];
        return { route: `${previousPage}/${OversiktRoutes.DOKUMENTER}`, label: 'Dokumenter', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.OPPLYSNINGER) {
        const previousPage = path.split('/opplysninger')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    const currentOppgaveRoute = minidialogerIds.find((id) => path.includes(id));
    if (currentOppgaveRoute) {
        const previousPage = path.split(`/${currentOppgaveRoute}`)[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.SAKSOVERSIKT) {
        return { route: OversiktRoutes.HOVEDSIDE, label: 'Mine foreldrepenger', isExternalURL: false };
    }

    if (selectedRoute === OversiktRoutes.DIN_PLAN) {
        const previousPage = path.split('/din-plan')[0];
        return { route: previousPage, label: 'Min sak', isExternalURL: false };
    }

    return { route: 'https://www.nav.no/no/ditt-nav', label: 'Min side', isExternalURL: true };
};

const getSaksoversiktHeading = (ytelse: Ytelse) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return 'Engangsstønadsak';
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return 'Svangerskapspengesak';
    }

    return 'Foreldrepengesak';
};

const renderHeaderContent = (selectedRoute: OversiktRoutes, sak: Sak | undefined) => {
    const bem = bemUtils('header');

    if (selectedRoute === OversiktRoutes.DOKUMENTER) {
        return (
            <div className={bem.element('content')}>
                <div>
                    <Heading size="xlarge">Dokumenter</Heading>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        <div className={bem.element('divider')}>|</div>
                        <BodyShort className={bem.element('divider-text')}>
                            Liste over dokumenter som tilhører saken
                        </BodyShort>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedRoute === OversiktRoutes.ETTERSEND) {
        return (
            <div className={bem.element('content')}>
                <div>
                    <Heading size="xlarge">Last opp dokumenter</Heading>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        <div className={bem.element('divider')}>|</div>
                        <BodyShort className={bem.element('divider-text')}>
                            Ettersend dokumenter som tilhører saken
                        </BodyShort>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedRoute === OversiktRoutes.SAKSOVERSIKT && sak) {
        const situasjon = utledFamiliesituasjon(sak.familiehendelse, sak.gjelderAdopsjon);
        const familiehendelsedato = getFamiliehendelseDato(sak.familiehendelse);
        const beskrivelse = getHeading(situasjon, sak.familiehendelse.antallBarn, familiehendelsedato);

        return (
            <div className={bem.element('content')}>
                <TåteflaskeBaby />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem', marginBottom: '1rem' }}>
                    <Heading size="xlarge">{getSaksoversiktHeading(sak.ytelse)}</Heading>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        <div className={bem.element('divider')}>|</div>
                        <BodyShort className={bem.element('divider-text')}>{beskrivelse}</BodyShort>
                    </div>
                    <StatusTag sak={sak} className={bem.element('tag')} />
                </div>
            </div>
        );
    }

    return (
        <div className={bem.element('content')}>
            <TåteflaskeBaby />
            <div className={bem.element('title-container')}>
                <Heading size="xlarge">Oversikt over foreldrepenger</Heading>
                <BodyShort>PENGESTØTTE</BodyShort>
            </div>
        </div>
    );
};

interface Props {
    minidialogerIds: string[];
}

const Header: React.FunctionComponent<Props> = ({ minidialogerIds }) => {
    const bem = bemUtils('header');
    const path = location.pathname;
    const selectedRoute = useGetSelectedRoute();
    const headerRouteInfo = getHeaderRouteInfo(path, minidialogerIds, selectedRoute);
    const sak = useGetSelectedSak();

    const { route, isExternalURL, label } = headerRouteInfo;

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <PreviousLink route={route} externalURL={isExternalURL} linkLabel={label} />
                {renderHeaderContent(selectedRoute, sak)}
            </div>
        </div>
    );
};

export default Header;
