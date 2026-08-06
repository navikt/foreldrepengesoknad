import { FormattedMessage, useIntl } from 'react-intl';

import { BodyLong, Box, ExpansionCard, Link, List, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';

type Props = {
    /** Overstyrer heading-nivå (h1-h6) for tittelen, slik at ho passar inn i den omkringliggande overskriftsstrukturen. */
    headingAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const ScanDocumentInfo = ({ headingAs = 'h2' }: Props) => (
    <ExpansionCard size="small" aria-label={useIntl().formatMessage({ id: 'ScanDocumentInfo.Tittel' })}>
        <ExpansionCard.Header>
            <ExpansionCard.Title size="small" as={headingAs}>
                <FormattedMessage id="ScanDocumentInfo.Tittel" />
            </ExpansionCard.Title>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
            <VStack gap="space-20">
                <BodyLong>
                    <FormattedMessage id="ScanDocumentInfo.Del1" />
                </BodyLong>
                <Box marginBlock="space-16" asChild>
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
                </Box>
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
