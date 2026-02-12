import { CheckmarkCircleFillIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Loader, VStack } from '@navikt/ds-react';

import { ForsendelseStatus, PersonMedArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { erUnder25År } from '@navikt/fp-utils';

const skalViseYngreMannMelding = (søkerinfo?: PersonMedArbeidsforholdDto_fpoversikt, erEndringssøknad?: boolean) => {
    if (!søkerinfo || !erEndringssøknad) {
        return false;
    }
    const erMann = søkerinfo.person.kjønn === 'M';
    const erUnder25 = erUnder25År(søkerinfo.person.fødselsdato);
    return erMann && erUnder25;
};

export const Kvittering = ({
    forsendelseStatus,
    pageTitle,
    søkerinfo,
    erEndringssøknad,
}: {
    pageTitle: React.ReactNode;
    forsendelseStatus?: ForsendelseStatus;
    søkerinfo?: PersonMedArbeidsforholdDto_fpoversikt;
    erEndringssøknad?: boolean;
}) => {
    return (
        <SkjemaRotLayout pageTitle={pageTitle}>
            <KvitteringsInnhold
                forsendelseStatus={forsendelseStatus}
                søkerinfo={søkerinfo}
                erEndringssøknad={erEndringssøknad}
            />
        </SkjemaRotLayout>
    );
};

const KvitteringsInnhold = ({
    forsendelseStatus,
    søkerinfo,
    erEndringssøknad,
}: {
    forsendelseStatus?: ForsendelseStatus;
    søkerinfo?: PersonMedArbeidsforholdDto_fpoversikt;
    erEndringssøknad?: boolean;
}) => {
    const status = forsendelseStatus?.status ?? 'PENDING';

    switch (status) {
        case 'PENDING':
            return <SakenProsesseres søkerinfo={søkerinfo} erEndringssøknad={erEndringssøknad} />;
        case 'FORSENDELSE_FINNES_IKKE':
        case 'MIDLERTIDIG':
            return <GåTilMinSide søkerinfo={søkerinfo} erEndringssøknad={erEndringssøknad} />;
        case 'ENDELIG':
            return (
                <GåTilInnsyn
                    saksnummer={forsendelseStatus?.saksnummer}
                    søkerinfo={søkerinfo}
                    erEndringssøknad={erEndringssøknad}
                />
            );
    }
};

const SakenProsesseres = ({
    søkerinfo,
    erEndringssøknad,
}: {
    søkerinfo?: PersonMedArbeidsforholdDto_fpoversikt;
    erEndringssøknad?: boolean;
}) => {
    return (
        <VStack>
            <KvitteringHeader />
            {skalViseYngreMannMelding(søkerinfo, erEndringssøknad) && <YngreMannMelding />}
            <BodyShort spacing>
                <FormattedMessage id="sakenProsesseres.info" />
            </BodyShort>
            <BodyShort spacing>
                <FormattedMessage id="sakenProsesseres.loader" /> <Loader />
            </BodyShort>
        </VStack>
    );
};

const GåTilMinSide = ({
    søkerinfo,
    erEndringssøknad,
}: {
    søkerinfo?: PersonMedArbeidsforholdDto_fpoversikt;
    erEndringssøknad?: boolean;
}) => {
    const erIDev = globalThis.location.hostname.includes('.dev.nav.');
    const url = erIDev ? 'https://www.ansatt.dev.nav.no/minside' : 'https://www.nav.no/minside';

    return (
        <VStack>
            <KvitteringHeader />
            {skalViseYngreMannMelding(søkerinfo, erEndringssøknad) && <YngreMannMelding />}
            <BodyShort>
                <FormattedMessage id="minSide.info" />
            </BodyShort>
            <Button
                as="a"
                href={url}
                className="mt-8 w-fit self-center"
                iconPosition="right"
                icon={<ChevronRightIcon />}
            >
                <FormattedMessage id="minSide.button" />
            </Button>
        </VStack>
    );
};

const GåTilInnsyn = ({
    saksnummer,
    søkerinfo,
    erEndringssøknad,
}: {
    saksnummer?: string;
    søkerinfo?: PersonMedArbeidsforholdDto_fpoversikt;
    erEndringssøknad?: boolean;
}) => {
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
            {skalViseYngreMannMelding(søkerinfo, erEndringssøknad) && <YngreMannMelding />}
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

const YngreMannMelding = () => {
    return (
        <BodyShort spacing className="font-semibold">
            <FormattedMessage id="yngreMannEndringssøknad.info" />
        </BodyShort>
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
