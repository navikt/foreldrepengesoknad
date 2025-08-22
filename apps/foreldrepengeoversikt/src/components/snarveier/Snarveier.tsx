import { useIntl } from 'react-intl';

import { HGrid, Heading } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Ytelse } from '@navikt/fp-types';

import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { NavRoutes } from '../../routes/routes';
import { Sak } from '../../types/Sak';
import { LenkePanel } from '../lenke-panel/LenkePanel';

const getLesMerLink = (stønadstype: Ytelse | undefined) => {
    if (stønadstype === 'FORELDREPENGER') {
        return NavRoutes.LES_MER_OM_FORELDREPENGER;
    }
    if (stønadstype === 'SVANGERSKAPSPENGER') {
        return NavRoutes.LES_MER_OM_SVANGERSKAPSPENGER;
    }
    if (stønadstype === 'ENGANGSSTØNAD') {
        return NavRoutes.LES_MER_OM_ENGANGSTØNAD;
    }
    return NavRoutes.LES_MER_OM_VÅRE_PENGESTØTTER;
};

const getKlageLinkMedSak = (ytelse: Ytelse | undefined, sak: Sak) => {
    if (ytelse === 'ENGANGSSTØNAD') {
        return `https://klage.nav.no/nb/klage/ENGANGSSTONAD?saksnummer=${sak.saksnummer}`;
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return `https://klage.nav.no/nb/klage/SVANGERSKAPSPENGER?saksnummer=${sak.saksnummer}`;
    }

    return `https://klage.nav.no/nb/klage/FORELDREPENGER?saksnummer=${sak.saksnummer}`;
};

const getKlageLink = (ytelse: Ytelse | undefined) => {
    if (ytelse === 'ENGANGSSTØNAD') {
        return NavRoutes.KLAGERETTIGHETER_ES;
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return NavRoutes.KLAGERETTIGHETER_SVP;
    }

    if (ytelse === 'FORELDREPENGER') {
        return NavRoutes.KLAGERETTIGHETER_FP;
    }

    return NavRoutes.KLAGERETTIGHETER;
};

const getSaksbehandlingstidLink = (ytelse: Ytelse | undefined) => {
    if (ytelse === 'ENGANGSSTØNAD') {
        return NavRoutes.SAKSBEHANDLINGSTIDER_ES;
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return NavRoutes.SAKSBEHANDLINGSTIDER_SVP;
    }

    if (ytelse === 'FORELDREPENGER') {
        return NavRoutes.SAKSBEHANDLINGSTIDER_FP;
    }

    return NavRoutes.SAKSBEHANDLINGSTIDER;
};

export const Snarveier = () => {
    const intl = useIntl();
    const currentSak = useGetSelectedSak();
    const ytelse = currentSak ? currentSak.ytelse : undefined;
    const ytelseTekst =
        currentSak !== undefined
            ? currentSak.ytelse.toLowerCase()
            : intl.formatMessage({ id: 'snarveier.pengestøtter' });
    const lesMerLink = getLesMerLink(ytelse);
    return (
        <div className="bg-ax-bg-default p-8">
            <div className="w-full ax-md:w-[704px] m-auto">
                <Heading spacing size="medium">
                    {intl.formatMessage({ id: 'saksoversikt.snarveier' })}
                </Heading>
                <HGrid gap="space-16" columns={{ sm: 1, md: 2 }}>
                    <LenkePanel
                        tittel={intl.formatMessage({ id: 'snarveier.lesMerOm' }, { ytelse: ytelseTekst })}
                        to={lesMerLink}
                    />
                    <LenkePanel
                        to={getSaksbehandlingstidLink(ytelse)}
                        tittel={intl.formatMessage({ id: 'snarveier.saksbehandlingstider' })}
                    />
                    <LenkePanel
                        to={NavRoutes.MELD_FRA_OM_ENDRINGER}
                        tittel={intl.formatMessage({ id: 'snarveier.endringerIDinSituasjon' })}
                    />
                    {currentSak !== undefined ? (
                        <LenkePanel
                            to={getKlageLinkMedSak(ytelse, currentSak)}
                            tittel={intl.formatMessage({ id: 'snarveier.jegVilKlage' })}
                        />
                    ) : (
                        <LenkePanel
                            to={getKlageLink(ytelse)}
                            tittel={intl.formatMessage({ id: 'snarveier.slikKlagerDu' })}
                        />
                    )}
                    <LenkePanel tittel={intl.formatMessage({ id: 'snarveier.kontonummer' })} to={links.brukerprofil} />
                </HGrid>
            </div>
        </div>
    );
};
