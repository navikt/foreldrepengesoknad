import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-observability';
import { AppName } from '@navikt/fp-types';

import { SkjemaRotLayout } from '../skjema-rotlayout/SkjemaRotLayout';

interface Props {
    slettMellomlagringOgLastSidePåNytt: () => Promise<void>;
    appName: AppName;
    // Kva registerdata som avvik frå mellomlagringa (t.d. 'søkerInfo', 'saker').
    // Loggast til umami slik at vi kan måla andelen falske positive.
    avvik?: string;
}

export const RegisterdataUtdatert = ({ slettMellomlagringOgLastSidePåNytt, appName, avvik }: Props) => {
    // Logg éin gong per faktisk avvik. Tidlegare låg dette i render-kroppen og
    // fyrte på kvar re-render, noko som blåste opp umami-tellinga.
    useEffect(() => {
        loggUmamiEvent({
            origin: appName,
            eventName: 'besøk',
            eventData: { tittel: 'registerdataUtdatert', ...(avvik ? { avvik } : {}) },
        });
    }, [appName, avvik]);

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
