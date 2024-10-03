import { FormattedMessage } from 'react-intl';

import { Dialog, Send, Telephone } from '@navikt/ds-icons';
import { BodyShort, HGrid, Heading, Link, VStack } from '@navikt/ds-react';

import { NavRoutes } from 'app/routes/routes';
import { LayoutWrapper } from 'app/sections/LayoutWrapper';

const KontaktOss: React.FunctionComponent = () => {
    return (
        <div className="bg-white p-8">
            <LayoutWrapper>
                <Heading size="medium" spacing>
                    <FormattedMessage id="saksoversikt.kontaktOss" />
                </Heading>
                <HGrid gap="4" columns={{ sm: 1, md: 3 }}>
                    <VStack gap="4">
                        <Link href={NavRoutes.CHAT_MED_OSS}>
                            <Dialog aria-hidden={true} />
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
                            <Send aria-hidden={true} />
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
                            <Telephone aria-hidden={true} />
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

export default KontaktOss;
