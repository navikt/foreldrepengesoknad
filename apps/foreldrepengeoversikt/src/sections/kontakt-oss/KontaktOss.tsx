import { Chat2Icon, PaperplaneIcon, PhoneIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HGrid, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

import { LayoutWrapper } from '../LayoutWrapper';

export const KontaktOss = () => {
    return (
        <div className="bg-ax-bg-default p-8">
            <LayoutWrapper>
                <Heading size="medium" spacing>
                    <FormattedMessage id="saksoversikt.kontaktOss" />
                </Heading>
                <HGrid gap="space-16" columns={{ sm: 1, md: 3 }}>
                    <VStack gap="space-16">
                        <Link href={links.chatMedOss}>
                            <Chat2Icon aria-hidden={true} />
                            <BodyShort weight="semibold">
                                <FormattedMessage id="KontaktOss.chatMedOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="KontaktOss.informasjonOmChat" />
                        </BodyShort>
                    </VStack>
                    <VStack gap="space-16">
                        <Link href={links.skrivTilOss}>
                            <PaperplaneIcon aria-hidden={true} />
                            <BodyShort weight="semibold">
                                <FormattedMessage id="KontaktOss.skrivTilOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="KontaktOss.skrivTilOss.del1" />
                        </BodyShort>
                        <BodyShort size="medium">
                            <FormattedMessage id="KontaktOss.skrivTilOss.del2" />
                        </BodyShort>
                    </VStack>
                    <VStack gap="space-16">
                        <Link href={links.ringOss}>
                            <PhoneIcon aria-hidden={true} />
                            <BodyShort weight="semibold">
                                <FormattedMessage id="KontaktOss.ringOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="KontaktOss.ringOss.åpningstider" />
                        </BodyShort>
                        <Link href={links.seFlereTlfNrOgTastevalg}>
                            <BodyShort size="medium">
                                <FormattedMessage id="KontaktOss.ringOss.flereTelefonnummere" />
                            </BodyShort>
                        </Link>
                    </VStack>
                </HGrid>
            </LayoutWrapper>
        </div>
    );
};
