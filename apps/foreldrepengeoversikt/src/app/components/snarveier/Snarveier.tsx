import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { HGrid, Heading, LinkPanel } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import { useGetSelectedSak } from 'app/hooks/useSelectedSak';
import { NavRoutes } from 'app/routes/routes';
import { Sak } from 'app/types/Sak';
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

const getKlageLinkMedSak = (ytelse: Ytelse | undefined, sak: Sak) => {
    if (ytelse === Ytelse.ENGANGSSTØNAD) {
        return `https://klage.nav.no/nb/klage/ENGANGSSTONAD?saksnummer=${sak.saksnummer}`;
    }

    if (ytelse === Ytelse.SVANGERSKAPSPENGER) {
        return `https://klage.nav.no/nb/klage/SVANGERSKAPSPENGER?saksnummer=${sak.saksnummer}`;
    }

    return `https://klage.nav.no/nb/klage/FORELDREPENGER?saksnummer=${sak.saksnummer}`;
};

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

const SnarveiLinkPanel = ({ href, children }: { href: string; children: ReactNode }) => {
    return (
        <LinkPanel href={href} border={false} className="bg-gray-100 rounded-large p-4 pt-2 pb-2 h-fit">
            <LinkPanel.Title className="text-lg">{children}</LinkPanel.Title>
        </LinkPanel>
    );
};

const Snarveier: React.FunctionComponent = () => {
    const intl = useIntl();
    const currentSak = useGetSelectedSak();
    const ytelse = currentSak ? currentSak.ytelse : undefined;
    const ytelseTekst =
        currentSak !== undefined ? currentSak.ytelse : intl.formatMessage({ id: 'snarveier.pengestøtter' });
    const lesMerLink = getLesMerLink(ytelse);
    return (
        <div className="bg-white p-8">
            <div className="w-full md:w-[704px] m-auto">
                <Heading spacing size="medium">
                    {intl.formatMessage({ id: 'saksoversikt.snarveier' })}
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel href={lesMerLink}>
                        {intl.formatMessage({ id: 'snarveier.lesMerOm' }, { ytelse: ytelseTekst })}
                    </SnarveiLinkPanel>
                    <SnarveiLinkPanel href={getSaksbehandlingstidLink(ytelse)}>
                        {intl.formatMessage({ id: 'snarveier.saksbehandlingstider' })}
                    </SnarveiLinkPanel>
                    <SnarveiLinkPanel href={NavRoutes.MELD_FRA_OM_ENDRINGER}>
                        {intl.formatMessage({ id: 'snarveier.endringerIDinSituasjon' })}
                    </SnarveiLinkPanel>
                    {currentSak !== undefined ? (
                        <SnarveiLinkPanel href={getKlageLinkMedSak(ytelse, currentSak)}>
                            {intl.formatMessage({ id: 'snarveier.jegVilKlage' })}
                        </SnarveiLinkPanel>
                    ) : (
                        <SnarveiLinkPanel href={getKlageLink(ytelse)}>
                            {intl.formatMessage({ id: 'snarveier.slikKlagerDu' })}
                        </SnarveiLinkPanel>
                    )}
                    <SnarveiLinkPanel href={links.brukerprofil}>
                        {intl.formatMessage({ id: 'snarveier.kontonummer' })}
                    </SnarveiLinkPanel>
                </HGrid>
            </div>
        </div>
    );
};

export default Snarveier;
