import { CheckmarkCircleFillIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Loader, VStack } from '@navikt/ds-react';

import { ForsendelseStatus } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { getLenker } from '@navikt/fp-utils';

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
        case 'FORSENDELSE_FINNES_IKKE':
        case 'MIDLERTIDIG':
            return <GåTilMinSide />;
        case 'ENDELIG':
            return <GåTilInnsyn saksnummer={forsendelseStatus?.saksnummer} />;
    }
};

const SakenProsesseres = () => {
    return (
        <VStack>
            <KvitteringHeader />
            <BodyShort spacing>
                <FormattedMessage id="sakenProsesseres.info" />
            </BodyShort>
            <BodyShort spacing>
                <FormattedMessage id="sakenProsesseres.loader" /> <Loader />
            </BodyShort>
        </VStack>
    );
};

const GåTilMinSide = () => {
    return (
        <VStack>
            <KvitteringHeader />
            <BodyShort>
                <FormattedMessage id="minSide.info" />
            </BodyShort>
            <Button
                as="a"
                href={getLenker().minSide}
                className="mt-8 w-fit self-center"
                iconPosition="right"
                icon={<ChevronRightIcon />}
            >
                <FormattedMessage id="minSide.button" />
            </Button>
        </VStack>
    );
};

const GåTilInnsyn = ({ saksnummer }: { saksnummer?: string }) => {
    if (saksnummer === undefined) {
        throw new Error('Udefinert saksnummer for status ENDELIG');
    }

    const url = `${getLenker().innsyn}/sak/${saksnummer}`;

    return (
        <VStack>
            <KvitteringHeader />
            <BodyShort spacing>
                <FormattedMessage id="innsyn.info" />
            </BodyShort>
            <BodyShort spacing>
                <FormattedMessage id="innsyn.followup" />
            </BodyShort>
            <Button
                as="a"
                href={url}
                className="mt-4 w-fit self-center"
                iconPosition="right"
                icon={<ChevronRightIcon />}
            >
                <FormattedMessage id="minSide.button" />
            </Button>
        </VStack>
    );
};

const KvitteringHeader = () => {
    return (
        <HStack gap="space-16" align="center" className="mb-6" wrap={false}>
            <CheckmarkCircleFillIcon
                className="text-ax-text-success-decoration self-center"
                aria-hidden
                fontSize="2.5rem"
            />
            <Heading size="large" level="2" align="center">
                <FormattedMessage id="header.title" />
            </Heading>
        </HStack>
    );
};
