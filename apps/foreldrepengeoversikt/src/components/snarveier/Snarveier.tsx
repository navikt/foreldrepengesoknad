import { useIntl } from 'react-intl';

import { HGrid, Heading } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Ytelse } from '@navikt/fp-types';

import { useGetSelectedSak } from '../../hooks/useSelectedSak';
import { Sak } from '../../types/Sak';
import { LenkePanel } from '../lenke-panel/LenkePanel';

const getLesMerLink = (stønadstype: Ytelse | undefined) => {
    if (stønadstype === 'FORELDREPENGER') {
        return links.foreldrepenger;
    }
    if (stønadstype === 'SVANGERSKAPSPENGER') {
        return links.svangerskapspenger;
    }
    if (stønadstype === 'ENGANGSSTØNAD') {
        return links.engangsstonad;
    }
    return links.barn;
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
        return links.klagerettigheterEs;
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return links.klagerettigheterSvp;
    }

    if (ytelse === 'FORELDREPENGER') {
        return links.klagerettigheterFp;
    }

    return links.klagerettigheter;
};

const getSaksbehandlingstidLink = (ytelse: Ytelse | undefined) => {
    if (ytelse === 'ENGANGSSTØNAD') {
        return links.saksbehandlingstiderEs;
    }

    if (ytelse === 'SVANGERSKAPSPENGER') {
        return links.saksbehandlingstiderSvp;
    }

    if (ytelse === 'FORELDREPENGER') {
        return links.saksbehandlingstiderFp;
    }

    return links.saksbehandlingstider;
};

export const Snarveier = () => {
    const intl = useIntl();
    const currentSak = useGetSelectedSak();
    const ytelse = currentSak ? currentSak.ytelse : undefined;
    const ytelseTekst = currentSak
        ? currentSak.ytelse.toLowerCase()
        : intl.formatMessage({ id: 'snarveier.pengestøtter' });
    const lesMerLink = getLesMerLink(ytelse);
    return (
        <div className="bg-ax-bg-default p-8">
            <div className="ax-md:w-[704px] m-auto w-full">
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
                        to={links.meldFraOmEndringer}
                        tittel={intl.formatMessage({ id: 'snarveier.endringerIDinSituasjon' })}
                    />
                    {currentSak ? (
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
