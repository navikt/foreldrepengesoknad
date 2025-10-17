import { CheckmarkCircleFillIcon, ChevronRightIcon } from '@navikt/aksel-icons';

import { BodyShort, Button, Heading, Loader, VStack } from '@navikt/ds-react';

import { SkjemaRotLayout } from '@navikt/fp-ui';

//TODO: autogenerer
type Status = { status: 'PENDING' | 'MIDLERTIDIG' | 'ENDELIG'; saksnummer?: number };

export const Kvittering = ({
    forsendelseStatus,
    pageTitle,
}: {
    pageTitle: React.ReactNode;
    forsendelseStatus?: Status;
}) => {
    return (
        <SkjemaRotLayout pageTitle={pageTitle}>
            <VStack gap="4">
                <KvitteringsInnhold forsendelseStatus={forsendelseStatus} />
            </VStack>
        </SkjemaRotLayout>
    );
};

const KvitteringsInnhold = ({ forsendelseStatus }: { forsendelseStatus?: Status }) => {
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
        <VStack gap="2">
            <CheckmarkCircleFillIcon
                className="text-ax-text-success-decoration self-center"
                aria-hidden
                fontSize="2.5rem"
            />
            <Heading size="large" level="2" align="center" spacing>
                Søknaden din er mottatt
            </Heading>
            <BodyShort spacing>
                Vi henter nå status på saken din. Dette tar som regel under &ldquo;ett minutt&ldquo;. Du trenger ikke
                gjøre noe – siden oppdateres automatisk.
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
        <VStack gap="2">
            <CheckmarkCircleFillIcon
                className="text-ax-text-success-decoration self-center"
                aria-hidden
                fontSize="2.5rem"
            />
            <Heading size="large" level="2" align="center" spacing>
                Søknaden din er mottatt
            </Heading>
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
        <VStack gap="2">
            <CheckmarkCircleFillIcon
                className="text-ax-text-success-decoration self-center"
                aria-hidden
                fontSize="2.5rem"
            />
            <Heading size="large" level="2" align="center" spacing>
                Søknaden din er mottatt
            </Heading>
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
