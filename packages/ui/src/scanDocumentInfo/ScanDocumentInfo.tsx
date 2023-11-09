import { FormattedMessage } from 'react-intl';
import { BodyLong, ExpansionCard, Link, VStack } from '@navikt/ds-react';
import { links } from '@navikt/fp-constants';
import UiIntlProvider from '../i18n/ui/UiIntlProvider';
import useUiIntl from '../i18n/ui/useUiIntl';

const ScanDocumentInfo = () => (
    <UiIntlProvider>
        <ExpansionCard size="small" aria-label={useUiIntl().formatMessage({ id: 'ScanDocumentInfo.Tittel' })}>
            <ExpansionCard.Header>
                <ExpansionCard.Title size="small" as="h2">
                    <FormattedMessage id="ScanDocumentInfo.Tittel" />
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="5">
                    <BodyLong>
                        <FormattedMessage id="ScanDocumentInfo.Del1" />
                    </BodyLong>
                    <ul>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="ScanDocumentInfo.Liste.Punkt1" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="ScanDocumentInfo.Liste.Punkt2" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="ScanDocumentInfo.Liste.Punkt3" />
                        </BodyLong>
                        <BodyLong>
                            <FormattedMessage tagName="li" id="ScanDocumentInfo.Liste.Punkt4" />
                        </BodyLong>
                    </ul>
                    <BodyLong>
                        <FormattedMessage id="ScanDocumentInfo.Del2" />
                    </BodyLong>
                    <BodyLong>
                        <Link href={links.scanneDokument} target="_blank">
                            <FormattedMessage id="ScanDocumentInfo.Link" />
                        </Link>
                    </BodyLong>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    </UiIntlProvider>
);

export default ScanDocumentInfo;
