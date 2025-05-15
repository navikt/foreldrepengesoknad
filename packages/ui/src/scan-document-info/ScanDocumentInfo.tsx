import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, ExpansionCard, Link, List, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

export const ScanDocumentInfo = () => (
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
                <List>
                    <List.Item>
                        <FormattedMessage id="ScanDocumentInfo.Liste.Punkt1" />
                    </List.Item>
                    <List.Item>
                        <FormattedMessage id="ScanDocumentInfo.Liste.Punkt2" />
                    </List.Item>
                    <List.Item>
                        <FormattedMessage id="ScanDocumentInfo.Liste.Punkt3" />
                    </List.Item>
                    <List.Item>
                        <FormattedMessage id="ScanDocumentInfo.Liste.Punkt4" />
                    </List.Item>
                    <List.Item>
                        <FormattedMessage id="ScanDocumentInfo.Liste.Punkt5" />
                    </List.Item>
                </List>
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
