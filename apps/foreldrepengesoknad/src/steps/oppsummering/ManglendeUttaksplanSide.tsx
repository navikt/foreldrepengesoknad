import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { SkjemaRotLayout } from '@navikt/fp-ui';

interface Props {
    manglerPerioder: boolean;
    onGåTilUttaksplan: () => void;
}

export const ManglendeUttaksplanSide = ({ manglerPerioder, onGåTilUttaksplan }: Props) => (
    <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
        <VStack gap="space-40">
            <Alert variant="warning">
                <VStack gap="space-16">
                    <Heading size="small" level="2">
                        {manglerPerioder ? (
                            <FormattedMessage id="Oppsummering.ManglerUttaksperioder.Heading" />
                        ) : (
                            <FormattedMessage id="Oppsummering.ManglerUttaksplan.Heading" />
                        )}
                    </Heading>
                    <BodyShort>
                        {manglerPerioder ? (
                            <FormattedMessage id="Oppsummering.ManglerUttaksperioder.Description" />
                        ) : (
                            <FormattedMessage id="Oppsummering.ManglerUttaksplan.Description" />
                        )}
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
