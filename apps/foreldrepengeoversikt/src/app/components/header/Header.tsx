import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { useGetSelectedRoute } from 'app/hooks/useSelectedRoute';
import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import OversiktRoutes from 'app/routes/routes';
import { BarnGruppering } from 'app/types/BarnGruppering';
import { GruppertSak } from 'app/types/GruppertSak';
import { Sak } from 'app/types/Sak';
import { Ytelse } from 'app/types/Ytelse';
import { ISOStringToDate } from 'app/utils/dateUtils';
import { getFamiliehendelseDato, getSakTittel, getSakUndertittel, utledFamiliesituasjon } from 'app/utils/sakerUtils';
import TåteflaskeBaby from 'assets/TåteflaskeBaby';
import classNames from 'classnames';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';
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

const renderHeaderContent = (
    selectedRoute: OversiktRoutes,
    sak: Sak | undefined,
    barn: BarnGruppering | undefined,
    intl: IntlShape
) => {
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
        const familiehendelsedato = ISOStringToDate(getFamiliehendelseDato(sak.familiehendelse));
        const barnTittel = getSakTittel(
            barn?.fornavn,
            barn?.fødselsdatoer,
            familiehendelsedato!,
            !!barn?.alleBarnaLever,
            sak.ytelse === Ytelse.FORELDREPENGER ? sak.familiehendelse.antallBarn : 0,
            intl,
            situasjon
        );
        const barnUndertittel = getSakUndertittel(
            barn?.fornavn,
            barn?.fødselsdatoer,
            situasjon,
            familiehendelsedato!,
            !!barn?.alleBarnaLever
        );
        return (
            <div className={bem.element('content')}>
                <TåteflaskeBaby />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem', marginBottom: '1rem' }}>
                    <Heading size="xlarge">{getSaksoversiktHeading(sak.ytelse)}</Heading>
                    <div className={bem.element('text-with-bar')}>
                        <BodyShort>{`SAKSNR ${sak?.saksnummer}`}</BodyShort>
                        <hr
                            className={classNames(
                                bem.element('divider'),
                                barnUndertittel ? bem.modifier('divider-long') : bem.modifier('divider-short')
                            )}
                        ></hr>
                        <div>
                            <BodyShort className={bem.element('divider-text')}>{barnTittel}</BodyShort>
                            {barnUndertittel && (
                                <BodyShort className={bem.element('divider-text')}>{barnUndertittel}</BodyShort>
                            )}
                        </div>
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
    grupperteSaker: GruppertSak[];
    minidialogerIds: string[];
}

const Header: React.FunctionComponent<Props> = ({ minidialogerIds, grupperteSaker }) => {
    const bem = bemUtils('header');
    const intl = useIntl();
    const path = location.pathname;
    const selectedRoute = useGetSelectedRoute();
    const headerRouteInfo = getHeaderRouteInfo(path, minidialogerIds, selectedRoute);
    const sak = useGetSelectedSak();
    const sakIGrupperteSaker = sak
        ? grupperteSaker.find((gruppe) => gruppe.saker.map((s) => s.saksnummer).includes(sak.saksnummer))
        : undefined;
    const barnGrupperingForSak = sakIGrupperteSaker?.barn;
    const { route, isExternalURL, label } = headerRouteInfo;

    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <PreviousLink route={route} externalURL={isExternalURL} linkLabel={label} />
                {renderHeaderContent(selectedRoute, sak, barnGrupperingForSak, intl)}
            </div>
        </div>
    );
};

export default Header;
