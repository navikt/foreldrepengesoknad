import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { SkjemaRotLayout } from '@navikt/fp-ui';

interface Props {
    onGåTilUttaksplan: () => void;
}

export const ManglendeUttaksplanSide = ({ onGåTilUttaksplan }: Props) => (
    <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
        <VStack gap="space-40">
            <Alert variant="warning">
                <VStack gap="space-16">
                    <Heading size="small" level="2">
                        <FormattedMessage id="Oppsummering.ManglerUttaksplan.Heading" />
                    </Heading>
                    <BodyShort>
                        <FormattedMessage id="Oppsummering.ManglerUttaksplan.Description" />
                    </BodyShort>
                </VStack>
            </Alert>
            <div>
                <Button type="button" variant="primary" onClick={onGåTilUttaksplan}>
                    <FormattedMessage id="Oppsummering.ManglerUttaksplan.Action" />
                </Button>
            </div>
        </VStack>
    </SkjemaRotLayout>
);
