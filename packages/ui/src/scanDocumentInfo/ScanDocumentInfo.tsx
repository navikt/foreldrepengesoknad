import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, ExpansionCard, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

const ScanDocumentInfo = () => (
    <ExpansionCard size="small" aria-label={useIntl().formatMessage({ id: 'ScanDocumentInfo.Tittel' })}>
        <ExpansionCard.Header>
            <ExpansionCard.Title size="small" as="h4">
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
                    <BodyLong>
                        <FormattedMessage tagName="li" id="ScanDocumentInfo.Liste.Punkt5" />
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
);

export default ScanDocumentInfo;
