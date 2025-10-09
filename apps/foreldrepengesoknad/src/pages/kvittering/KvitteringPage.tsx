import { useQuery } from '@tanstack/react-query';
import { statusOptions } from 'api/queries';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, VStack } from '@navikt/ds-react';

import { SkjemaRotLayout } from '@navikt/fp-ui';

//TODO: autogenerer
type Status = { status: 'PENDING' | 'GOSYS' | 'FPSAK'; saksnummer?: number };

export const KvitteringPage = () => {
    const a = useQuery({
        ...statusOptions(),
        refetchInterval: (query) => (query.state.data?.status === 'PENDING' ? 1000 : false),
    }).data;

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <VStack gap="4">
                <BodyShort>Her skriver vi noe lurt</BodyShort>
                Vi poller på saken. Status er: {a?.status}
                <GåTilInnsynKnapp status={a} />
                <GåTilMinSideKnapp status={a} />
            </VStack>
        </SkjemaRotLayout>
    );
};

const GåTilMinSideKnapp = ({ status }: { status?: Status }) => {
    if (status?.status !== 'GOSYS') {
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

const GåTilInnsynKnapp = ({ status }: { status?: Status }) => {
    if (!status?.saksnummer) {
        return null;
    }

    const erIDev = window.location.pathname.includes('.dev.nav.');
    const url = erIDev
        ? 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/'
        : 'https://www.nav.no/foreldrepenger/oversikt/';

    return (
        <Button as="a" href={url}>
            Se saken din
        </Button>
    );
};
