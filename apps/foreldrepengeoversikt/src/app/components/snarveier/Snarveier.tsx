import React from 'react';
import { bemUtils, intlUtils } from '@navikt/fp-common';

import './snarveier.css';
import { useIntl } from 'react-intl';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { NavRoutes } from 'app/routes/routes';
import { SakOppslag } from 'app/types/SakOppslag';
import { getAlleYtelser } from 'app/utils/sakerUtils';
import { Ytelse } from 'app/types/Ytelse';

const getLesMerLink = (stønadstype: Ytelse | undefined) => {
    if (stønadstype === Ytelse.FORELDREPENGER) {
        return NavRoutes.LES_MER_OM_FORELDREPENGER;
    }
    if (stønadstype === Ytelse.SVANGERSKAPSPENGER) {
        return NavRoutes.LES_MER_OM_SVANGERSKAPSPENGER;
    }
    if (stønadstype === Ytelse.ENGANGSSTØNAD) {
        return NavRoutes.LES_MER_OM_ENGANGSTØNAD;
    }
    return NavRoutes.LES_MER_OM_VÅRE_PENGESTØTTER;
};

interface Props {
    saker: SakOppslag;
}

const getKlageLink = (ytelse: Ytelse | undefined) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return NavRoutes.KLAGERETTIGHETER_ES;
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return NavRoutes.KLAGERETTIGHETER_SVP;
    }

    if (ytelse === Ytelse.FORELDREPENGER) {
        return NavRoutes.KLAGERETTIGHETER_FP;
    }

    return NavRoutes.KLAGERETTIGHETER;
};

const getSaksbehandlingstidLink = (ytelse: Ytelse | undefined) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return NavRoutes.SAKSBEHANDLINGSTIDER_ES;
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return NavRoutes.SAKSBEHANDLINGSTIDER_SVP;
    }

    if (ytelse === Ytelse.FORELDREPENGER) {
        return NavRoutes.SAKSBEHANDLINGSTIDER_FP;
    }

    return NavRoutes.SAKSBEHANDLINGSTIDER;
};

const Snarveier: React.FunctionComponent<Props> = ({ saker }) => {
    const bem = bemUtils('snarveier');
    const intl = useIntl();
    const path = location.pathname;
    const alleSaker = getAlleYtelser(saker);
    const currentSak = alleSaker.find((sak) => path.includes(sak.saksnummer));
    const ytelse = currentSak ? currentSak.ytelse : undefined;
    const ytelseTekst = currentSak !== undefined ? currentSak.ytelse : intlUtils(intl, 'snarveier.pengestøtter');
    const lesMerLink = getLesMerLink(ytelse);
    return (
        <div className={bem.block}>
            <div className={bem.element('wrapper')}>
                <div className={bem.element('title')}>
                    <Heading size="medium">{intlUtils(intl, 'saksoversikt.snarveier')}</Heading>
                </div>
                <div className={bem.element('content')}>
                    <LinkPanel href={lesMerLink} border={false} className={bem.element('linkPanel')}>
                        <LinkPanel.Title className={bem.element('linkTitle')}>
                            <div>{intlUtils(intl, 'snarveier.lesMerOm', { ytelse: ytelseTekst })}</div>
                        </LinkPanel.Title>
                    </LinkPanel>
                    <LinkPanel
                        href={getSaksbehandlingstidLink(ytelse)}
                        border={false}
                        className={bem.element('linkPanel')}
                    >
                        <LinkPanel.Title className={bem.element('linkTitle')}>
                            <div>{intlUtils(intl, 'snarveier.saksbehandlingstider')}</div>
                        </LinkPanel.Title>
                    </LinkPanel>
                    <LinkPanel
                        href={NavRoutes.MELD_FRA_OM_ENDRINGER}
                        border={false}
                        className={bem.element('linkPanel')}
                    >
                        <LinkPanel.Title className={bem.element('linkTitle')}>
                            <div>{intlUtils(intl, 'snarveier.endringerIDinSituasjon')}</div>
                        </LinkPanel.Title>
                    </LinkPanel>
                    <LinkPanel href={getKlageLink(ytelse)} border={false} className={bem.element('linkPanel')}>
                        <LinkPanel.Title className={bem.element('linkTitle')}>
                            <div>{intlUtils(intl, 'snarveier.slikKlagerDu')}</div>
                        </LinkPanel.Title>
                    </LinkPanel>
                </div>
            </div>
        </div>
    );
};

export default Snarveier;
