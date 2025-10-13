import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, VStack } from '@navikt/ds-react';

import { SkjemaRotLayout } from '@navikt/fp-ui';

//TODO: autogenerer
type Status = { status: 'PENDING' | 'MIDLERTIDIG' | 'ENDELIG'; saksnummer?: number };

export const Kvittering = ({ forsendelseStatus }: { forsendelseStatus: Status }) => {
    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="Søknad.Pageheading" />}>
            <VStack gap="4">
                <BodyShort>Her skriver vi noe lurt</BodyShort>
                Vi poller på saken. Status er: {forsendelseStatus?.status}
                <GåTilInnsynKnapp forsendelseStatus={forsendelseStatus} />
                <GåTilMinSideKnapp forsendelseStatus={forsendelseStatus} />
            </VStack>
        </SkjemaRotLayout>
    );
};

const GåTilMinSideKnapp = ({ forsendelseStatus }: { forsendelseStatus?: Status }) => {
    if (forsendelseStatus?.status !== 'MIDLERTIDIG') {
        return null;
    }

    const erIDev = window.location.pathname.includes('.dev.nav.');
    const url = erIDev ? 'https://www.ansatt.dev.nav.no/minside' : 'https://www.nav.no/minside';

    return (
        <Button as="a" href={url}>
            Se saken din
        </Button>
    );
};

const GåTilInnsynKnapp = ({ forsendelseStatus }: { forsendelseStatus?: Status }) => {
    if (!forsendelseStatus?.saksnummer) {
        return null;
    }

    const erIDev = window.location.pathname.includes('.dev.nav.');
    const url = erIDev
        ? 'https://www.intern.dev.nav.no/foreldrepenger/oversikt'
        : `https://www.nav.no/foreldrepenger/oversikt`;

    const direkteTilSak = forsendelseStatus.saksnummer === undefined ? '' : `sak/${forsendelseStatus.saksnummer}`;

    return (
        <Button as="a" href={`${url}/${direkteTilSak}`}>
            Se saken din
        </Button>
    );
};
