import { Chat2Icon, PaperplaneIcon, PhoneIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HGrid, Heading, Link, VStack } from '@navikt/ds-react';

import { NavRoutes } from '../../routes/routes';
import { LayoutWrapper } from '../LayoutWrapper';

export const KontaktOss = () => {
    return (
        <div className="bg-white p-8">
            <LayoutWrapper>
                <Heading size="medium" spacing>
                    <FormattedMessage id="saksoversikt.kontaktOss" />
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: 3 }}>
                    <VStack gap="4">
                        <Link href={NavRoutes.CHAT_MED_OSS}>
                            <Chat2Icon aria-hidden={true} />
                            <BodyShort weight="semibold">
                                <FormattedMessage id="kontaktOss.chatMedOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="kontaktOss.informasjonOmChat" />
                        </BodyShort>
                    </VStack>
                    <VStack gap="4">
                        <Link href={NavRoutes.SKRIV_TIL_OSS}>
                            <PaperplaneIcon aria-hidden={true} />
                            <BodyShort weight="semibold">
                                <FormattedMessage id="kontaktOss.skrivTilOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="kontaktOss.skrivTilOss.del1" />
                        </BodyShort>
                        <BodyShort size="medium">
                            <FormattedMessage id="kontaktOss.skrivTilOss.del2" />
                        </BodyShort>
                    </VStack>
                    <VStack gap="4">
                        <Link href={NavRoutes.RING_OSS}>
                            <PhoneIcon aria-hidden={true} />
                            <BodyShort weight="semibold">
                                <FormattedMessage id="kontaktOss.ringOss" />
                            </BodyShort>
                        </Link>
                        <BodyShort size="medium">
                            <FormattedMessage id="kontaktOss.ringOss.åpningstider" />
                        </BodyShort>
                        <Link href={NavRoutes.SE_FLERE_TLF_NR_OG_TASTEVALG}>
                            <BodyShort size="medium">
                                <FormattedMessage id="kontaktOss.ringOss.flereTelefonnummere" />
                            </BodyShort>
                        </Link>
                    </VStack>
                </HGrid>
            </LayoutWrapper>
        </div>
    );
};
