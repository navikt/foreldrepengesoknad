import { CheckmarkCircleFillIcon, ChevronRightIcon } from '@navikt/aksel-icons';

import { BodyShort, Button, HStack, Heading, Loader, VStack } from '@navikt/ds-react';

import { ForsendelseStatus } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

export const Kvittering = ({
    forsendelseStatus,
    pageTitle,
}: {
    pageTitle: React.ReactNode;
    forsendelseStatus?: ForsendelseStatus;
}) => {
    return (
        <SkjemaRotLayout pageTitle={pageTitle}>
            <KvitteringsInnhold forsendelseStatus={forsendelseStatus} />
        </SkjemaRotLayout>
    );
};

const KvitteringsInnhold = ({ forsendelseStatus }: { forsendelseStatus?: ForsendelseStatus }) => {
    const status = forsendelseStatus?.status ?? 'PENDING';

    switch (status) {
        case 'PENDING':
            return <SakenProsesseres />;
        case 'MIDLERTIDIG':
            return <GåTilMinSide />;
        case 'ENDELIG':
            return <GåTilInnsyn saksnummer={forsendelseStatus?.saksnummer} />;
    }
};

// TODO: språk inn i intl
const SakenProsesseres = () => {
    return (
        <VStack>
            <KvitteringHeader />
            <BodyShort spacing>
                Vi henter nå status på saken din. Dette tar som regel under “ett minutt”. Du trenger ikke gjøre noe –
                siden oppdateres automatisk.
            </BodyShort>
            <BodyShort spacing>
                Henter status på saken … <Loader />
            </BodyShort>
        </VStack>
    );
};

const GåTilMinSide = () => {
    const erIDev = globalThis.location.hostname.includes('.dev.nav.');
    const url = erIDev ? 'https://www.ansatt.dev.nav.no/minside' : 'https://www.nav.no/minside';

    return (
        <VStack>
            <KvitteringHeader />
            <BodyShort>Vi har mottatt søknaden din og alt er i orden. Saken behandles av en saksbehandler.</BodyShort>
            <Button
                as="a"
                href={url}
                className="mt-8 w-fit self-center"
                iconPosition="right"
                icon={<ChevronRightIcon />}
            >
                Se søknaden din på Min side
            </Button>
        </VStack>
    );
};

const GåTilInnsyn = ({ saksnummer }: { saksnummer?: number }) => {
    if (saksnummer === undefined) {
        throw new Error('Udefinert saksnummer for status ENDELIG');
    }

    const erIDev = globalThis.location.hostname.includes('.dev.nav.');
    const url = erIDev
        ? `https://www.intern.dev.nav.no/foreldrepenger/oversikt/sak/${saksnummer}`
        : `https://www.nav.no/foreldrepenger/oversikt/sak/${saksnummer}`;

    return (
        <VStack>
            <KvitteringHeader />
            <BodyShort spacing>Saken er registrert hos Nav og har fått et saksnummer.</BodyShort>
            <BodyShort spacing>Du kan følge behandlingen og se dokumentene dine på Min side</BodyShort>
            <Button
                as="a"
                href={url}
                className="mt-4 w-fit self-center"
                iconPosition="right"
                icon={<ChevronRightIcon />}
            >
                Se søknaden din på Min side
            </Button>
        </VStack>
    );
};

const KvitteringHeader = () => {
    return (
        <HStack gap="space-16" align="center" className="mb-6">
            <CheckmarkCircleFillIcon
                className="text-ax-text-success-decoration self-center"
                aria-hidden
                fontSize="2.5rem"
            />
            <Heading size="large" level="2" align="center">
                Søknaden din er mottatt
            </Heading>
        </HStack>
    );
};
