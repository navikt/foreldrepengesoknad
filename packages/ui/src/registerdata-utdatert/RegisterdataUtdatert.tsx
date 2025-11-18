import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';
import { AppName } from '@navikt/fp-types';

import { SkjemaRotLayout } from '../skjema-rotlayout/SkjemaRotLayout';

interface Props {
    slettMellomlagringOgLastSidePåNytt: () => Promise<void>;
    appName: AppName;
}

export const RegisterdataUtdatert = ({ slettMellomlagringOgLastSidePåNytt, appName }: Props) => {
    loggUmamiEvent({
        origin: appName,
        eventName: 'besøk',
        eventData: { tittel: 'registerdataUtdatert' },
    });

    return (
        <SkjemaRotLayout
            pageTitle={
                <>
                    {appName === 'engangsstonad' && <FormattedMessage id="RegisterdataUtdatert.Engangsstønad" />}
                    {appName === 'foreldrepengesoknad' && <FormattedMessage id="RegisterdataUtdatert.Foreldrepenger" />}
                    {appName === 'svangerskapspengesoknad' && (
                        <FormattedMessage id="RegisterdataUtdatert.Svangerskapspenger" />
                    )}
                </>
            }
        >
            <VStack gap="space-40">
                <Alert variant="warning">
                    <VStack gap="space-16">
                        <Heading size="small" level="3">
                            <FormattedMessage id="RegisterdataUtdatert.Heading" />
                        </Heading>
                        <BodyShort>
                            <FormattedMessage id="RegisterdataUtdatert.Message" />
                        </BodyShort>
                    </VStack>
                </Alert>
                <div>
                    <Button type="button" variant="primary" onClick={() => void slettMellomlagringOgLastSidePåNytt()}>
                        <FormattedMessage id="RegisterdataUtdatert.StartPaNytt" />
                    </Button>
                </div>
            </VStack>
        </SkjemaRotLayout>
    );
};
